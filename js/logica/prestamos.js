import { getUserActive } from "./session.js";
import { libros, getBook, descontarLibro, aumentarLibro } from "./books.js";
import { getUser } from './users.js'
let prestamos = [];
let listaDeseos = [];
let prestamoId = 0;

const crearPrestamo = (libro, user = getUserActive()) => {
    if (!(libro)) {
        return false;
    }

    descontarLibro(libro)

    const prestamo = {
        id: prestamoId++,
        libroId: libro.id,
        userId: user.id,
        costo: libro.costo,
        multa: 0,
        fecha: moment().format("DD/MM/YY"),
        fechaVenc: moment().add(30, 'day').format("DD/MM/YY"),
    };

    prestamos.push(prestamo);
    guardarLocal();
    return true;
};

const guardarLocal = () => {
    localStorage.removeItem("prestamos");
    localStorage.setItem("prestamos", JSON.stringify(prestamos));
    localStorage.removeItem("ultPrestId");
    localStorage.setItem("ultPrestId", prestamoId);
}

const cargarPrestamos = () => {
    prestamos = [];
    const prestamosStorage = JSON.parse(localStorage.getItem("prestamos"));
    if (prestamosStorage) {
        const ultPrestId = localStorage.getItem("ultPrestId");
        prestamoId = ultPrestId;
        prestamos.push(...prestamosStorage);
    }
};


const crearDeseo = (id) => {
    const libro = getBook(id);
    if (listaDeseos.includes(libro)) {
        alert("Ya tienes este libro en la lista de deseos");
        return false;
    } else {
        listaDeseos.push(libro);
        return true;
    }
};

const hacerPrestamos = () => {
    while (listaDeseos.length > 0) {
        crearPrestamo(listaDeseos.pop());
    }

};

const costoTotalDeseo = () => {
    let costo = 0;
    listaDeseos.forEach((l) => (costo += l.costo));
    return costo;
};

const borrarDeseo = (id) => {
    const listaNueva = listaDeseos.filter((libro) => libro.id !== id);
    listaDeseos = listaNueva;
    return true;
};

const verPrestamos = () => {
    const userActive = getUserActive();
    if (userActive.rol === "admin") {
        const result = prestamos.map((p) => {
            const result = {
                id: p.id,
                prestamo: p.id,
                libro: getBook(p.libroId),
                user: getUser(p.userId),
                fecha: p.fecha,
                fechaVenc: p.fechaVenc,
            };
            return result;
        });
        return result;
    }
    return false;
};

const borrarPrestamo = (id, libroId) => {
    aumentarLibro(libroId)
    const listaNueva = prestamos.filter(prestamo => prestamo.id !== id);
    prestamos = listaNueva;
    guardarLocal();
    return true;
}

const misPrestamos = () => {
    const userID = getUserActive().id;
    const result = prestamos.map((p) => {
        if (p.userId === userID) {
            const result = {
                id: p.id,
                prestamo: p.id,
                libro: getBook(p.libroId),
                // user: p.userId,
                fecha: p.fecha,
                fechaVenc: p.fechaVenc,
            };
            return result;
        }
    });
    return result;
};

export {
    prestamos,
    hacerPrestamos,
    cargarPrestamos,
    crearPrestamo,
    verPrestamos,
    misPrestamos,
    listaDeseos,
    crearDeseo,
    costoTotalDeseo,
    borrarDeseo,
    borrarPrestamo
};
