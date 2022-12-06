import { cargarLibros } from "./logica/books.js";
import { cargarUsers } from "./logica/users.js";
import { cargarPrestamos } from "./logica/prestamos.js";
import { getUserActive, login } from "./logica/session.js";
import { cargarLibrosDOM, losLlevo } from './dom/index/bookDOM.js'
import { loginDOM } from './dom/index/loginDOM.js'
import { navbarOPT, searcher } from "./dom/navbar.js";
import { crearCuentaDOM } from "./dom/index/crearCuentaDOM.js";
import { crearLibroDOM } from "./dom/index/crearLibroDOM.js";



const load = () => {


    cargarUsers();
    navbarOPT();
    cargarLibros();
    cargarPrestamos();
    cargarLibrosDOM()
    loginDOM();
    crearCuentaDOM()
    searcher();

    const crearLibroForm = document.querySelector('#add-libro');
    if (getUserActive().rol === 'admin') {
        crearLibroForm.classList.remove('d-none');
        crearLibroDOM();
    }
    else { crearLibroForm.classList.add('d-none'); }

    const listaVerPantalla = document.getElementById('verPantallas')
    getUserActive().rol === 'user' ? listaVerPantalla.classList.remove('d-none') : listaVerPantalla.classList.add('d-none')


}

const reload = () => {
    const cards = document.querySelector('.cards');
    const navopt = document.getElementById('nav-opt');
    cards.innerHTML = ``;
    navopt.innerHTML = ``;



    load()
}

const cargarUnaVez = () => {
    losLlevo();

    const verLibros = document.getElementById('verLibros')
    const verDeseos = document.getElementById('verDeseos')
    const cardsLibros = document.querySelector('.cards')
    const tablaDeseos = document.querySelector('.tabla')

    verLibros.addEventListener('click', (e) => {
        e.preventDefault();
        // si ya estamos ahi, no hacemos nada
        if (verLibros.classList.contains('d-none')) return null
        verLibros.classList.add('btn-primary')
        verDeseos.classList.remove('btn-primary')

        cardsLibros.classList.remove('d-none')
        tablaDeseos.classList.add('d-none')

    })

    verDeseos.addEventListener('click', (e) => {
        e.preventDefault();
        // si ya estamos ahi, no hacemos nada
        if (verDeseos.classList.contains('d-none')) return null
        verDeseos.classList.add('btn-primary')
        verLibros.classList.remove('btn-primary')
        tablaDeseos.classList.remove('d-none')
        cardsLibros.classList.add('d-none')
    })

    // verLibros.addEventListener('click', ())
}

load();
cargarUnaVez();
export { reload }