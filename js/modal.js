
// Modal Bienvenida + Suscripcion
const { value: email } = Swal.fire({
    title: 'Bienvenido!!!',
    html: '<b>Suscribete</b> para recibir todas las actualizaciones',
    imageUrl: 'img/imagenhero.png',
    imageWidth: 400,
    imageHeight: 200,
    input: 'email',
    inputPlaceholder: 'Ingresa tu E-mail',
    inputAttributes: {
    autocapitalize: 'off'},
    imageAlt: 'Custom image',
    footer: 'y obtene un  <b>10% de Descuento</b>'
})
    if (email) {
        Swal.fire(`Ingresaste: ${email} tus Cupon es Camba10`)
    }






