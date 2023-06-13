function cargarTarjetas(){
    var elementoPadre = document.getElementById("listaTarjetas")
    var botonEliminar = document.getElementById("comenzar")

    elementoPadre.classList.remove("boton-tarjeta")

    elementoPadre = botonEliminar.parentNode
    elementoPadre.removeChild(botonEliminar)

    console.log("first")
    for(var i = 0; i < tarjetas.length; i++){
        listaTarjetas.innerHTML += `<article class="card-gramar-main carousel-item active">
            <section>
                <section class="card-img-content">
                    <img src=${tarjetas[i].imagen} alt="ice-cream-image" />
            </section>
            </section>

            <section class="card-title-content">
                <label class="card-title-text">${tarjetas[i].descripcion}</label>
            </section>

            <section class="card-write-answer">
                <input id="ice-cream" class="card-input" type="text" placeholder="Escribe tu respuesta">

                <button 
                class="card-button" 
                data-bs-toggle="modal" 
                data-bs-target="#staticBackdrop"  
                onclick="iceCreamCard()">
                Verificar
                </button>
            </section>
        </article>`
    }
    
}