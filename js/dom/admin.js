

const crearLibroForm = () => {
    const box = document.createElement('div');
    box.classList.add('box-container');
    box.innerHTML = `
    <form class="nuevo-libro">
      <label>T&iacute;tulo</label>
      <input type="text" name="" id="titulo" />
      <label>Descripci&oacute;n</label>
      <textarea name="" id="descripcion" cols="30" rows="10"></textarea>
      <div class="col-5">
        <label>Autor</label>
        <input type="text" name="" id="author" />
      </div>
      <div class="col-5">
        <label>G&eacute;nero</label>
        <input type="text" name="" id="genre" />
      </div>
      <div class="col-5">
        <label>Editorial</label>
        <input type="text" name="" id="editorial" />
      </div>
      <div class="col-5">
        <label>A&ntilde;o</label>
        <input type="number" min="1900" name="" id="year" />
      </div>
      <div class="col-5">
        <label>URL de Imagen de Tapa</label>
        <input type="text" name="" id="img" />
      </div>
      <div class="col-5">
        <label>Cantidad</label>
        <input type="number" min="1" name="" id="cantidad" />
      </div>
      <button
        class="btn btn-ok"
        type="submit"
        aria-valuemin="1"
        id="nuevo-libro"
      >
        Crear Nuevo Libro
      </button>
      <button class="btn" type="submit" aria-valuemin="1" id="cancelar-box">
        Cancelar
      </button>
    </form>`
}
