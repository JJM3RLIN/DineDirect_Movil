from flask import Flask, jsonify, request
import stripe
from Email import Email
import json
# Crea una instancia de la aplicación Flask
app = Flask(__name__)

# Define la ruta y la función de manejo para las solicitudes POST
@app.route('/enviarEmail', methods=['POST'])
def handle_post_request():
    #convertir el json a diccionario
    info = json.loads(request.data.decode())
    print(info)
    email = Email(info['correo'])
    email.construirMensaje(info['password'])
    
    #convertir diccionario a json
    respuesta = {"respuesta": email.enviarCorreo()}
    respuesta_json = json.dumps(respuesta)
    return respuesta_json
@app.route('/metodoPago', methods=['POST'])
def metodo_pago():
    stripe.api_key = ''
    intent = stripe.PaymentIntent.create(
        amount=200,
        currency='mxn'
    )
    return intent

    return
# Inicia la aplicación Flask
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
