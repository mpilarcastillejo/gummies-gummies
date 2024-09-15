function mostrarFormulario() {
    document.getElementById('pago').classList.remove('hidden');
}

document.getElementById('payment-form').addEventListener('submit', function (event) {
    event.preventDefault();
    document.getElementById('confirmation').classList.remove('hidden');
});

const cantidadInput = document.getElementById('cantidad');
const form = document.getElementById('payment-form');
const tarjetaInput = document.getElementById('tarjeta');
const fechaExpiracionInput = document.getElementById('fecha-expiracion');
const cvvInput = document.getElementById('cvv');
const paymentMessage = document.getElementById('payment-message');

// Formato para las tarjetas de crédito (acepta 16 dígitos)
function validarTarjeta(tarjeta) {
    const regexTarjeta = /^[0-9]{16}$/;
    const tarjetaLimpia = tarjeta.replace(/\s+/g, ''); // Quitar espacios
    return regexTarjeta.test(tarjetaLimpia);
}

// Validar la fecha de expiración (formato MM/AA)
function validarFechaExpiracion(fecha) {
    const regexFecha = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    if (!regexFecha.test(fecha)) return false;

    const hoy = new Date();
    const mes = parseInt(fecha.split('/')[0], 10);
    const año = parseInt('20' + fecha.split('/')[1], 10);

    if (año < hoy.getFullYear() || (año === hoy.getFullYear() && mes < hoy.getMonth() + 1)) {
        return false;
    }
    return true;
}

// function comprar() {
//     const paymentForm = document.getElementById('pagar');
//     paymentForm.classList.remove('d-none');
// }
// Validar el CVV (3 dígitos)
function validarCVV(cvv) {
    const regexCVV = /^[0-9]{3}$/;
    return regexCVV.test(cvv);
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const cantidad = cantidadInput.value;
    const tarjeta = tarjetaInput.value;
    const fechaExpiracion = fechaExpiracionInput.value;
    const cvv = cvvInput.value;
    let esValido = true;
    if (!validarCVV(cantidad)) {
        cantidadInput.classList.add('is-invalid');
        esValido = false;
    } else {
        cantidadInput.classList.remove('is-invalid');
    }
    // Validación de tarjeta
    if (!validarTarjeta(tarjeta)) {
        tarjetaInput.classList.add('is-invalid');
        esValido = false;
    } else {
        tarjetaInput.classList.remove('is-invalid');
    }

    // Validación de fecha de expiración
    if (!validarFechaExpiracion(fechaExpiracion)) {
        fechaExpiracionInput.classList.add('is-invalid');
        esValido = false;
    } else {
        fechaExpiracionInput.classList.remove('is-invalid');
    }

    // Validación de CVV
    if (!validarCVV(cvv)) {
        cvvInput.classList.add('is-invalid');
        esValido = false;
    } else {
        cvvInput.classList.remove('is-invalid');
    }
    const paymentForm = document.getElementById('payment-form');
    const paymentMessage = document.getElementById('payment-message');
    console.log(paymentMessage.classList);

    if (esValido) {
        form.reset();
        paymentMessage.classList.remove('d-none');
        paymentForm.classList.add('d-none');
    }
});


// Formatear número de tarjeta mientras se escribe
tarjetaInput.addEventListener('input', function () {
    let tarjeta = tarjetaInput.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    tarjeta = tarjeta.match(/.{1,4}/g)?.join(' ') || tarjeta;
    tarjetaInput.value = tarjeta;
});

cantidadInput.addEventListener('input', function () {
    let cantidad = cantidadInput.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    cantidad = cantidad.match(/.{1,4}/g)?.join(' ') || cantidad;
    cantidadInput.value = cantidad;
});