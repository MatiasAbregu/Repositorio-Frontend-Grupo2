export const Logout = () => {
    if(sessionStorage.getItem('token')) sessionStorage.removeItem('token');
    if(sessionStorage.getItem('username')) sessionStorage.removeItem('username');
    window.location.href = "/";
}