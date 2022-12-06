import { cargarLibros, getBook } from "./logica/books.js";
import { borrarPrestamo, cargarPrestamos, verPrestamos } from "./logica/prestamos.js";
import { getUserActive } from "./logica/session.js";
import { cargarUsers } from "./logica/users.js";


const load = () => {
    if(getUserActive().rol !=='admin'){
        alert('Debes estar logeado como usuario para acceder a este sitio')
        window.location.href = '/' 
        return false
    }
    cargarLibros()
    cargarPrestamos()
    cargarUsers()
    const listaPrestamos = document.getElementById('lista-prestamos');
    verPrestamos().forEach(
        p => {
            

            // crea un nuevo tr para la lista
            const newTR = document.createElement('tr');
            newTR.setAttribute('id', `${p.id}`)
            newTR.innerHTML = ` <td>${p.user.nombre}</td>
                                <td>${p.libro.title}</td>
                                <td>${p.libro.year}</td>
                                <td>${p.libro.genre}</td>
                                <td>${p.libro.costo}</td>
`;

            listaPrestamos.appendChild(newTR);



        }

    )
}

// const mostrarMisPrestamos =(){

// }

load();