"use strict";
const bodymain = document.querySelector('main');
const inputElements = bodymain.querySelectorAll('input');


function main() {

    configurarInputs();
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'mastercard.html') {
        document.querySelectorAll('a').forEach(function (link) {
            // Verifica si el enlace no tiene la clase 'no-sweetalert'
            if (!link.classList.contains('no-sweetalert')) {
                link.addEventListener('click', function (event) {
                    event.preventDefault();
        
                    Swal.fire({
                        title: "Avís",
                        text: "¿Està segur de que vol eixir?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "green",
                        cancelButtonColor: 'red',
                        confirmButtonText: "Eixir",
                        cancelButtonText: "Cancelar",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = link.href;
                        } else {
                            Swal.fire("Cancelat", "Voste continua aquí", "error");
                        }
                    });
                });
            }
        });
        
    }

    const botopagament = document.getElementById('confirmarpagament');
    botopagament.addEventListener("mouseover", function () {
        botopagament.style.backgroundColor = "#aa8e31ff";
        botopagament.style.transition = "1s";
    });

    botopagament.addEventListener("mouseout", function () {
        botopagament.style.backgroundColor = "#e7d381ff";
        botopagament.style.transition = "1s";
    });

    const inputfocus = document.querySelectorAll('main input');
    inputfocus.forEach(function (input) {
        input.addEventListener("focus", function () {
            input.style.backgroundColor = "#e7d381ff";
        });

        input.addEventListener("blur", function () {
            input.style.backgroundColor = "";
        });
    });

    // Agregar un controlador de eventos para el evento keydown en el documento
    const inputs = document.querySelectorAll('input');
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            // Mover a la siguiente entrada, dependiendo de en que índice del array se encuentra
            for (let i = 1; i < inputs.length; i++) {
                if (document.activeElement === inputs[i]) {
                    if (i < inputs.length - 1) {
                        inputs[i + 1].focus();          // Se moverá al siguiente elemento del array y se podrá escribir
                    }
                    break;
                }
            }
        }
        else if (event.key === 'ArrowUp') {
            // Mover a la entrada anterior, dependiendo de en que índice del array se encuentra
            for (let i = 0; i < inputs.length; i++) {
                if (document.activeElement === inputs[i]) {
                    if (i > 1) {
                        inputs[i - 1].focus();          // Se moverá al anterior elemento del array y se podrá escribir
                    }
                    break;
                }
            }
        }
    });

    const numerotarjetaInput = document.getElementById("numerotarjeta");
    numerotarjetaInput.addEventListener("input", function (e) {
        // Elimina caracteres no numéricos y espacios
        let input = e.target;
        let formattedValue = input.value.replace(/\D/g, '');
        // Limita el número de dígitos a 16
        formattedValue = formattedValue.substring(0, 16);
        // Formatea con espacios cada 4 caracteres
        const formattedCardNumber = formattedValue.match(/.{1,4}/g).join(' ');
        input.value = formattedCardNumber;
        // Guarda el valor real (sin espacios) en un atributo personalizado
        input.setAttribute("data-real-value", formattedValue);
    });

    const codigoseguridadInput = document.getElementById("codigoseguridad");
    codigoseguridadInput.addEventListener("input", function (e) {
        // Elimina caracteres no numéricos
        let input = e.target;
        let formattedValue = input.value.replace(/\D/g, '');
        // Limita el número de dígitos a 3
        formattedValue = formattedValue.substring(0, 3);
        input.value = formattedValue;
        // Guarda el valor real (sin espacios) en un atributo personalizado
        input.setAttribute("data-real-value", formattedValue);
    });

    const expiracionInput = document.getElementById("expiracion");
    expiracionInput.addEventListener("input", function (e) {
        let input = e.target;
        let formattedValue = input.value.replace(/\D/g, ''); // Elimina caracteres no numéricos

        if (formattedValue.length >= 2) {
            const month = formattedValue.substring(0, 2);
            if (month < '01' || month > '12') {
                // Si el mes no está en el rango válido (01-12), ajusta la entrada
                formattedValue = '01 / ';
            }
            else {
                // Inserta una barra "/" después de los primeros 2 dígitos
                if (formattedValue.length >= 2) {
                    formattedValue = month + ' / ' + formattedValue.substring(2);
                }
            }
        }

        // Limita el número de dígitos a 7 (incluyendo la barra y espacios)
        formattedValue = formattedValue.substring(0, 7);
        input.value = formattedValue;

        // Guarda el valor real (sin espacios) en un atributo personalizado
        input.setAttribute("data-real-value", formattedValue.replace(/\D/g, ''));
    });


    // Prevenir la entrada de letras
    numerotarjetaInput.addEventListener("keypress", function (e) {
        const key = e.key;
        if (isNaN(key) || key === " " || numerotarjetaInput.value.replace(/\D/g, '').length >= 16) {
            e.preventDefault();
        }
    });

    // Prevenir la entrada de letras en el campo CVC
    codigoseguridadInput.addEventListener("keypress", function (e) {
        const key = e.key;
        if (isNaN(key) || key === " " || codigoseguridadInput.value.replace(/\D/g, '').length >= 3) {
            e.preventDefault();
        }
    });

    // Prevenir la entrada de letras en el campo de expiración
    expiracionInput.addEventListener("keypress", function (e) {
        const key = e.key;
        if (isNaN(key) || key === " " || expiracionInput.value.replace(/\D/g, '').length >= 4) {
            e.preventDefault();
        }
    });

    // Eliminar la barra divisoria al borrar el tercer número
    expiracionInput.addEventListener("input", function (e) {
        let input = e.target;
        let formattedValue = input.value;
        if (formattedValue.length === 5) {
            // Elimina la barra "/" y los " espacios " cuando se borra el tercer número
            formattedValue = formattedValue.substring(0, 2);
        }
        input.value = formattedValue;
    });

    // Agrega el evento de validación al botón de confirmar pago
    document.getElementById("confirmarpagament").addEventListener("click", validar);

    // Agrega eventos de escucha para cambios en los campos de entrada
    inputElements.forEach(input => {
        input.addEventListener("input", configurarInputs);
    });



    function configurarInputs() {
        // Recorre todos los elementos input
        inputElements.forEach(input => {
            if (input.value.trim() === "") {
                input.classList.remove('valid');
                input.classList.remove('invalid');
            }
            else if (input.validity.valid) {
                if (input.matches(':focus')) {
                    input.classList.remove('invalid');
                    input.classList.add('valid');
                }
                if (!input.matches(':focus')) {
                    input.classList.remove('invalid');
                    input.classList.remove('valid');
                }

            }
            else {
                input.classList.remove('valid');
                input.classList.add('invalid');
            }
        });
    }

    /**
     * Valida los datos del formulario antes de enviarlo.
     * @param {Event} e - Evento de click en el botón.
     * @returns {boolean} - True si la validación es exitosa, false en caso contrario.
     */
    function validar(e) {
        e.preventDefault();
        if (validarExpiracion() && validarNumtargeta() && validarNumseguretat() && validarFormatoExpiracion() && confirm("Confirma si vols enviar el formulari")) {
            // Restaura el valor real (sin espacios) en los campos
            const numerotarjetaInput = document.getElementById("numerotarjeta");
            const realCardNumberValue = numerotarjetaInput.getAttribute("data-real-value");
            numerotarjetaInput.value = realCardNumberValue;

            const codigoseguridadInput = document.getElementById("codigoseguridad");
            const realCvcValue = codigoseguridadInput.getAttribute("data-real-value");
            codigoseguridadInput.value = realCvcValue;

            const expiracionInput = document.getElementById("expiracion");
            const realExpirationValue = expiracionInput.getAttribute("data-real-value");
            expiracionInput.value = realExpirationValue;

            return true;
        }
        else {
            console.log("Algun campo no corresponde con el formato requerido");
            return false;
        }
    }

    /**
     * Valida la fecha de expiración de la tarjeta.
     * @returns {boolean} - True si la fecha es válida, false si es incorrecta.
     */
    function validarExpiracion() {
        const dataExpiracio = document.getElementById("expiracion").value;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const expiryMonth = parseInt(dataExpiracio.split('/')[0]);
        const expiryYear = parseInt(dataExpiracio.split('/')[1]);

        if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
            console.log("La fecha es incorrecta");
            return false;
        }
        console.log("La fecha es correcta");
        return true;
    }

    /**
     * Valida el número de tarjeta.
     * @returns {boolean} - True si el número es válido, false si es incorrecto.
     */
    function validarNumtargeta() {
        var element = document.getElementById("numerotarjeta");
        if (!element.checkValidity()) {
            if (element.validity.valueMissing) {
                alert("Deus d'introduïr un número de tarjeta.");
            }
            if (element.validity.patternMismatch) {
                alert("El número ha de estar formatat per 16 cifres.");
            }
            return false;
        }
        return true;
    }

    /**
     * Valida el código de seguridad (CVC) de la tarjeta.
     * @returns {boolean} - True si el CVC es válido, false si es incorrecto.
     */
    function validarNumseguretat() {
        var element = document.getElementById("codigoseguridad");
        if (!element.checkValidity()) {
            if (element.validity.valueMissing) {
                alert("Deus d'introduïr un codi de seguretat.");
            }
            if (element.validity.patternMismatch) {
                alert("Deus de introduir un codi de seguretat valid.");
            }
            return false;
        }
        return true;
    }

    /**
     * Valida el formato de la fecha de expiración.
     * @returns {boolean} - True si el formato es válido, false si es incorrecto.
     */
    function validarFormatoExpiracion() {
        var element = document.getElementById("expiracion");
        if (!element.checkValidity()) {
            if (element.validity.valueMissing) {
                alert("Deus d'introduïr una fecha d´expiració.");
            }
            else if (!element.validity.patternMismatch) {
                const dataExpiracio = element.value;
                const expiryMonth = parseInt(dataExpiracio.split('/')[0]);
                const expiryYear = parseInt(dataExpiracio.split('/')[1]);
                const currentYear = new Date().getFullYear() % 100;

                if (expiryYear < 0 || expiryYear > 99 || expiryMonth < 1 || expiryMonth > 12) {
                    alert("Mes y año de expiración no válidos.");
                    return false;
                }
                else if (expiryYear === currentYear && expiryMonth < new Date().getMonth() + 1) {
                    alert("La fecha de expiración no puede estar en el pasado.");
                    return false;
                }
            }
            else {
                alert("Deus de introduir una fecha d´expiració valida.");
                return false;
            }
        }
        return true;


    }


}

document.addEventListener('DOMContentLoaded', main());


