import { reload } from "../../index.js";
import { crearLibro } from "../../logica/books.js";

const crearLibroDOM = () => {

    const titulo = document.getElementById('title');
    const author = document.getElementById('author');
    const genre = document.getElementById('genre');
    const edit = document.getElementById('edit');
    const descripcion = document.getElementById('desc')
    const year = document.getElementById('year');
    const cantidad = document.getElementById('cantidad');
    const urlImg = document.getElementById('img');

    const btnCrearLibro = document.getElementById('crear-libro');

    btnCrearLibro.addEventListener('click', (e) => {
        e.preventDefault();
        const result = crearLibro(titulo.value, author.value, genre.value, edit.value, descripcion.value, year.value, urlImg.value, cantidad.value)
        if (result) {
            alert('Libro creado');

            titulo.value = author.value = genre.value = edit.value = descripcion.value = year.value = urlImg.value = cantidad.value = '';

            reload();
        } else {
            alert('Ese libro ya existe')
        }
    })


}

export { crearLibroDOM }