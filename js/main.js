// variable 
const contenedorCursos = document.querySelector('#lista-cursos')
const carrito = document.querySelector('#carrito')
const contadorCarrito = document.querySelector('#contadorCarrito')
const precioCarrito = document.querySelector('#precioTotal')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciaCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = [];

// Div Contenedor de Productos
cursos.forEach( (cursos) => {
    
    const div = document.createElement('div')
div.className = 'four columns'

div.innerHTML = `

    <div class="card">
        <img src=${cursos.imagen} class="imagen-curso u-full-width">
        <div class="info-card">
            <h4>${cursos.titulo}</h4>
            <p>${cursos.profesor}</p>
            <img src=${cursos.calificacion} class="calificacion">
            <p class="precio">$${cursos.precio}  <span class="u-pull-right ">$${cursos.descuento}</span></p>
            <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${cursos.id}">Agregar Al Carrito</a>
        </div>
    </div>

`

contenedorCursos.append(div)

})
// Cantidad de cursos en el carrito (circulo Rojo)
const cantidadCursosCarrito = () => {
    contadorCarrito.innerText  = articulosCarrito.length
}

// Precio total carrito (verificar)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const precioTotalCarrito = () => {

    let total = 0

    articulosCarrito.forEach((curso) => {
        total += curso.precio
    })

    precioCarrito.innerText = total
    
}

// ============== Eventos ==============//
cargarEventlisteners ();
function cargarEventlisteners () {
    listaCursos.addEventListener('click', agregarCurso)


    // eliminar elementos del carrito
    carrito.addEventListener('click', eliminarCurso)

    // Muestra los cursos de LocalStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') || [])

        carritoHTML()
    } )

    // Vaciar Carrito
    vaciaCarritoBtn.addEventListener('click', () => {

        // Modal Confirmar vaciar carrito
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
            title: 'Esta Seguro que desea Vaciar el Carrito',
            text: "Perderas todo lo guardado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, vaciar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'Borrado!',
                'El Carrito esta vacio',
                'success',
                articulosCarrito = [],
                limpiarHTML(),
                                
            )
            } else if (
              /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'Cancelado',
                'Tus cursos siguen en el carrito :)',
                'error'
                )
            }
        })

        

        
    })
}



// ============== Funciones ==============//

// Agregar curso al Carrito
function agregarCurso(evento) {
    evento.preventDefault();

    if ( evento.target.classList.contains('agregar-carrito')) {
        const cursoElegido = evento.target.parentElement.parentElement
        
swal.fire({
    icon:'success',
    title:'Producto agregado al carrito',
    toast: true,
    timer: 1500,
    showConfirmButton: false,
    position: 'bottom-left'
})

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
    

//console.log(articulosCarrito)

    carritoHTML();
    
}

// Incertar Articulo en Carrito
function carritoHTML() {

    // Limpia el Carrito
    limpiarHTML();
    cantidadCursosCarrito()
    precioTotalCarrito()//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
            <a href="#" class="borrar-curso" data-id="${curso.id}"><i class="fa-solid fa-trash-can"></i></a>
        </td>
        `

        // Agrega el HTML del Acrrito al tbody
        contenedorCarrito.appendChild(row);
    })

    // Agregar el carrito del compras al storage
    sincronizarStorage()

}

function limpiarHTML() {
    contenedorCarrito.innerHTML = '';
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}




/* ======= DARK MODE ============= */

$(document).ready(function() {
    $("#color_mode").on("change", function () {
        colorModePreview(this);
    })
});

function colorModePreview(ele) {
    if($(ele).prop("checked") == true){
        $('body').addClass('dark-preview');
        $('body').removeClass('white-preview');
    }
    else if($(ele).prop("checked") == false){
        $('body').addClass('white-preview');
        $('body').removeClass('dark-preview');
    }
}