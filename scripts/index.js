var intentos = 0;
var avance = 0;
function cargarTarjetas(){
    var active = "active"
    var elementoPadre = document.getElementById("listaTarjetas")
    var startToLearnButton = document.getElementById("comenzar")
    elementoPadre.classList.remove("boton-tarjeta")
    elementoPadre = startToLearnButton.parentNode
    elementoPadre.removeChild(startToLearnButton)
    elementoPadre.removeChild(elementoPadre.querySelector("div h4"))

    console.log("first")
    for(var i = 0; i < tarjetas.length; i++){
        var tarjetaId = tarjetas[i].id;
        listaTarjetas.innerHTML += `
        <article class="card-gramar-main carousel-item ${active}">
            <section class="card-img-content">
                <section>
                    <img src=${tarjetas[i].tarjeta.imagen} alt="ice-cream-image" />
                </section>
            </section>

            <section class="card-title-content">
                <label class="card-title-text">${tarjetas[i].tarjeta.descripcion}</label>
            </section>

            <section class="card-write-answer">
                <input id="${tarjetaId}" class="card-input" type="text" placeholder="Escribe tu respuesta">

                <button 
                class="card-button" 
                data-bs-toggle="modal" 
                data-bs-target="#staticBackdrop"
                id="${tarjetas[i].id}"  
                data-tarjeta-id="${tarjetaId}"
                onclick="verificar(this.id)">
                Verificar
                </button>
            </section>
        </article>`

        controlarTiempo(tarjetaId);
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
    console.log(id.slice(-1))
    var correcta = tarjetas[parseInt(id.slice(-1))].tarjeta.respuestaCorrecta;
    console.log(correcta,"corrrecta")
    let respuesta = document.getElementById(id).value;
    console.log(respuesta)
    if(correcta.toUpperCase() == respuesta.toUpperCase()){
        document.getElementById("modal-body").innerHTML = `Felicidades, tu respuesta es correcta!!! \u{1F604}`
        document.getElementById("modal-button").innerHTML = `Continuar`
    }else{
        for( var i = 0; i<tarjetas[parseInt(id.slice(-1))].tarjeta.posiblesRespuestas.length; i++){
            let resposible = tarjetas[parseInt(id.slice(-1))].tarjeta.posiblesRespuestas[i].trim();
            let respuesta = document.getElementById(id).value.trim();
            if(resposible.toUpperCase() == respuesta.toUpperCase()){
                console.log("entro")
                document.getElementById("modal-body").innerHTML = `Casi lo consigues! \u{1F609} <br> La respuesta correcta es "${correcta}"`
                document.getElementById("modal-button").innerHTML = `Continuar`
                break;
            }else{
                var pistas = tarjetas[parseInt(id.slice(-1))].tarjeta.pistas;
                var random = Math.floor(Math.random() * pistas.length);
                document.getElementById("modal-body").innerHTML = `No es la respuesta esperada \u{2639} <br> Aquí tienes una pista "${pistas[random]}"`
                document.getElementById("modal-button").innerHTML = `Aceptar`
            }
        }
        
    }
}
}

function checkAnswer(){
    let button = document.getElementById("modal-button");
    if(button.innerHTML === "Continuar"){
        document.getElementById("next-carousel-button").click();
    }
}

function controlarTiempo(tarjetaId) {
    console.log("entra a la funcion" ,tarjetaId);
    var inputTarjeta = document.getElementById(tarjetaId);
    inputTarjeta.addEventListener("input", function(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function() {
          console.log("Ya han pasado 3 segundos de inactividad");
          mensajeInactividad(tarjetaId);
        }, 3000);
      });
  }  

  function mensajeInactividad(id){
    var pistas = tarjetas[parseInt(id.slice(-1))].tarjeta.pistas;
    var random = Math.floor(Math.random() * pistas.length);
    document.getElementById("modal-body").innerHTML = `No te  addcongeles \u{1F976}! <br> Aquí tienes una pista "${pistas[random]}"`
    document.getElementById("modal-button").innerHTML = `Aceptar`
  }

  setTimeout(function(){
    document.getElementById("modal-body").innerHTML = `No te  addcongeles \u{1F976}! <br> Aquí tienes una pista "PISTA"`
    document.getElementById("modal-button").innerHTML = `Aceptar`
    console.log("Hola Mundo");
}, 10000);

document.addEventListener('DOMContentLoaded', listenToChange);

function listenToChange() {
  var myCarousel = document.getElementById('carouselExample');
  myCarousel.addEventListener('slid.bs.carousel', function() {
    var activeCard = myCarousel.querySelector('.carousel-item.active');
    
    console.log('ID del card actual:', activeCard);
  });
}