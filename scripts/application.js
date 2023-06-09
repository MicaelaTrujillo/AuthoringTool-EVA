function iceCreamCard(){
    let answer = "Helado";
    let input = document.getElementById("ice-cream");
    if(input.value === answer){
        //TODO: Aqui en medio de `` se puede agragar codigo HTML y alguna imagen de felicitacion.
        document.getElementById("modal-body").innerHTML = `Felicidades tu respuesta es correcta! : )`
        document.getElementById("modal-button").innerHTML = `Continuar`
        
    }else{
        //TODO: Aqui en medio de `` se puede agragar codigo HTML y alguna imagen de ayuda y se puede aumentar el diccionario de ayudas.
        document.getElementById("modal-body").innerHTML = `El frio y el resfrio se parecen pero la respuesta empieza con H`
    }
}

function popCornCard(){
    let answer = "Pipoca";
    let input = document.getElementById("pop-corn");
    if(input.value === answer){
         //TODO: Aqui en medio de `` se puede agragar codigo HTML y alguna imagen de felicitacion.
        document.getElementById("modal-body").innerHTML = `Felicidades tu respuesta es correcta! : )`
        document.getElementById("modal-button").innerHTML = `Continuar`
        
    }else{
        //TODO: Aqui en medio de `` se puede agragar codigo HTML y alguna imagen de ayuda y se puede aumentar el diccionario de ayudas.
        document.getElementById("modal-body").innerHTML = `Siempre me gusta pedir la mas grande cuando voy al cine : )`
    }
}

function checkAnswer(){
    let button = document.getElementById("modal-button");
    console.log(button.innerHTML," el valuesss")
    if(button.innerHTML === "Continuar"){
        document.getElementById("next-carousel-button").click();
    }
} 