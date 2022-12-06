import { reload } from "../index.js";
import { getUserActive, login, logout } from "../logica/session.js";
import { cargarLibrosDOM } from "./index/bookDOM.js";
const opt = document.getElementById('nav-opt');

const loginBTN = document.createElement('li')
const crearCuentaBTN = document.createElement('li');
const userName = document.createElement('li')
const logoutBTN = document.createElement('li');
const misPrestamosBTN = document.createElement('li');
const prestamosBTN = document.createElement('li')
const searcher = () => {
    const searcher = document.getElementById('search');
    const filtro = document.getElementById('filtro')
    searcher.addEventListener('input', () => {
        cargarLibrosDOM(filtro.value, searcher.value)
    })
}

const navbarOPT = () => {

    loginBTN.innerHTML = `<a href="#" id="login"> Iniciar Sesion</a>`
    loginBTN.classList.add('btn')
    crearCuentaBTN.classList.add('btn', 'btn-primary')
    crearCuentaBTN.innerHTML = `<a href="#" id="crearCuenta">Crear Cuenta</a>`
    
    userName.classList.add('btn', 'btn-borderless')
    misPrestamosBTN.innerHTML = `<a href="/mis-prestamos.html">Mis Prestamos</a>`
    misPrestamosBTN.classList.add('btn')
    
    prestamosBTN.innerHTML = `<a href="/prestamos.html">Prestamos</a>`
    prestamosBTN.classList.add('btn')
    logoutBTN.innerHTML = `<a href="#" id="logout">Logout</a>`
    logoutBTN.classList.add('btn', 'btn-danger')
    logoutBTN.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        reload();
    })

    if (!getUserActive()) {
        opt.appendChild(loginBTN);
        opt.appendChild(crearCuentaBTN)
    } else {
        userName.innerHTML = `@${getUserActive().nombre}`
        opt.append(userName)
        getUserActive().rol === 'admin' ? opt.append(prestamosBTN) : opt.append(misPrestamosBTN)
        opt.append(logoutBTN)
    }
}

export { loginBTN, crearCuentaBTN, navbarOPT, searcher }