"use strict";

function main() {
    acceptCookies();
    const nombreInput   = document.getElementById('nombre');
    const phoneInput    = document.getElementById('telefono');
    nombreInput.addEventListener('input', function() {
        // Reemplazar cualquier dígito (número) o caracter que no sea espacio en blanco con una cadena vacía
        this.value = this.value.replace(/[^A-Za-z\s]/g, '');
    });

    phoneInput.addEventListener('input', function() {
        // Reemplazar cualquier dígito (número) o caracter que no sea espacio en blanco con una cadena vacía
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    
    const inputsText = document.querySelectorAll('.text');
    for(let i = 0;i < inputsText.length;i++){
        inputsText[i].addEventListener('focus',function(){
            inputsText[i].style.backgroundColor = "#e7d381ff";
        });
        inputsText[i].addEventListener('blur',function(){
            inputsText[i].style.backgroundColor = "";
        });
    }

    document.addEventListener('keydown',(event)=>{
        if(event.key === 'ArrowDown'){
            for(let i = 0;i < inputsText.length;i++){
                if(document.activeElement === inputsText[i]){
                    if(i < inputsText.length - 1){
                        inputsText[i+1].focus();
                    }
                    break;
                }
            }    
        }
        if(event.key === 'ArrowUp'){
            for(let i = 0;i < inputsText.length;i++){
                if(document.activeElement === inputsText[i]){
                    if(i > 0){
                        inputsText[i-1].focus();
                    }
                    break;
                }
            }    
        }
    })
    /*
    if(phoneInput.validity.rangeOverflow){
        alert("The maximum length is 9 numbers");
    }
    */
    var bPreguntar = true;
    window.onbeforeunload = preguntarAntesDeSalir();

    function preguntarAntesDeSalir(){
        if (bPreguntar)
        displayModal();
    }

    let conditionsLink = document.getElementById('conditions');
    conditionsLink.addEventListener('click',function(){
        Swal.fire({
            title: 'Condiciones de Uso',
            text: 'Las condiciones de uso de esta página són las siguientes: Recopilamos tus preferencias, ya pueden ser (Coches Mirados, Marcas favoritas, Coches comprados, etc), comprobamos que tus datos són correctos, ya que pueden ser erróneos, Belligol, Belligham, o iluminado ',
            confirmButtonText: 'Entendido!',
            confirmButtonColor: '#181d33ff'
          })
    });
}   

function submitButton(){
    let form = document.getElementById('paymentForm');

    form.submit();
    console.log('enviau');
}

function displayModal(){
    let modal = document.querySelector('.modal');
    modal.classList.add('modal_open');
    let si = document.getElementById('si');
    let no = document.getElementById('no');

    si.addEventListener('click',function(){
        modal.classList.remove('modal_open');
        window.location.pathname = "Facturacio-c-e.html";
    });
    
    no.addEventListener('click',function(){
        modal.classList.remove('modal_open');
    });
}

function acceptCookies(){
    let p = document.createElement('p');
    let pagar = document.getElementById('pagar');
    let cookies = document.getElementById('terminos');
    let form = document.querySelector('form');
    
    p.textContent = "";
    checkCheckBox(cookies,form,p);

    pagar.addEventListener('click',function(){
        if(!cookies.checked){
            p.textContent = "Debes aceptar los terminos y condiciones";
            form.append(p);
        }
    });
    pagar.addEventListener('mouseover',function(){
        pagar.style.backgroundColor = "#aa8e31ff";
        pagar.style.transition = "0.5s";
    });

    pagar.addEventListener('mouseout',function(){
        pagar.style.backgroundColor = "#e7d381ff";
        pagar.style.transition = "0.5s";
    });
}

function checkCheckBox(cookies,form,p){
    cookies.addEventListener('change',function(){
        if(cookies.checked){
            p.textContent = "";
            form.append(p);
        }
    });
}




document.addEventListener('DOMContentLoaded',main);
