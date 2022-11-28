// Valida el usuario y guarda el ID en el localStorage
login = (user, pass) => {

    if (isActive()){
        console.log('Ya estas logeado');
        return false;
    }

    // busca el usuario en la lista de usuarios
    [userLog] = users.filter(u => u.nombre == user);
    console.log(userLog);
    // Valida el usuario, si existe
    if (userLog) {
        // valida contraseña del usuario y guarda el id
        if (userLog.pass === pass) {
            localStorage.setItem('active', JSON.stringify(userLog));
            console.log(`Bienvenido, @${user}`);
        } else {
            console.log('Contraseña incorrecta');
        }
    } else {
        console.log('Usuario inexistente');
    }
}


logout = () => {
    const user = isActive();
    if(user){
        localStorage.removeItem('active');
        console.log('Cierre de sessión con exito');
    }
}

// Determina si hay o no un usuario logeado
isActive = () => {

    const user = JSON.parse(localStorage.getItem('active'));
    return (user ? user: false);
}

