
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
    let newCard = document.createElement("div");
    newCard.innerHTML =  `
    <div id="formulario-${contadorId}" class="formulario">
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
    <div class="cajas-input">
                        <div>
                            <div>Descripción: </div>
                        </div>
                        <div>
                            <input id="descripcion-${contadorId}" style="margin-left: 8px;" class="form-control" type="text"/>
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

    let mainContainer = document.getElementById("cajaTarjetaFormulario");
    mainContainer.appendChild(newCard);
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
        var descripcion=document.getElementById("descripcion-"+j).value;
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
                        descripcion:descripcion,
                        posiblesRespuestas: posiblesResp,
                        pistas: pistas
                    })
    }



    images.forEach(image => {
        let progressBarContainer = document.getElementById("progress-bar-container");
        console.log(progressBarContainer);
        progressBarContainer.innerHTML = `
            <progress id="progressBar" class="w-75" value="0" max="${images.length}"></progress>
            <p id="progressMessage">Progress: 0%</p>
        `;

        let progressBar = document.getElementById('progressBar');
        let progressMessage = document.getElementById('progressMessage');
        let counter = 0;

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
                
                counter = counter + 1;
                progressBar.value = counter;
                progressMessage.innerHTML = `Progress: ${(counter) / images.length * 100}%`;
            });
            document.getElementById("scorm").disabled = false;
            document.getElementById("ver").disabled = false;
        }
    );
        
    });
  }

/*
  document.querySelector("#guardar").addEventListener("click", async ()=>{
    
    //descargar(generarArchivo(),'tarjetas.js')
    let nombreProyecto = document.getElementById('tituloProyecto').value;
    let referencia;
    try {
      referencia = await window.showSaveFilePicker(
        {suggestedName: 'tarjetas.js' ,  types: [ { description: "Formato", accept: { "text/plain": [".html",".js",".css"], } }, 
      ]});
    } catch(err) {
      console.log("Se ha producido un error o se ha cancelado el proceso. " + err);
      return;
    }  	
    let na= "const firebaseConfig = {\n"+ "apiKey: 'AIzaSyCJusAuajt_rqS-M25vBbZ3q_Ai1rYvzQI',\n"+
    "authDomain: 'authoringtool-b1bfb.firebaseapp.com',\n"+" projectId: 'authoringtool-b1bfb', \n"+
    " storageBucket: 'authoringtool-b1bfb.appspot.com',\n"+"  messagingSenderId: '850183606717',\n"+
        " appId: '1:850183606717:web:5bede545f33574497642d4'\n"+"};\n\n"+"firebase.initializeApp(firebaseConfig);\n"+
        "const db = firebase.firestore();\n\n"+"const nombreProyecto='"+nombreProyecto+"';\n"+"let tarjetas=[];\n"+
        "db.collection('Proyecto').doc(nombreProyecto).collection('Tarjetas').get().then( querySnapshot =>{\n"+
        "querySnapshot.forEach((doc) => {\n"+" tarjetas.push({tarjeta:doc.data(),id:doc.id},\n"+")\n"+"})\n"+"})\n";
        try {
        // obtenemos el contenido
        const contenido = na;
        // guardamos el archivo
        const archivo = await referencia.createWritable();				 
        await archivo.write(contenido);
        await archivo.close();				
        } catch(err) {
        alert("Error al guardar el archivo. " + err);
        } 
        //window.location.href=`index.html?id=${nombreProyecto}`;
   });*/

   function ver(){
    let nombreProyecto = document.getElementById('tituloProyecto').value;
    window.location.href=`index.html?id=${nombreProyecto}`;
   }

    async function generarZip(){
        var nombreProyecto=document.getElementById('tituloProyecto').value;
        let ruta = "./scripts";
        let na= "const firebaseConfig = {\n"+ "apiKey: 'AIzaSyCJusAuajt_rqS-M25vBbZ3q_Ai1rYvzQI',\n"+
        "authDomain: 'authoringtool-b1bfb.firebaseapp.com',\n"+" projectId: 'authoringtool-b1bfb', \n"+
        " storageBucket: 'authoringtool-b1bfb.appspot.com',\n"+"  messagingSenderId: '850183606717',\n"+
            " appId: '1:850183606717:web:5bede545f33574497642d4'\n"+"};\n\n"+"firebase.initializeApp(firebaseConfig);\n"+
            "const db = firebase.firestore();\n\n"+"const nombreProyecto='"+nombreProyecto+"';\n"+"let tarjetas=[];\n"+
            "db.collection('Proyecto').doc(nombreProyecto).collection('Tarjetas').get().then( querySnapshot =>{\n"+
            "querySnapshot.forEach((doc) => {\n"+" tarjetas.push({tarjeta:doc.data(),id:doc.id},\n"+")\n"+"})\n"+"})\n";

        var zip = new JSZip();
        zip.file("tarjetas.js",na);
        //Content = zip.generate();
        await añadirArchivosZip("../bootstrap.bundle.js",zip,"bootstrap.bundle.js")
        await añadirArchivosZip("../bootstrap.css",zip,"bootstrap.css")
        await añadirArchivosZip("../cssIndex.css",zip,"cssIndex.css")
        await añadirArchivosZip("../imsmanifest.xml",zip,"imsmanifest.xml")
        await añadirArchivosZip("../index.html",zip,"index.html")
        await añadirArchivosZip("../index.js",zip,"index.js")
        await añadirArchivosZip("../SCORM_API_wrapper.js",zip,"SCORM_API_wrapper.js")
        await añadirArchivosZip("../scorm.js",zip,"scorm.js")
        zip.generateAsync({type:"blob"}).then(function(contenido) {
                saveAs(contenido, nombreProyecto+".zip");
            });
        //location.href="data:application/zip;base64," + content;
    }


    function añadirArchivosZip(filePath,zip,fileName){
        return new Promise(function(resolve,reject){
            var xhr = new XMLHttpRequest();
            xhr.open("GET", filePath,true);
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        var fileContent = xhr.responseText;
                        zip.file(fileName, fileContent);
                        console.log("Adiciono el archivo");
                        resolve();
                    }else{
                        console.log("Error al obtener el archivo");
                        reject();
                    }
                }
            }
            xhr.send();
        })
    }




//extas


    function generarArchivo(){
        let nombreProyecto = document.getElementById('tituloProyecto').value;
        var texto = [];
        texto.push("const firebaseConfig = {\n")
        texto.push("apiKey: 'AIzaSyCJusAuajt_rqS-M25vBbZ3q_Ai1rYvzQI',\n")
        texto.push("authDomain: 'authoringtool-b1bfb.firebaseapp.com',\n")
        texto.push(" projectId: 'authoringtool-b1bfb', \n")
        texto.push(" storageBucket: 'authoringtool-b1bfb.appspot.com',\n")
        texto.push("  messagingSenderId: '850183606717',\n")
        texto.push(" appId: '1:850183606717:web:5bede545f33574497642d4'\n")
        texto.push("};\n\n")
        texto.push("firebase.initializeApp(firebaseConfig);\n")
        texto.push( "const db = firebase.firestore();\n\n")
        texto.push("const nombreProyecto='"+nombreProyecto+"';\n")
        texto.push("let tarjetas=[];\n")
        texto.push("db.collection('Proyecto').doc(nombreProyecto).collection('Tarjetas').get().then( querySnapshot =>{\n")
        texto.push( "querySnapshot.forEach((doc) => {\n")
        texto.push(" tarjetas.push({tarjeta:doc.data(),id:doc.id},\n")
        texto.push(")\n")
        texto.push("})\n")
        texto.push("})\n")
    
        return new Blob(texto, {
            type: 'text/plain'
        });
      }
    
    
      function descargar(texto, nombre){
        var reader = new FileReader();
        reader.onload = function (event) {
            var save = document.createElement('a');
            save.href = event.target.result;
            save.target = '_blank';
            save.download = nombre || 'tarjetas.js';
            var clicEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
            });
            save.dispatchEvent(clicEvent);
            (window.URL || window.webkitURL).revokeObjectURL(save.href);
        };
        reader.readAsDataURL(texto);
      }