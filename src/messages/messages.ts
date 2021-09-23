export enum postMessages {
  getPostsFailed = "Hubo un problema aquiriendo los artículos",

};

export enum authMessages  {
  loggedInSuccess = "Has iniciado sesión exitosamente",
  loggingInError = "No se pudo iniciar sesión",
  loggedOutSuccess = "Has cerrado sesión",
  loggedOutError = "Ocurrió un error cerrando sesión",
  notLoggedIn = "Necesitás iniciar sesión para acceder a ese contenido",
  unauthorized = "No encontramos un usuario con esas credenciales",
  onlyAdmin = "Solo administradores",
  mailWithInstructions = "Se te envió un email con instrucciones",
  passwordReset = "Tu contraseña se actualizó correctamente",
  emailVerificationResendFailed = "Ocurrió un problemna con el reenvío de la notificación de verificación de email",
  emailVerificationResendSucceded = "Notificación de verificación de email enviada"
};

export enum genericMessages {
  errorOcurred = "Ocurrió un error"
}