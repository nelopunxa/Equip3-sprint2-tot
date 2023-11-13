"use strict";

function main() {
    let table = document.getElementById('garage-table');
    let imatges = ['imgCarret/rollsRoyce.jpeg', 'imgCarret/ferrari.jpeg', 'imgCarret/buggati.jpeg', 'imgCarret/maserati.webp', 'imgCarret/mercedes.jpeg', 'imgCarret/porsche.jpeg'];
    let marques = ['Rolls Royce', 'Ferrari', 'Buggati', 'Maserati', 'Mercedes', 'Porsche'];
    let carret = [];
    let id = 1;
    let totalCarret = 0;

    createThs(table);

    for (let i = 0; i < 3; i++) {
        createTds(table);
    }

    /**
     * Mètode que crea els títols de cada cel·la de la taula
     * @param {*} table la taula en la que volen que s'inserten els Th's
     */
    function createThs(table) {
        let tr = document.createElement('tr');
        createTh("", tr);
        createTh("", tr);
        createTh("Preu (€)", tr);
        createTh("Quant.", tr);
        createTh("Total (€)", tr);
        createTh("", tr);
        table.append(tr);
    }

    /**
     * Mètode que crea les cel·les de contingut de la taula i les emplena del seu corresponent contingut
     * @param {*} table la taula en la que volen que s'inserten els Td's
     */
    function createTds(table) {
        let tr = document.createElement('tr');

        var cantitat = 1;
        let importe = parseInt(Math.random() * 200000 + 100000);
        let img = document.createElement('img');
        img.setAttribute('src', imatges[parseInt(Math.random() * imatges.length)]);
        img.setAttribute('width', '100px');

        // Objecte de tipus vehicle
        let vehicle = {
            image: img,
            nom: marques[parseInt(Math.random() * marques.length)],
            import: importe,
            cantitat: cantitat,
        }

        calculaTotalCarret(vehicle.import);

        let div = document.createElement('div');
        let buttonDel = document.createElement('button'); // Botó per eliminar el producte del carret
        buttonDel.setAttribute('id', id);
        buttonDel.innerHTML = '<i class="fa-solid fa-xmark"></i>';

        let buttonResta = document.createElement('button'); // Botó per disminuir la cantitat de vehicles
        buttonResta.innerHTML = '<i class="fa-solid fa-minus"></i>';

        let buttonSuma = document.createElement('button'); // Botó per incrementar la cantitat de vehicles
        buttonSuma.innerHTML = '<i class="fa-solid fa-plus"></i>';

        div.append(buttonResta);
        div.append(vehicle.cantitat);
        div.append(buttonSuma);

        createTd("imagenV", vehicle.image, tr);
        let nombreTd = createTd("nombreV", '', tr);
        nombreTd.innerHTML = `<strong>${vehicle.nom}</strong><br>Característiques:<br><br>`;
        nombreTd.style.textAlign = 'left'; // Alinear a la izquierda
        nombreTd.style.marginTop = '5px'; // Margen superior de 5px
        createTd("importe", formatPrice(vehicle.import), tr);
        createTd("cantidad", div, tr);
        createTd("total", formatPrice(calculaTotalProducte(vehicle.cantitat, vehicle.import)), tr);
        createTd("del", buttonDel, tr);

        carret.push(vehicle);
        localStorage.setItem('vehicle' + id, JSON.stringify(vehicle));

        table.append(tr);
        id += 1;

        /**
         * Aquest event fa que quan es clicke en el botó de suma incremente la cantitat del mateix producte
         */
        buttonSuma.addEventListener('click', function () {
            vehicle.cantitat++;
            div.textContent = "";
            div.append(buttonResta);
            div.append(vehicle.cantitat);
            div.append(buttonSuma);

            let total = tr.querySelector('.total');
            total.textContent = "";
            total.textContent = formatPrice(calculaTotalProducte(vehicle.cantitat, vehicle.import));

            updateSubtotal(); // Actualizar subtotal en tiempo real
        });

        /**
         * Aquest event fa que quan es clicke en el botó de resta disminueixca la cantitat del mateix producte
         */
        buttonResta.addEventListener('click', function () {
            if (vehicle.cantitat > 1) {
                vehicle.cantitat--;
                div.textContent = "";
                div.append(buttonResta);
                div.append(vehicle.cantitat);
                div.append(buttonSuma);

                let total = tr.querySelector('.total');
                total.textContent = "";
                total.textContent = formatPrice(calculaTotalProducte(vehicle.cantitat, vehicle.import));

                resta(vehicle.import);
                updateSubtotal(); // Actualizar subtotal en tiempo real
            }
        });

        /**
         * Aquest event fa que quan es clicke en el botó de eliminar, s'esborre el producte del carret
         */
        buttonDel.addEventListener('click', function () {
            tr.remove();
            let index = carret.indexOf(vehicle);
            if (index !== -1) {
                carret.splice(index, 1);
            }

            localStorage.removeItem('vehicle' + buttonDel.getAttribute('id'));
            if (buttonDel.getAttribute('id') == id) {
                localStorage.removeItem('vehicle' + id);
            }

            resta(vehicle.import);
            updateSubtotal(); // Actualizar subtotal en tiempo real
        });
    }

    /**
     * Mètode que crea els th's de la taula, afegint el contingut desitjat
     */
    function createTh(content, tr) {
        let th = document.createElement('th');
        th.append(content);
        tr.append(th);
    }

    /**
     * Mètode que crea els td's de la taula, afegint el contingut desitjat
     */
    function createTd(clase, content, tr) {
        let td = document.createElement('td');
        td.setAttribute('class', clase);
        td.append(content);
        tr.append(td);
        return td;
    }

    /**
     * Mètode que actualiza el subtotal en la taula.
     */
    function updateSubtotal() {
        let subtotalRow = document.getElementById('subtotal');
        if (subtotalRow) {
            let total = 0;
            carret.forEach(function (vehicle) {
                total += calculaTotalProducte(vehicle.cantitat, vehicle.import);
            });

            let tdTotal = subtotalRow.querySelector('td:last-child');
            tdTotal.textContent = formatPrice(total);
        }
    }

    // Inicializar la fila de subtotal
    createSubtotalRow(table);

    /**
     * Mètode que inicialitza la fila de subtotal.
     */
    function createSubtotalRow(table) {
        let subtotalRow = document.createElement('tr');
        subtotalRow.setAttribute('id', 'subtotal');

        for (let i = 0; i < 3; i++) {
            createTd("", "", subtotalRow);
        }

        let tdSubtotal = document.createElement('td');
        tdSubtotal.textContent = 'Subtotal';

        let tdTotal = document.createElement('td');
        tdTotal.textContent = formatPrice(totalCarret);

        subtotalRow.appendChild(tdSubtotal);
        subtotalRow.appendChild(tdTotal);

        table.appendChild(subtotalRow);
    }

    /**
     * Mètode que calcula l'import total del producte.
     * @param {*} cant determina la cantitat del mateix producte
     * @param {*} imp determina l'import d'una unitat del vehicle anyadit
     */
    function calculaTotalProducte(cant, imp) {
        return cant * imp;
    }

    /**
     * Mètode que calcula l'import total del carret.
     * @param {*} imp determina l'import total d'un mateix tipus de vehicle
     */
    function calculaTotalCarret(imp) {
        totalCarret += imp;
    }

    /**
     * Mètode que li resta l'import del vehicle seleccionat a l'import total del carret.
     * @param {*} imp determina l'import total d'un mateix tipus de vehicle
     */
    function resta(imp) {
        totalCarret -= imp;
    }

    /**
     * Mètode que da formato a un precio con punto como separador de miles y añade el símbolo € al final.
     * @param {*} price El precio a formatear.
     */
    function formatPrice(price) {
        return price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
    }

    let confirmarPagamentButton = document.getElementById('confirmarpagament');
    // Agrega un controlador de eventos para el clic en el botón
    confirmarPagamentButton.addEventListener('click', function () {
        // Redirige a la página "mastercard.html"
        window.location.href = 'mastercard.html';
    });

    const botopagament = document.getElementById('confirmarpagament');
    botopagament.addEventListener("mouseover", function () {
        botopagament.style.backgroundColor = "#aa8e31ff";
        botopagament.style.transition = "1s";
    });

    botopagament.addEventListener("mouseout", function () {
        botopagament.style.backgroundColor = "#e7d381ff";
        botopagament.style.transition = "1s";
    });

    if (currentPage === 'garatge.html') {
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

}

document.addEventListener('DOMContentLoaded', main);
