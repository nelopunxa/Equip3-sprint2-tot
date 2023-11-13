//Script remodelat per a la visa

"use strict"

function main() {

    //Botó confirmació
    let botoConfirmacio = document.getElementById("confirmarPagament");
    botoConfirmacio.addEventListener("click", validar);

    //Finestra modal per a cookies
    let popup = document.getElementById("popup");
    let tancarpopup = document.getElementById("tancarMissatge");

    if (localStorage.getItem("cookieNotificationClosed")) {
        popup.style.display = "block";
    }

    tancarpopup.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    //Finestra modal per a mostrar un missatge
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Evitar el menú contextual
        let modal = document.getElementById('modal');
        modal.style.display = 'block';
    });

    let cerrarButton = document.getElementById('aceptar');
    cerrarButton.addEventListener('click', function() {
        var modal = document.getElementById('modal');
        modal.style.display = 'none';
    });

    //Per a borrar les dades.
    let formulari = document.getElementById("formulari");
    formulari.reset();

    /**
     * Funció per a validar els formularis
     * @param {*} e 
     */
    function validar(e) {
        e.preventDefault();

        //Obtindre el valor dels camps
        let nomTitular = document.getElementById('nombreTitular').value;
        let codigoSeguridad = document.getElementById('codigoSeguridad').value;
        let numeroTarjeta = document.getElementById('numeroTarjeta').value;
        let fechaExpiracion = document.getElementById('expiracion').value;

        //Valor i neteja dels missatges d'error anteriors
        let nomTitularError = document.getElementById('nomError');
        let codigoSeguridadError = document.getElementById('codigoError');
        let numeroTarjetaError = document.getElementById('numTarjetaError');
        let fechaExpiracionError = document.getElementById('expiracionError');

        nomTitularError.textContent = '';
        codigoSeguridadError.textContent = '';
        numeroTarjetaError.textContent = '';
        fechaExpiracionError.textContent = '';

        //Comprobar si el campo del nombre está vacío
        if (nomTitular.trim() === '') {
            nomTitularError.textContent = "El campo está vacio, ingresa un nombre.";
            nomTitularError.style.color = "black";
            return;
        }

        //Verificació del nom
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/.test(nomTitular)) {    //Nom amb espai o no i que pot contindre accents
            nomTitularError.textContent = "El nombre no es correcto, introduce uno sin carácteres especiales ni números."
            nomTitularError.style.color = "red";
            return;
        }

        //Comprobar si el campo del código de seguridad está vacio
        if (codigoSeguridad.trim() === '') {
            codigoSeguridadError.textContent = "El campo está vacio, ingresa un código de seguridad.";
            codigoSeguridadError.style.color = "black";
            return;
        }

        //Verificación del código de seguridad
        if (!/^\d{3}$/.test(codigoSeguridad)) {     //Només permet 3 números
            codigoSeguridadError.textContent = "El código de seguridad no es correcto, introduce uno de tres números."
            codigoSeguridadError.style.color = "red";
            return;
        }

        //Validity en el código de seguridad
        /*if (codigoSeguridad.validity.rangeOverflow || !/^\d{3}$/.test(codigoSeguridad.value)) {
            codigoSeguridadError.textContent = "El código de seguridad no es correcto, introduce uno de tres números."
            codigoSeguridadError.style.color = "red";
            return;
        }*/

        //Comprobar si el campo del número de la tarjeta está vacio
        if (numeroTarjeta.trim() === '') {
            numeroTarjetaError.textContent = "El campo está vacio, ingresa un número de tarjeta.";
            numeroTarjetaError.style.color = "black";
            return;
        }

        //Verificación del número de la tarjeta
        if (!/^\d{16}$/.test(numeroTarjeta)) {      //Només permet 16 números
            numeroTarjetaError.textContent = "El número de la tarjeta no es correcto, introduce uno que contenga 16 números (sin letras ni carácteres especiales).";
            numeroTarjetaError.style.color = "red";
            return;
        }

        //Comprobar si el campo de la fecha de expiración está vacio
        if (fechaExpiracion.trim() === '') {
            fechaExpiracionError.textContent = "El campo está vacio, ingresa una fecha de expiración.";
            fechaExpiracionError.style.color = "black";
            return;
        }

        //Verificación de la fecha de expiración
        if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(fechaExpiracion)) {     //Només dates en format MM/AA
            fechaExpiracionError.textContent = "La fecha de expiración no es válida. Utiliza el formato MM/AA.";
            fechaExpiracionError.style.color = "red";
            return;
        }

        //Missatge per avisar que les dades introduïdes són correctes
        /*let p = document.createElement('p');
        p.innerHTML = "El nom del titular, el numero de seguretat, el numero de la tarjeta i la data d'expiració són correctes."
        p.style.color = "green";
        document.body.append(p);*/

        Swal.fire({
            title: 'Correcto',
            text: 'Todos los datos introducidos son correctos.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })

        //LocalStorage
        localStorage.setItem("nombreTitular", nomTitular);
    }

}

document.addEventListener('DOMContentLoaded', main);