/**
 * Componente para cerrar la sesión de usuario y redirigirlo a la página de inicio.
 */
export const Logout = () => {
    
    // Verifica si hay un token de sesión almacenado en el sessionStorage, si hay lo elimina.
    if(sessionStorage.getItem('token')) sessionStorage.removeItem('token');
    
     // Verifica si hay un nombre de usuario almacenado en el sessionStorage, si hay lo elimina.
    if(sessionStorage.getItem('username')) sessionStorage.removeItem('username');

    // Redirige al usuario a la página de inicio ("/")
    window.location.href = "/";
}