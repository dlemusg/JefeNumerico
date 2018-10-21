from flask import Flask, jsonify, request
from sympy import *
from sympy.parsing.sympy_parser import parse_expr

app = Flask(__name__)


@app.route('/incrementalSearch', methods=['GET', 'POST'])
def incrementalSearch():

    #diccionario - Inicialización
    response = dict()
    response["iter"] = []
    response["x1"] = []
    response["fx1"] = []
    #response[""] = []

    # Inicializacion de paramentros
    f = parse_expr(request.json['f'])
    x0 = float(request.json['x0'])
    delta = float(request.json['delta'])
    niteraciones = int(request.json['niteraciones'])

    while (niteraciones <= 0):
        return jsonify("El numero de iteraciones debe ser mayor que 0")

    x = Symbol('x')
    fx0 = f.subs(x, x0)

    if fx0 == 0:
        return jsonify(str(x0) + "es una raiz")

    else:
        x1 = x0 + delta
        cont = 1
        fx1 = f.subs(x, x1)
        response["iter"].append(cont)
        response["x1"].append(float(x1))
        response["fx1"].append(float(fx1))
        while fx0*fx1 > 0 and cont < niteraciones:
            x0 = x1
            fx0 = fx1
            x1 = x0 + delta
            fx1 = f.subs(x, x1)
            cont = cont + 1
            response["iter"].append(cont)
            response["x1"].append(float(x1))
            response["fx1"].append(float(fx1))

    return jsonify(response)


@app.route('/bisection', methods=['GET', 'POST'])
def bisection():
    #diccionario - Inicialización
    response = dict()
    response["n"] = []
    response["xi"] = []
    response["xs"] = []
    response["xm"] = []
    response["fxm"] = []
    response["error"] = []
    response["raices"] = []

    # Inicializacion de paramentros
    f = parse_expr(request.json['f'])
    xi = float(request.json['xi'])
    xs = float(request.json['xs'])
    tolerancia = float(request.json['tolerancia'])
    niteraciones = int(request.json['niteraciones'])
    tipo_error = int(request.json["tipoError"])

    if(tolerancia == 0):
        return jsonify("La tolerancia debe ser diferente de 0, ingresela nuevamente")
    if(niteraciones <= 0):
        return jsonify("El numero de iteraciones debe ser mayor que 0")

    x = Symbol('x')
    fxi = f.subs(x, xi)
    fxs = f.subs(x, xs)

    if fxi == 0:
        response["raices"].append(xi)
        #print(str(xi) + " es una raiz")
    elif fxs == 0:
        response["raices"].append(xs)
        #print(str(xs) + " es una raiz")
    elif fxi * fxs > 0:
        return jsonify("El intervalo es inadecuado")
        #print("El intervalo no posee una raiz")
    else:
        xm = (xi + xs) / 2
        fxm = f.subs(x, xm)
        cont = 1
        errorAbs = tolerancia + 1

        response["n"].append(int(cont))
        response["xi"].append(float(xi))
        response["xs"].append(float(xs))
        response["xm"].append(float(xm))
        response["fxm"].append(float(fxm))
        response["error"].append("")

        while fxm != 0 and errorAbs > tolerancia and cont < niteraciones:
            if fxi * fxm < 0:
                xs = xm
                fxs = f.subs(x, xs)
            else:
                xi = xm
                fxi = f.subs(x, xi)

            xaux = xm
            xm = (xi + xs) / 2
            fxm = f.subs(x, xm)
            errorAbs = abs(xm - xaux)
            errorRel = errorAbs/xm
            cont += 1

            response["n"].append(int(cont))
            response["xi"].append(float(xi))
            response["xs"].append(float(xs))
            response["xm"].append(float(xm))
            response["fxm"].append(float(fxm))
            if(tipo_error == 1):
                response["error"].append(float(errorAbs))
            else:
                response["error"].append(float(errorRel))

        if fxm == 0:
            #print (str(xm) + " es una raiz")
            response["raices"].append(xm)
        elif errorAbs < tolerancia:
            response["raices"].append(xm)
            #print(str(xm) + " se aproxima a una raiz de la función, con una tolerancia de: " + str(tolerancia))
        else:
            return jsonify("Excedio el numero de iteraciones posible")

    return jsonify(response)


@app.route('/falsePostion', methods=['GET', 'POST'])
def falsePostion():
    #diccionario - Inicialización
    response = dict()
    response["n"] = []        
    response["xi"] = []
    response["xs"] = []
    response["xm"] = []
    response["fxm"] = []
    response["error"] = []
    response["raices"] = []

    # Inicializacion de paramentros
    f = parse_expr(request.json['f'])
    xi = float(request.json['xi'])
    xs = float(request.json['xs'])
    tolerancia = float(request.json['tolerancia'])
    niteraciones = int(request.json['niteraciones'])
    tipoError = int(request.json["tipoError"])

    if(tolerancia == 0):
        return jsonify("La tolerancia debe ser diferente de 0, ingresela nuevamente")
    if(niteraciones <= 0):
        return jsonify("El numero de iteraciones debe ser mayor que 0")

    x = Symbol('x')
    fxi = f.subs(x, xi)
    fxs = f.subs(x, xs)
    cont = 1

    if fxi == 0:
        response["raices"].append(xi)        
    elif fxs == 0:
        response["raices"].append(xs)
    elif fxi * fxs > 0:
        return jsonify("El intervalo es inadecuado")
    else:
        xm = xi - (fxi*(xs-xi))/(fxs-fxi)
        fxm = f.subs(x, xm)
        response["n"].append(int(cont))
        response["xi"].append(float(xi))
        response["xs"].append(float(xs))            
        response["xm"].append(float(xs))
        response["fxm"].append(float(fxm))
        response["error"].append(str(""))

        cont += 1
        errorAbs = tolerancia + 1

        while fxm != 0 and errorAbs > tolerancia and cont < niteraciones:
            if fxi * fxm < 0:
                xs = xm
                fxs = f.subs(x, xs)
            else:
                xi = xm
                fxi = f.subs(x, xi)

            xaux = xm
            xm = xi - (fxi*(xs-xi))/(fxs-fxi)
            fxm = f.subs(x, xm)
            errorAbs = abs(xm - xaux)
            errorRel = errorAbs/xm
            response["n"].append(int(cont))
            response["xi"].append(float(xi))
            response["xs"].append(float(xs))
            response["xm"].append(float(xs))
            response["fxm"].append(float(fxm))
            if(tipoError == 1):
                response["error"].append(float(errorAbs))
            else:
                response["error"].append(float(errorRel))
            cont += 1

        if fxm == 0:
            response["raices"].append(float(xm))
        elif errorAbs < tolerancia:
            response["raices"].append(float(xm))
        else:
            return jsonify("Fracasó en "+str(cont)+" iteraciones"+"\n")
    return jsonify(response)


@app.route('/fixedpoint', methods=['GET', 'POST'])
def fixedPoint():
    #diccionario - Inicialización
    response = dict()
    response["n"] = []        
    response["xi"] = []
    response["fx"] = []
    response["error"] = []
    response["raices"] = []

    # Inicializacion de paramentros
    f = parse_expr(request.json['f'])
    g = parse_expr(request.json['g'])
    xi = float(request.json['xi'])
    tolerancia = float(request.json['tolerancia'])
    niteraciones = int(request.json['niteraciones'])
    tipoError = int(request.json["tipoError"])

    if(tolerancia == 0):
        return jsonify("La tolerancia debe ser diferente de 0, ingresela nuevamente")
    if(niteraciones <= 0):
        return jsonify("El numero de iteraciones debe ser mayor que 0")

    x = Symbol('x')
    fx = f.subs(x,xi)
    cont = 0
    errorAbs = tolerancia + 1

    response["n"].append(int(cont))
    response["xi"].append(float(xi))
    response["fx"].append(float(fx))
    response["error"].append(str(""))

    while (fx != 0 and errorAbs > tolerancia and cont < niteraciones):
        xn = g.subs(x,xi)
        fx = f.subs(x,xn)
        errorAbs = abs(xn - xi) 
        errorRel = abs(xn - xi)/xn 
        xi = xn
        cont += 1

        response["n"].append(int(cont))
        response["xi"].append(float(xi))
        response["fx"].append(float(fx))
        if tipoError  == 1:
            response["error"].append(float(errorAbs))
        else: 
            response["error"].append(float(errorRel))

    if fx == 0:
        response["raices"].append(float(xi))
    elif errorAbs < tolerancia:
        response["raices"].append(float(xi))
    else:
        return jsonify("FALLO, excedió el numero maximo de iteraciones")
    return jsonify(response)

@app.route('/newton', methods=['GET', 'POST'])
def newton():

    response = dict()
    response["n"] = []        
    response["x0"] = []
    response["fx"] = []
    response["dfx"] = []
    response["error"] = []
    response["raices"] = []

    # Inicializacion de paramentros
    f = parse_expr(request.json['f'])
    #g = parse_expr(request.json['g'])
    x0 = float(request.json['x0'])
    tolerancia = float(request.json['tolerancia'])
    niteraciones = int(request.json['niteraciones'])
    tipoError = int(request.json["tipoError"])

    if(tolerancia == 0):
        return jsonify("La tolerancia debe ser diferente de 0, ingresela nuevamente")
    if(niteraciones <= 0):
        return jsonify("El numero de iteraciones debe ser mayor que 0")


    x = Symbol('x')
    df = diff(f,x)
    fx = f.subs(x,x0)
    dfx = df.subs(x,x0)
    cont = 0
    errorAbs = tolerancia + 1

    response["n"].append(int(cont))
    response["x0"].append(float(x0))
    response["fx"].append(float(fx))
    response["error"].append(str(""))

    while fx != 0 and errorAbs > tolerancia and dfx != 0 and cont < niteraciones:
        x1 = x0 - fx/dfx
        fx = f.subs(x,x1)
        dfx = df.subs(x,x1)
        errorAbs = abs(x1 - x0)
        errorRel = errorAbs/x1
        x0 = x1
        cont += 1

        response["n"].append(int(cont))
        response["x0"].append(float(x0))
        response["fx"].append(float(fx))
        

        if tipoError == 1:
            response["error"].append(float(errorAbs))
        else:
            response["error"].append(float(errorRel))
    
    if fx == 0:
        response["raices"].append(float(x0))
    elif errorAbs < tolerancia:
        response["raices"].append(float(x0))
    elif dfx == 0:
        return jsonify("Excedio el numero de iteraciones posible")
    return jsonify(response)


@app.route('/secant', methods=['GET', 'POST'])
def secant():
    response = dict()
    response["n"] = []        
    response["x0"] = []
    response["fx"] = []

    response["error"] = []
    response["raices"] = []

    # Inicializacion de paramentros
    f = parse_expr(request.json['f'])
    #g = parse_expr(request.json['g'])
    x0 = float(request.json['x0'])
    x1 = float(request.json['x1'])
    tolerancia = float(request.json['tolerancia'])
    niteraciones = int(request.json['niteraciones'])
    tipoError = int(request.json["tipoError"])

    if(tolerancia == 0):
        return jsonify("La tolerancia debe ser diferente de 0, ingresela nuevamente")
    if(niteraciones <= 0):
        return jsonify("El numero de iteraciones debe ser mayor que 0")

    x = Symbol('x')
    fx0 = f.subs(x, x0)
    if fx0==0:
        response["raices"].append(float(x0))
    else:
        fx1 = f.subs(x, x1)
        contador = 0
        response["n"].append(int(contador))
        response["x0"].append(float(x0))
        response["fx"].append(float(fx0))
        response["error"].append(str(""))
        contador = 1
        response["n"].append(int(contador))
        response["x0"].append(float(x1))
        response["fx"].append(float(fx1))
        response["error"].append(str(""))
        minus = fx1 - fx0
        errorAbs = tolerancia + 1

        while (errorAbs > tolerancia and fx1 != 0 and minus != 0 and contador < niteraciones):
            x2 = x1 - ((fx1 * (x1 - x0))/minus)
            errorAbs = abs(x2 - x1)
            errorRel = errorAbs/x2
            x0 = x1
            fx0 = fx1
            x1 = x2
            fx1 = f.subs(x, x1)
            minus =  fx1 - fx0
            contador = contador + 1

            response["n"].append(int(contador))
            response["x0"].append(float(x1))
            response["fx"].append(float(fx1))
            if tipoError == 1:
                response["error"].append(float(errorAbs))
            else:
                response["error"].append(float(errorRel))
        if fx1 == 0:
            response["raices"].append(float(x1))
        elif errorAbs < tolerancia:
            response["raices"].append(float(x1))
        elif minus == 0:
             #print(("En la funcion f(x) hay una posible raiz multiple"))
            pass
        else:
            return jsonify("FALLO, exedio el numero  maximo de iteraciones")
    return jsonify(response)

@app.route('/multipleroots', methods=['GET', 'POST'])
def multipleRoots():
    response = dict()
    response["n"] = []        
    response["x0"] = []
    response["fx"] = []
    response["dfx"] = []
    response["d2fx"] = []
    response["error"] = []
    response["raices"] = []

    # Inicializacion de paramentros
    x = Symbol('x')
    f = parse_expr(request.json['f'])
    df = diff(f,x)
    d2f = diff(df, x)
    #g = parse_expr(request.json['g'])
    x0 = float(request.json['x0'])
    tolerancia = float(request.json['tolerancia'])
    niteraciones = int(request.json['niteraciones'])
    tipoError = int(request.json["tipoError"])

    if(tolerancia == 0):
        return jsonify("La tolerancia debe ser diferente de 0, ingresela nuevamente")
    if(niteraciones <= 0):
        return jsonify("El numero de iteraciones debe ser mayor que 0")

    fx = f.subs(x, x0)
    dfx = df.subs(x, x0)
    d2fx = d2f.subs(x, x0)
    contador = 0
    errorAbs = tolerancia + 1
    denomi = dfx**2-(fx*d2fx)

    response["n"].append(int(contador))
    response["x0"].append(float(x0))
    response["fx"].append(float(fx))
    response["dfx"].append(float(dfx))
    response["d2fx"].append(float(d2fx))
    response["error"].append(str(""))

    while fx != 0 and errorAbs > tolerancia and denomi != 0 and contador < niteraciones:
        x1 = x0 - fx*dfx/denomi
        fx = f.subs(x, x1)
        dfx = df.subs(x, x1)
        d2fx = d2f.subs(x, x1)
        errorAbs = abs(x1-x0)
        errorRel = errorAbs/x1
        x0 = x1
        contador +=1
        denomi = dfx**2-(fx*d2fx)

        response["n"].append(int(contador))
        response["x0"].append(float(x0))
        response["fx"].append(float(fx))
        response["dfx"].append(float(dfx))
        response["d2fx"].append(float(d2fx))
        if tipoError == 1:
            response["error"].append(float(errorAbs))
        else:
            response["error"].append(float(errorRel))
    
    if fx == 0 or errorAbs < tolerancia or dfx == 0 or d2fx == 0:
        response["raices"].append(float(x0))
    else:
        return jsonify("No se pudo completar la solicitud")
    
    return jsonify(response)

@app.route('/ensayo')
def ensayo():

    return "Hello"


if __name__ == '__main__':
    app.run(debug=True)
