
  const firebaseConfig = {
    apiKey: "AIzaSyCJusAuajt_rqS-M25vBbZ3q_Ai1rYvzQI",
    authDomain: "authoringtool-b1bfb.firebaseapp.com",
    projectId: "authoringtool-b1bfb",
    storageBucket: "authoringtool-b1bfb.appspot.com",
    messagingSenderId: "850183606717",
    appId: "1:850183606717:web:5bede545f33574497642d4"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  var storageRef = firebase.storage().ref();

  var contadorId = 1;

  function añadirTarjeta(){
    cajaTarjetaFormulario.innerHTML += `<div id="formulario-${contadorId}" class="formulario">
    <div class="cajas-input">
            <div>
                <div>Imagen: </div>
            </div>
            <div>
                <input id="imagen${contadorId}" style="margin-left: 8px;" class="form-control" type="file"/>
            </div>
    </div>
    <div class="cajas-input">
        <div>
            <div>Respuesta correcta: </div>
        </div>
        <div>
            <input id="respuesta-${contadorId}" style="margin-left: 8px;" class="form-control" type="text"/>
        </div>
    </div>
    <div>
        <div>Posibles respuestas:</div>
            <div>
                <div class="cajas-input">
                    <div>
                        <div>■</div>
                    </div>
                    <div>
                        <input id="posibleResp-1${contadorId}" style="margin-left: 8px;" class="form-control" type="text"/>
                    </div>
                </div>
                <div class="cajas-input">
                    <div>
                        <div>■</div>
                    </div>
                    <div>
                        <input id="posibleResp-2${contadorId}" style="margin-left: 8px;" class="form-control" type="text"/>
                    </div>
                </div>
                <div class="cajas-input">
                    <div>
                        <div>■</div>
                    </div>
                    <div>
                        <input id="posibleResp-3${contadorId}" style="margin-left: 8px;" class="form-control" type="text"/>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div>Pistas:</div>
            <div>
                <div class="cajas-input">
                    <div>
                        <div>■</div>
                    </div>
                    <div>
                        <input id="pista-1${contadorId}" style="margin-left: 8px;" class="form-control" type="text"/>
                    </div>
                </div>
                <div class="cajas-input">
                    <div>
                        <div>■</div>
                    </div>
                    <div>
                        <input id="pista-2${contadorId}" style="margin-left: 8px;" class="form-control" type="text"/>
                    </div>
                </div>
                <div class="cajas-input">
                    <div>
                        <div>■</div>
                    </div>
                    <div>
                        <input id="pista-3${contadorId}" style="margin-left: 8px;" class="form-control" type="text"/>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    contadorId++;
  }

  async function guardar2(){
    var tituloProyecto=document.getElementById('tituloProyecto').value;
    console.log(tituloProyecto)

var posiblesResp = [document.getElementById('posibleResp-'+i+'.1').value,
                                    document.getElementById('posibleResp-'+i+'.2').value,
                                    document.getElementById('posibleResp-'+i+'.3').value];

                var pistas = [document.getElementById('pista-'+i+'.1').value,
                                    document.getElementById('pista-'+i+'.2').value,
                                    document.getElementById('pista-'+i+'.3').value];

    for(var i = 0; i < contadorId; i++){
        var inputImagen = document.getElementById('imagen'+i)
        await subirImagen(inputImagen)
    }
  }

  async function guardar(){
    var images = []
    console.log(contadorId,"contadorId")
    var tituloProyecto=document.getElementById('tituloProyecto').value;
    console.log(tituloProyecto)
    var cont = 0;
    for(var j = 0; j < contadorId; j++){
        var inputImagen = document.getElementById('imagen'+j)
        var imagenASubir = inputImagen.files[0];
        images.push(imagenASubir)


        var respuestaCorrecta = document.getElementById("respuesta-"+j).value;
                    var pr1 = document.getElementById('posibleResp-1'+j).value
                    var pr2 = document.getElementById('posibleResp-2'+j).value
                    var pr3 = document.getElementById('posibleResp-3'+j).value
    
                    var posiblesResp = [pr1,pr2,pr3]
    
                    var p1 = document.getElementById('pista-1'+j).value
                    var p2 = document.getElementById('pista-2'+j).value
                    var p3 = document.getElementById('pista-3'+j).value
    
                    var pistas = [p1,p2,p3]

                    db.collection("Proyecto").doc(tituloProyecto).collection('Tarjetas').doc("Tarjeta"+j).set({
                        imagen: "downloadURL",
                        respuestaCorrecta: respuestaCorrecta,
                        posiblesRespuestas: posiblesResp,
                        pistas: pistas
                    })
    }



    images.forEach(image => {
        var uploadTask = storageRef.child('Imagenes/'+image.name).put(image);
    // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
            //
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        async() => {
            // Obtenemos el url de la imagen despues de subirlo
            
             await uploadTask.snapshot.ref.getDownloadURL().then(async(downloadURL) => {
                console.log(downloadURL)
                await db.collection("Proyecto").doc(tituloProyecto).collection('Tarjetas').doc("Tarjeta"+cont).update({
                    imagen: downloadURL
                },console.log(cont,"cont",images),
                cont++)
                
            });
            
        }
    );
        
    });
       
    
  }