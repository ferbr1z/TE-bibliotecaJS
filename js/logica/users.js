let users = []

let userId = 0

const crearUsuario = (nombre, pass, rol) => {

    if(users.find(u=>u.nombre===nombre)){
        console.log('Ya existe un usuario con ese nombre');
        return false;
    } else if(nombre.length === 0 || pass.length ===0){
        console.log('Debe completar los datos');
        return false
    }

    users.push({
        id: userId++,
        nombre,
        pass,
        rol: rol || 'user'
    });
    localStorage.removeItem('users');
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.removeItem('ultUserId');
    localStorage.setItem('ultUserId', userId)
    return true;
}

const getUser = (id) => {
    let temp = users.find(u => u.id == id);
    return temp;
}

const cargarUsers = () => {
    const localUsers = JSON.parse(localStorage.getItem('users'));
    users = [];
    if (localUsers) {
        userId = localStorage.getItem('ultUserId')
        localUsers.forEach(u => users.push(u))
    } else {
        crearUsuario('admin', 'admin', 'admin');
        crearUsuario('user', '1234');
    }
}

export { users, crearUsuario, getUser, cargarUsers }