
// Lista de libros
let libros = []

let libroId = 0;

// Retorna un libro
const crearLibro = (title, author, genre, editorial, desc, year, img, cantidad) => {
    if (!(isActive().rol === 'admin')) {
        alert('No tienes permisos para añadir nuevos libros');
        return false;
    }
        libros.push({
            libroId: libroId++,
            title,
            author,
            genre,
            editorial,
            desc,
            year,
            img,
            cantidad: cantidad || 1
        });

    localStorage.removeItem('libros');
    localStorage.setItem('libros', JSON.stringify(libros));
    localStorage.removeItem('ultLibroId');
    localStorage.setItem('ultLibroId', libroId)
    
    return true
}


// Agregamos libros que serian los 'por defecto', si no hay nada en localstorage
const defaultLoadBooks = () => {
    const localLibros = JSON.parse(localStorage.getItem('libros'));
    libros = [];
    if (localLibros) {
        const ultimoId = JSON.parse(localStorage.getItem('ultLibroId'));
        libroId = ultimoId;
        localLibros.forEach(l => libros.push(l))
    } else {
        crearLibro('Cien años de soledad',
            'Gabriel García Márquez',
            'novela',
            'sudamericana',
            'Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982. Es considerada una obra maestra de la literatura hispanoamericana y universal, así como una de las obras más traducidas y leídas en español',
            1967,
            'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1631642420-51O9mmoZLhL._SL500_.jpg?crop=1xw:1xh;center,top&resize=480%3A%2A',
            4
        )

        crearLibro('Crónicas marcianas',
            'Ray Bradbury',
            'Ciencia Ficción',
            'booket',
            'Crónicas marcianas es una serie de relatos del escritor Ray Bradbury. Los relatos carecen de una línea argumental lineal fija, pero la referencia contextual y temporal es la misma en todos ellos: narra la llegada a Marte y la colonización del planeta por parte de los humanos.',
            1950,
            'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1631641147-41yZWABLHOL._SL500_.jpg?crop=1xw:1xh;center,top&resize=480%3A%2A',
            3)

        crearLibro(
            'Bajo la red',
            'Iris Murdoch',
            'Ficcion',
            'Chatto & Windus',
            'Ambientada en Londres, es la historia de un joven escritor, Jake Donaghue. Su mezcla de lo filosófico y lo picaresco ha hecho que se trate de la obra más popular de Murdoch. Dedicó la novela a Raymond Queneau.',
            1954,
            'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1631639771-51QhvcHZ1hL._SL500_.jpg?crop=1xw:1xh;center,top&resize=480%3A%2A',
            9
        )

        crearLibro(
            'One Piece',
            'Eichiro Oda',
            'Anime',
            'Shūeisha',
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non repellendus tempore asperiores laboriosam minus. Non quod quibusdam veritatis ex ab praesentium necessitatibus asperiores! Animi, tenetur rerum illum quo provident dolorem.',
            1999,
            'https://static.tvtropes.org/pmwiki/pub/images/2e5c6d37_566f_4274_b62d_ebf5fcbd0722.png',
            20
        );
    }
}

const getBook = (id) => {
    return libros.find(l=>l.libroId==id)
}

const filtrar = (filtro = 0, campo = '') => {
    let librosFiltrados = [];

    // eliminar tildes
    const normalizarTexto = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const contains = (libro, campo) => {
        return normalizarTexto(libro.toLowerCase())
            .indexOf(normalizarTexto(campo.toLowerCase())) >= 0;
    }

    if (campo.length !== 0) {
        switch (filtro) {
            case '1':
                console.log('filtrado por titulo');
                librosFiltrados = libros.filter(l => contains(l.title, campo));
                break;
            case '2':
                console.log('filtrado por genero');
                librosFiltrados = libros.filter(l => contains(l.genre, campo));
                break;
            case '3':
                console.log('filtrado por autor');
                librosFiltrados = libros.filter(l => (contains(l.author, campo)));
                break;
            default:
        }
    } else {
        librosFiltrados = libros;
    }

    return librosFiltrados;
}


// export { crearLibro };