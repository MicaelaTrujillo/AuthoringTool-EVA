
var intentos = 0;
var avance = 0;
function cargarTarjetas(){
    var active = "active"
    var elementoPadre = document.getElementById("listaTarjetas")
    var startTolearnButton = document.getElementById("comenzar")

    elementoPadre.classList.remove("boton-tarjeta")

    elementoPadre = startTolearnButton.parentNode
    elementoPadre.removeChild(startTolearnButton)
    elementoPadre.removeChild(elementoPadre.querySelector("#listaTarjetas h4"))

    for(var i = 0; i < tarjetas.length; i++){
        listaTarjetas.innerHTML += `
        <article id="${tarjetas[i].id}T" class="card-gramar-main carousel-item ${active}">
            <section class="card-img-content">
                <section>
                    <img src=${tarjetas[i].tarjeta.imagen} alt="image" />
                </section>
            </section>

            <section class="card-title-content">
                    <label class="card-title-text">${tarjetas[i].tarjeta.descripcion}</label>
            </section>

            <section class="card-write-answer">
                <input id="${tarjetas[i].id}" class="card-input" type="text" placeholder="Escribe tu respuesta">

                <button 
                class="card-button" 
                data-bs-toggle="modal" 
                data-bs-target="#staticBackdrop"
                id="${tarjetas[i].id}"  
                data-tarjeta-id="${tarjetas[i].id}"
                onclick="verificar(this.id)">
                Verificar
                </button>
            </section>
        </article>`

        var inputTarjeta = document.getElementById(tarjetas[i].id);
        inputTarjeta.addEventListener("input", function(event) {
        clearTimeout(this.timeout); // Limpiar el timeout existente
        this.timeout = setTimeout(function() {
            mensajeInactividad(tarjetas[i].id);
        }, 8000); // Esperar 3 segundos de inactividad antes de mostrar el mensaje
        });
        active = ""
    }
   
}

function verificar(id){
    if(intentos == 3){
        let colorTarjeta = document.getElementById(id+"T")
        colorTarjeta.classList.add("color-tarjeta-fallo")
        document.getElementById(id).readOnly = true;
        document.getElementById("next-carousel-button").click();
        document.getElementById("modal-body").innerHTML = `Se acabaron tus intentos :(`
        document.getElementById("modal-button").innerHTML = `Aceptar`
        intentos=0;
        /*if(avance+1 == tarjetas.length){
            window.location.reload();
        }else{
            avance++;
        }*/
    }else{
        var correcta = tarjetas[parseInt(id.slice(-1))].tarjeta.respuestaCorrecta;
        let respuesta = document.getElementById(id).value;
        if(correcta.toUpperCase() == respuesta.toUpperCase()){
            let colorTarjeta = document.getElementById(id+"T")
            colorTarjeta.classList.add("color-tarjeta")
            document.getElementById("modal-body").innerHTML = `Felicidades, tu respuesta es correcta!!! \u{1F604}`
            document.getElementById("modal-button").innerHTML = `Continuar`
            intentos=0
            /*if(avance+1 == tarjetas.length){
                window.location.reload();
            }else{
                avance++;
            }*/
        }else{
            for( var i = 0; i<tarjetas[parseInt(id.slice(-1))].tarjeta.posiblesRespuestas.length; i++){
                let resposible = tarjetas[parseInt(id.slice(-1))].tarjeta.posiblesRespuestas[i].trim();
                let respuesta = document.getElementById(id).value.trim();
                if(resposible.toUpperCase() == respuesta.toUpperCase()){
                    document.getElementById("modal-body").innerHTML = `Casi lo consigues! \u{1F609} <br> La respuesta correcta inicia por "${correcta.slice(0,1)}"`
                    document.getElementById("modal-button").innerHTML = `Aceptar`
                    break;
                }else{
                    var pistas = tarjetas[parseInt(id.slice(-1))].tarjeta.pistas;
                    var random = Math.floor(Math.random() * pistas.length);
                    document.getElementById("modal-body").innerHTML = `No es la respuesta esperada \u{2639} <br> Aquí tienes una pista "${pistas[random]}"`
                    document.getElementById("modal-button").innerHTML = `Aceptar`
                }
            }
            
        }
        intentos++;
    }
    
}

function checkAnswer(){
    let button = document.getElementById("modal-button");
    if(button.innerHTML === "Continuar"){
        document.getElementById("next-carousel-button").click();
    }
}


  function mensajeInactividad(id){
    var pistas = tarjetas[parseInt(id.slice(-1))].tarjeta.pistas;
    var random = Math.floor(Math.random() * pistas.length);
    document.getElementById("modal-body").innerHTML = `No te congeles \u{1F976}! <br> Aquí tienes una pista "${pistas[random]}"`
    document.getElementById("modal-button").innerHTML = `Aceptar`
  }

  document.addEventListener('DOMContentLoaded', listenToChange);

  function listenToChange() {
    var myCarousel = document.getElementById('carouselExample');
    myCarousel.addEventListener('slid.bs.carousel', function() {
      var activeCard = myCarousel.querySelector('.carousel-item.active');
      //var cardId = activeCard.getAttribute('id');
      console.log('ID del card actual:', activeCard);
    });
  }