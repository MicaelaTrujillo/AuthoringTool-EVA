function cargarTarjetas(){
    var active = "active"
    var elementoPadre = document.getElementById("listaTarjetas")
    var botonEliminar = document.getElementById("comenzar")

    elementoPadre.classList.remove("boton-tarjeta")

    elementoPadre = botonEliminar.parentNode
    elementoPadre.removeChild(botonEliminar)

    console.log("first")
    for(var i = 0; i < tarjetas.length; i++){
        listaTarjetas.innerHTML += `<article class="card-gramar-main carousel-item ${active}">
            <section>
                <section class="card-img-content">
                    <img src=${tarjetas[i].tarjeta.imagen} alt="ice-cream-image" />
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
                onclick="verificar(this.id)">
                Verificar
                </button>
            </section>
        </article>`

        active = ""
    }
   
}

function verificar(id){
    console.log(id.slice(-1))
    var correcta = tarjetas[parseInt(id.slice(-1))].tarjeta.respuestaCorrecta;
    console.log(correcta,"corrrecta")
    let respuesta = document.getElementById(id).value;
    if(correcta.toUpperCase() == respuesta.toUpperCase()){
        document.getElementById("modal-body").innerHTML = `Felicidades, tu respuesta es correcta!!!`
        document.getElementById("modal-button").innerHTML = `Continuar`
    }
}

function checkAnswer(){
    let button = document.getElementById("modal-button");
    if(button.innerHTML === "Continuar"){
        document.getElementById("next-carousel-button").click();
    }
}