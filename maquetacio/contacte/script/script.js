'use strict';

function main() {
    let name = document.querySelector('#nom');
    let email = document.querySelector('#email');
    let reason = document.querySelector('#motiu');
    let order = document.querySelector('#comanda');
    let matter = document.querySelector('#assumpte');
    let message = document.querySelector('#missatge');

    validarCamps(name, 'Camp obligatori');
    validarCamps(email, 'Camp obligatori');
    validarCamps(reason, 'Camp obligatori');
    validarCamps(order, 'Camp obligatori');
    validarCamps(matter, 'Camp obligatori');
    validarCamps(message, 'Camp obligatori');

    // Escolta l'esdeveniment d'entrada al camp 'motiu' i guarda el seu valor com una galeta anomenada 'motiu'
    document.querySelector('#motiu').addEventListener('input', (event) => document.cookie = `motiu=${event.target.value}`);


    // Cargar valors emmagatzemats en el Local Storage
    name.value = localStorage.getItem('name') || '';
    email.value = localStorage.getItem('email') || '';
    reason.value = localStorage.getItem('reason') || '';
    order.value = localStorage.getItem('order') || '';
    matter.value = localStorage.getItem('matter') || '';
    message.value = localStorage.getItem('message') || '';

    // Agregar un event "input" a cada camp per a guardar el seu valor
    name.addEventListener('input', () => {
        // Expressió per a permetre tant sols lletres (mayuscules i minuscules) amb espais en blanc
        name.value = name.value.replace(/[^a-zA-Z\s]/g, '');
        localStorage.setItem('name', name.value);
    });

    email.addEventListener('input', () => {
        localStorage.setItem('email', email.value);
    });

    reason.addEventListener('input', () => {
        localStorage.setItem('motiu', motiu.value);
    });

    order.addEventListener('input', () => {
        localStorage.setItem('order', order.value);
    });

    matter.addEventListener('input', () => {
        localStorage.setItem('matter', matter.value);
    });

    message.addEventListener('input', () => {
        localStorage.setItem('message', message.value);

    });


    //Menú d'hamburguesa
    // selector
    var menu = document.querySelector('.hamburger');

    // method
    function toggleMenu(event) {
        this.classList.toggle('is-active');
        document.querySelector(".menuppal").classList.toggle("is_active");
        event.preventDefault();
    }

    // event
    menu.addEventListener('click', toggleMenu, false);

}

function validarCamps(camps, missatge) {
    // Agrega un event d'escolta al camp d'entrada de text per al event "input".
    camps.addEventListener('input', () => {

        // Estableix un missatge de validació personalitzat en blanc.
        camps.setCustomValidity('');

        // Verificar el camp d'entrada de text. Si el camp esta buit i es obligatori, esta funció tornarà "false". Si el camp conté text, tornarà "true".
        camps.checkValidity();
        // Mostra el resultat per consola
        console.log(camps.checkValidity);
    });

    // Agrega un event d'escolta al camp d'entrada de text per al event "invalid".
    camps.addEventListener('invalid', () => {

        // Aquesta linea estableix un missatge de validació personalitzat que indica el usuari que ha d'omplir el camp.
        camps.setCustomValidity(missatge);
    })
}

document.addEventListener('DOMContentLoaded', main);