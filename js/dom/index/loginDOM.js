import { login, getUserActive } from "../../logica/session.js";
import { reload } from "../../index.js";
import { loginBTN, crearCuentaBTN } from "../navbar.js";
const loginBtn = document.getElementById('login');
const alertContainer = document.querySelector('.alert-container');
let alertContent = '';


const loginDOM = () => {
  loginBTN.addEventListener('click', loginAlert);
}

const loginAlert = (e) => {
  e.preventDefault();
  if (getUserActive()) return false;
  
  alertContent = document.createElement('div');
  alertContent.classList.add('alert')
  document.body.style.overflow = 'hidden';
  alertContent.innerHTML = `<div class="msg">
                        <h2>Iniciar Sesion</h2>
                        <form>
                          <div class='form-field'>
                            <label>Nombre de Usuario</label>
                            <input type="text" id="user-login" />
                          </div>
                          <div class='form-field'>
                            <label>Contraseña</label>
                            <input type="password" id="pass-login" />
                          </div>
                        </form>
                      </div>
                      <div class="opt is-centered">
                        <a href="#" id='iniciar-sesion' class="btn">Iniciar Sesion</a>
                        <a href="#" id='cancelar' class="btn btn-danger">Cancelar</a>
                      </div>`;
  alertContainer.appendChild(alertContent);
  alertContainer.classList.remove('d-none');
  funciones();
}

const funciones = () => {
  const iniciarSesion = document.getElementById('iniciar-sesion');
  const cancelar = document.getElementById('cancelar');
  const userName = document.getElementById('user-login')
  const userPass = document.getElementById('pass-login')

  iniciarSesion.addEventListener('click', (e) => {
    e.preventDefault();
    login(userName.value, userPass.value)
    if (getUserActive()) {
      alertContainer.removeChild(alertContent)
      alertContainer.classList.add('d-none')
      document.body.style.overflow = 'scroll';
      reload()
    } else {
      alert('Error de autenticación')
    }
    userName.value = userPass.value = '';
  });

  cancelar.addEventListener('click', (e) => {
    e.preventDefault();
    alertContainer.removeChild(alertContent)
    alertContainer.classList.add('d-none')
    document.body.style.overflow = 'scroll';

  })

}

export { loginDOM }