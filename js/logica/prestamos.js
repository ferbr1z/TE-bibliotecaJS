import { isActive } from './session.js'
import { libros, getBook } from './books.js';
const prestamos = [];
const listaDeseos = [];
let prestamoId = 0;

const crearPrestamo = (libro, fechaVenc, user = isActive()) => {
    if (!(libro && fechaVenc)) {
        console.log("Ingrese todos los valores");
        return false;
    }

    const libroId = libro;
    const userId = user.userId;
    const userExist = users.find((u) => u.userId == userId);
    const libroExist = libros.find((l) => l.libroId == libroId);

    if (userExist && libroExist) {
        const prestamo = {
            prestamoId: prestamoId++,
            libroId,
            userId,
            costo: 10000,
            fecha: moment().format("DD/MM/YY"),
            fechaVenc,
        };

        prestamos.push(prestamo);

        localStorage.removeItem("prestamos");
        localStorage.setItem("prestamos", JSON.stringify(prestamos));
        localStorage.removeItem("ultPrestId");
        localStorage.setItem("ultPrestId", prestamoId);
        return true;
    } else {
        console.log("Ingrese valores válidos y/o existentes");
        return false;
    }
};

const cargarDeseo = (id) => {
    const libro = getBook(id);
    listaDeseos.push(libro)
}

const hacerPrestamos = () => {
    while (listaDeseos.length > 0) {
        crearPrestamo(listaDeseos.pop())
    }
}

const cargarPrestamos = () => {
    const prestamosStorage = JSON.parse(localStorage.getItem("prestamos"));
    if (prestamosStorage) {
        const ultPrestId = localStorage.getItem("ultPrestId");
        prestamoId = ultPrestId;
        prestamos.push(...prestamosStorage);
    }
};

const verPrestamos = () => {
    const userActive = isActive();
    if (userActive.rol === "admin") {
        const result = prestamos.filter((p) => {
            const result = {
                prestamo: p.prestamoId,
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

const misPrestamos = () => {
    const userID = isActive().userId;

    const result = prestamos.filter((p) => {
        if (p.userId === userID) {
            const result = {
                prestamo: p.prestamoId,
                libro: getBook(p.libroId),
                user: getUser(p.userId),
                fecha: p.fecha,
                fechaVenc: p.fechaVenc,
            };
            return result;
        }
    });
    return result;
};

export { prestamos, cargarPrestamos, crearPrestamo, verPrestamos, misPrestamos, listaDeseos }