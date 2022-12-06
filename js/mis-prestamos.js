import { cargarLibros, getBook } from "./logica/books.js";
import { borrarPrestamo, cargarPrestamos, misPrestamos } from "./logica/prestamos.js";
import { getUserActive } from "./logica/session.js";


const load = () => {
    if(getUserActive().rol !=='user'){
        alert('Debes estar logeado como usuario para acceder a este sitio')
        window.location.href = '/' 
        return false
    }
    cargarLibros()
    cargarPrestamos()
    const listaPrestamos = document.getElementById('lista-prestamos');
    misPrestamos().forEach(
        p => {
            
            // Crea el boton para devolver libro
            const btnDevolver = document.createElement('button');
            btnDevolver.classList.add('btn', 'btn-primary');
            btnDevolver.innerHTML = 'Devolver'

            // crea un nuevo tr para la lista
            const newTR = document.createElement('tr');
            newTR.setAttribute('id', `${p.id}`)
            newTR.innerHTML = `<td>${p.libro.title}</td>
                                <td>${p.libro.year}</td>
                                <td>${p.libro.genre}</td>
                                <td>${p.libro.costo}</td>
                                <td id='lista-opt'></td>`;

            newTR.querySelector('#lista-opt').appendChild(btnDevolver)
            listaPrestamos.appendChild(newTR);


            // agg funcion al boton devolver
            btnDevolver.addEventListener('click', (e)=>{
                e.preventDefault();
                borrarPrestamo(p.id, p.libro.id);
                newTR.remove();
            })


        }

    )
}

// const mostrarMisPrestamos =(){

// }

load();