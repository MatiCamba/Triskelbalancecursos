
// Modal Bienvenida + Suscripcion


const { value: email } = Swal.fire({
    title: 'Bienvenido!!!',
    html: '<b>Suscribete</b> para recibir todas las actualizaciones',
    imageUrl: 'img/imagenhero.png',
    imageWidth: 600,
    imageHeight: 300,
    input: 'email',
    inputLabel: 'Ingresa tu E-mail',
    inputPlaceholder: 'Ingresa tu E-mail',
    inputAttributes: {
    autocapitalize: 'off'},
    imageAlt: 'Custom image',
    footer: 'y obtene un  <b>10% de Descuento</b>'
}).then((email) => {
    if (email.isConfirmed == true) {
        Swal.fire(`Bienvenido: ${email.value}<hr> Tu Cupon de descuento es <hr> <b>"Camba10"</b>`)
        console.log(email)
    }else if (email.isConfirmed == false){
        swal.fire (`Que disfrutes de los cursos`)
    }   
})
    






