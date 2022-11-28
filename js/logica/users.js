let users = []

let userId = 0

const crearUsuario = (nombre, pass, rol) => {
    users.push({
        userId: userId++,
        nombre,
        pass,
        rol: rol || 'user'
    });
    localStorage.removeItem('users');
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.removeItem('ultUserId');
    localStorage.setItem('ultUserId', userId)
}

const getUser = (userId) => {
    let temp = Object.assign({},
        users.slice().find(u => u.userId == userId));
    delete temp.pass;
    return temp;
}

const defaultLoadUsers = () => {
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


const cargarUsers = () => {
    defaultLoadUsers();
}

// export { users, cargarUsers ,getUser}