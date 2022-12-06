import { reload } from "../../index.js";
import { libros, filtrarLibros, getBook, } from "../../logica/books.js";
import { borrarDeseo, costoTotalDeseo, crearDeseo, hacerPrestamos, listaDeseos, prestamos } from "../../logica/prestamos.js";
import { getUserActive } from "../../logica/session.js";
const cargarLibrosDOM = (filtro = 0, campo = "") => {
    const cards = document.querySelector(".cards");
    const costoTotal = document.getElementById('costo-total')
    const listaDeseosDOM = document.querySelector('#lista-deseos');

    cards.innerHTML = "";

    let librosFiltrados = filtrarLibros(filtro, campo);

    // Vuelve a cargar
    librosFiltrados.forEach((b) => {
        const book = document.createElement("card");
        const btnAgregar = document.createElement('button');

        btnAgregar.classList.add('btn', 'btn-primary');
        btnAgregar.setAttribute('id', b.id)
        btnAgregar.innerHTML = 'Agregar a Lista'

        btnAgregar.addEventListener('click', e => {
            e.preventDefault();

            if (b.cantidad === 0) {
                alert('Este libro no esta disponible');
                return false;
            }

            const btnBorrar = document.createElement('button')

            btnBorrar.classList.add('btn', 'btn-danger')
            btnBorrar.innerHTML = 'Borrar'

            if (crearDeseo(b.id)) {

                const fila = document.createElement('tr');
                fila.setAttribute('id', `${b.id}`);
                fila.innerHTML = `<td>${b.title}</td>
                                    <td>${b.year}</td>
                                    <td>${b.genre}</td>
                                    <td>${b.costo}</td>
                                    <td id='action'></td>`
                listaDeseosDOM.appendChild(fila);
                fila.querySelector('#action').appendChild(btnBorrar);

                //
                costoTotal.innerHTML = costoTotalDeseo();

                btnBorrar.addEventListener('click', (e) => {
                    e.preventDefault();
                    //borra de lista de deseos
                    borrarDeseo(b.id);
                    //borra del DOM
                    fila.remove();
                    costoTotal.innerHTML = costoTotalDeseo();
                })

            }

        })

        book.classList.add("card");

        book.setAttribute("id", `${b.id}`);

        book.innerHTML = `<div class="book">
                            <div class="image">
                                <img src="${b.img}" alt=""/>
                            </div>

                            <div class="info">
                                <h1>${b.title}</h1>
                                <p class="desc">
                                ${b.desc}
                                </p>
                                <div class="footer">
                                <ul class="lista">
                                    <li>Autor: ${b.author}</li>
                                    <li>Editorial: ${b.editorial}</li>
                                    <li>Año: ${b.year}</li>
                                    <li>Género: ${b.genre}</li>
                                    <li>Disponible: ${b.cantidad}</li>
                                    <li>Costo: ${b.costo}</li>
                                </ul>
                                <!--  Sólo puede agregarse a lista de deseos si se esta logeado -->
                                <!-- ${getUserActive() ? `<a class="btn btn-primary" href="">Agregar a Lista</a>` : ""} -->
                                </div>
                            </div>
                        </div>`;
        const footer = book.querySelector('.footer');
        getUserActive().rol === 'user' ? footer.appendChild(btnAgregar) : '';
        cards.appendChild(book);
    });

};


export const losLlevo = () => {
    const btnLosLLevo = document.getElementById('los-llevo');
    btnLosLLevo.addEventListener('click', (e) => {
        e.preventDefault();

        if (listaDeseos.length === 0) return alert('No tienes nada en la lista')

        hacerPrestamos();

        const listaDeseosDOM = document.querySelector('#lista-deseos');
        listaDeseosDOM.innerHTML = ''
        const costoTotal = document.getElementById('costo-total')
        costoTotal.innerHTML = costoTotalDeseo();
        alert('Prestamo hecho')
        reload();
    })
}


export { cargarLibrosDOM };
