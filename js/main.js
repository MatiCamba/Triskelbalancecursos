
let total = 0
const contenedorCursos = document.querySelector('#lista-cursos')
const carrito = document.querySelector('#carrito')
const contadorCarrito = document.querySelector('#contadorCarrito')
const precioCarrito = document.querySelector('#precioTotal')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciaCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
const pagar = document.querySelector('#finalizar-compra')
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
            <p class="precio">$ ${parseInt(cursos.precio)}  <span class="precio-descuento ">$ ${parseInt(cursos.descuento)}</span></p>
            <button class="button-add agregar-carrito" onclick="add(${cursos.id}, ${cursos.descuento})" data-id="${cursos.id}">Agregar al Carrito</button>
        </div>
    </div>

`
contenedorCursos.append(div)
})

// Cantidad de cursos en el carrito (circulo Rojo)
const cantidadCursosCarrito = () => {
    contadorCarrito.innerText  = articulosCarrito.length
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
                cantidadCursosCarrito()

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

// Agrega el Precio al Carrito 
function add(curso, precio){

    //console.log(curso, precio)
    //articulosCarrito.push(curso)
    total = total + precio
    document.querySelector('#precioTotal').innerHTML = `Precio Total: $${total}`

    
    carritoHTML();
}

/* function pay() {
    window.alert(articulosCarrito.join(", \n"));
} */

console.log(articulosCarrito)

// Elimina un curso
function eliminarCurso (evento) {

    if(evento.target.classList.contains('borrar-curso')) {
        const cursoId = evento.target.getAttribute('data-id')

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        
        carritoHTML();
    }
}


// contenido Curso
function leerDatosCurso (cursos) {
    //console.log(cursos)

    // Objeto con el Contenido del Curso
    const infoCurso = {
        imagen:cursos.querySelector('img').src,
        titulo: cursos.querySelector('h4').textContent,
        precio: cursos.querySelector('.precio span').textContent,
        id: cursos.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }
    console.log(infoCurso)

    // Elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    if(existe) {
        const cursos = articulosCarrito.map(cursos => {
            if( cursos.id === infoCurso.id ) {
                cursos.cantidad++
                return cursos
            } else {
                return cursos
            }
        })
        articulosCarrito = [...cursos]
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    
    carritoHTML();
}

// Incertar Articulo en Carrito
function carritoHTML() {

    // Limpia el Carrito
    limpiarHTML();
    cantidadCursosCarrito()
    

    // Funcion Recorre Carrito
    articulosCarrito.forEach (cursos => {
    
        const row = document.createElement('tr')

        row.innerHTML = `
        <td>
            <img src="${cursos.imagen}" width="80">
        </td>
        <td>
            ${cursos.titulo}
        </td>
        <td>
            ${cursos.precio}
        </td>
        <td>
            ${cursos.cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${cursos.id}"><i class="fa-solid fa-trash-can"></i></a>
        </td>
        `
        
        // Agrega el HTML del Acrrito al tbody
        contenedorCarrito.appendChild(row);
    })

    // Agregar el carrito de compras al storage
    sincronizarStorage()

}

function limpiarHTML() {
    contenedorCarrito.innerHTML = '';
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}


// Precio total carrito (verificar)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


/* ======= DARK MODE ============= */

const colorModeButton = document.querySelector("#color-mode");
const body = document.body;

colorModeButton.addEventListener("click", cambiarModoColor);
function cambiarModoColor() {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        colorModeButton.innerText = "Light Mode";
    } else {
        colorModeButton.innerText = "Dark Mode";
    }
}

/* ======= Input Descuento ============= */

const agregarForm = document.querySelector("#agregar-form");
const agregarInput = document.querySelector("#agregar-input");
const agregar = document.querySelector("#agregar");

agregarForm.addEventListener("submit", agregarDescuento);

function agregarDescuento(e) {
    e.preventDefault();

    if (agregarInput.value != "" && agregarInput.value === "Camba10") {
        let item = document.createElement("li");
        item.innerText = agregarInput.value;
        descuento = (precioCarrito*0.90)
        agregar.append(item);
        agregar.append(descuento);
    } else if (agregarInput.value != "" && agregarInput.value != "Camba10") {
        Swal.fire('Tu Codigo no tiene descuento')
    } else {
        Swal.fire('Agrega tu Codigo')
    }

    agregarForm.reset();
}