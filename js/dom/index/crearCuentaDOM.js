import { reload } from "../../index.js";
import { getUserActive, login } from "../../logica/session.js";
import { crearUsuario, getUser } from "../../logica/users.js";
import { crearCuentaBTN } from "../navbar.js";

const alertContainer = document.querySelector(".alert-container");
let alertContent = "";

const crearCuentaDOM = () => {
  crearCuentaBTN.addEventListener("click", crearUserAlert);
};

const crearUserAlert = (e) => {
  e.preventDefault();

  alertContent = document.createElement("div");
  alertContent.classList.add("alert");
  document.body.style.overflow = "hidden";
  alertContent.innerHTML = `<div class="msg">
                        <h2>Crear Cuenta</h2>
                        <form>
                          <div class='form-field'>
                            <label>Usuario</label>
                            <input type="text" id="user-crear" />
                          </div>
                          <div class='form-field'>
                            <label>Contraseña</label>
                            <input type="password" id="pass-crear" />
                          </div>
                        </form>
                      </div>
                      <div class="opt is-centered">
                        <a href="#" id='crear-cuenta' class="btn btn-primary">Crear Cuenta</a>
                        <a href="#" id='cancelar' class="btn btn-danger">Cancelar</a>
                      </div>`;
  alertContainer.appendChild(alertContent);
  alertContainer.classList.remove("d-none");
  funciones();
};

const funciones = () => {
  const btnCrearCuenta = document.getElementById("crear-cuenta");
  const cancelar = document.getElementById("cancelar");
  const userName = document.getElementById("user-crear");
  const userPass = document.getElementById("pass-crear");

  btnCrearCuenta.addEventListener("click", (e) => {
    e.preventDefault();
    const result = crearUsuario(userName.value, userPass.value);

    if (!result) {
      return alert("Usuario o Contraseña Inválidos");
    }

    login(userName.value, userPass.value);

    if (getUserActive()) {
      alertContainer.removeChild(alertContent);
      alertContainer.classList.add("d-none");
      alert('Usuario Creado')
    }

    reload();

    userName.value = userPass.value = "";
    document.body.style.overflow = "scroll";
  });

  cancelar.addEventListener("click", (e) => {
    e.preventDefault();
    alertContainer.removeChild(alertContent);
    alertContainer.classList.add("d-none");
    document.body.style.overflow = "scroll";
  });
};

export { crearCuentaDOM };
