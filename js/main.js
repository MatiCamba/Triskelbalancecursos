// variable 

const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciaCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = [];

cargarEventlisteners ();
function cargarEventlisteners () {
    listaCursos.addEventListener('click', agregarCurso)


    // eliminar elementos del carrito
    carrito.addEventListener('click', eliminarCurso)

    // Vaciar Carrito
    vaciaCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    })
}



// Funcionas
function agregarCurso(e) {
    e.preventDefault();

    if ( e.target.classList.contains('agregar-carrito')) {
        const cursoElegido = e.target.parentElement.parentElement
        
        leerDatosCurso(cursoElegido);
    }
}

// Elimina un curso
function eliminarCurso (evento) {

    if(evento.target.classList.contains('borrar-curso')) {
        const cursoId = evento.target.getAttribute('data-id')

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        
        carritoHTML();
    }
}


// contenido Curso
function leerDatosCurso (curso) {
    //console.log(curso)

    // Objeto con el Contenido del Curso
    const infoCurso = {
        imagen:curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    if(existe) {
        const cursos = articulosCarrito.map(curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++
                return curso
            } else {
                return curso
            }
        })
        articulosCarrito = [...cursos]
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    // Agrega al Carrito
    

    console.log(articulosCarrito)

    carritoHTML();
}

// Incertar Articulo en Carrito
function carritoHTML() {

    // Limpia el Carrito
    limpiarHTML();

    // Funcion Recorre Carrito
    articulosCarrito.forEach (curso => {
    
        const row = document.createElement('tr')

        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="80">
        </td>
        <td>
            ${curso.titulo}
        </td>
        <td>
            ${curso.precio}
        </td>
        <td>
            ${curso.cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}" > X </a>
        </td>
        `

        // Agrega el HTML del Acrrito al tbody
        contenedorCarrito.appendChild(row);
    })


}

function limpiarHTML() {
    contenedorCarrito.innerHTML = '';
}

