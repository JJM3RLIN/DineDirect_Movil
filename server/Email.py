import smtplib
from email.mime.text import MIMEText
class Email:
    def __init__(self, destinatario) -> None:
        self.smtp_server = 'smtp.gmail.com';
        self.smtp_port = 587
        self.smtp_username = 'dinedirectcontacto@gmail.com'
        self.smtp_password = ''
        self.sender = 'dinedirectcontacto@gmail.com'
        self.receiver = destinatario
        self.subject = 'Recuperación de contraseña'
        self.message = ''
        
    def construirMensaje(self,password):
        mensaje = f'<html><body><h1>Recupera tu contraseña</h1><p>Este es un correo enviado por DineDirect, tu contraseña es <span style="font-weight:bold;">{password}</span></body></html>'
        self.message = mensaje
    def enviarCorreo(self):
        msg = MIMEText(self.message, 'html')
        msg['From'] = self.sender
        msg['To'] = self.receiver
        msg['Subject'] = self.subject
        # Inicio de la conexión SMTP
        with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
            server.starttls()  # Iniciar cifrado TLS
            server.login(self.smtp_username, self.smtp_password)  # Autenticación
            # Envío del correo electrónico
            server.send_message(msg)
            return 'Correo enviado correctamente'
    