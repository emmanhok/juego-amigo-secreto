let listaAmigos = []; // arreglo para almacenar los amigos que agregara el usuario
let listaAmigosSorteados = []; // arreglo para almacenar los amigos sorteados
let totalAmigos = 0; // variable para llevar conteo de los amigos agregados y asi finalizar cuando salgan todos sorteados

function agregarAmigo() {
    let amigo = document.getElementById('amigo'); // Se obtiene a traves del input 'amigo' el texto agregado por el usuario
    let amigoAgregado = amigo.value; // Se asigna el valor ingresado por el usuario a la variable amigoAgregado
    // Si el usuario ingresa un String que contiene numeros o caracteres especiales se genera un alerta de error
    if (typeof amigoAgregado !== 'string' || !/^[a-zA-Z]+$/.test(amigoAgregado)) {
        alert("Error: no ha ingreado un nombre válido");
        resetearCaja(); // Funcion para resetear caja 'amigo'
        return;
    }
    else{
        listaAmigos.push(amigoAgregado.toUpperCase()); // Si ingresa un nombre valido se agrega al arreglo declarado al inicio del código
        resetearCaja(); // Se resetea la caja para ingresar amigos para siga el mensaje "Escribe un nombre"
        totalAmigos += 1; // Contador del total de amigos que se van agregando sumandose 1 a 1
        document.getElementById('sortear').removeAttribute('disabled'); // Se habilita el boton Sortear que no lo estaba hasta agregar al menos un amigo/a
        //resetearCaja(); // Funcion para resetear caja 'amigo'
        mostrarListaAmigos(); // Se llama a la funcion para ir mostrando en una lista(<li>) los amigos que va agregando el usuario
        return;
        }
}

function mostrarListaAmigos() {
    let impresionListaAmigos = document.getElementById("listaAmigos"); // Se almacena en una variable una referencia al elemento HTML con el id "listaAmigos"
    impresionListaAmigos.innerHTML = ""; // Se limpia el contenido de listaAmigos para que no hayan duplicados en la lista
    for (let i = 0; i < listaAmigos.length; i++) {
        let listadoAmigos = document.createElement("li"); // Se crea una etiqueta li para cada amigo que se va agregando
        listadoAmigos.textContent = listaAmigos[i]; // Se asigna el valor [i] del arreglo listaAmigos como el texto del elemento <li> creado para cada amigo/a
        impresionListaAmigos.appendChild(listadoAmigos); // Se muestra en cada elemento <li> dentro del elemento <ul> "listaAmigos"
    }
    return;
}

function sortearAmigo(){
    let amigoAleatorio = Math.floor(Math.random() * listaAmigos.length); // Se toma de forma aleatoria un amigo de la lista
    document.getElementById('agregar').setAttribute('disabled', 'true'); // Se deshabilita el boton agregar amigos porque ya se dió click a sortear
    document.getElementById('amigo').setAttribute('disabled', 'true'); // Se deshabilita la caja para agregar amigos porque ya se dió click a sortear
    blanquearCajaAmigos(); // Se deja en blanco la caja de Agregar amigos porque ya fueron sorteados todos los que se agregaron
    // A continuación, se verifica que si el total de amigos que fueron sorteados es igual a la longitud de la lista de Amigos Sorteados
    // Se muestra en la pagina web que ya se sortearon todos los amigos/as y finaliza el juego
    if(listaAmigosSorteados.length == totalAmigos){
        document.getElementById("listaAmigos").innerHTML = "Ya se sortearon todos los amigos/as";
    }else{
        if(listaAmigosSorteados.includes(amigoAleatorio)){ // Si el amigo ya fue sorteado no se volverá a sortear y vuelve a generar otro amigoAleatorio
            return sortearAmigo();
        }
        else{
            // Se agrega el amigo sorteado a la lista listaAmigosSorteados que sirve para ir verificando que no se repitan en un nuevo sorteo
            listaAmigosSorteados.push(amigoAleatorio);
            // La siguiente variable obtendrá al amigo sorteado para luego imprimirlo en en la pantalla del navegador
            let amigoSorteado = listaAmigos[amigoAleatorio];
            // A continuación, se muestra el amigo/a sorteado/a
            document.getElementById("listaAmigos").innerHTML = "El amigo/a sorteado/a es: <br>" + amigoSorteado;
            return amigoAleatorio;
        }
    }
    return;
}

function resetearCaja() {
    document.querySelector('#amigo').value = document.getElementById('#amigo'); // Se mantiene el texto de la caja input en la que se agregan amigos
    return;
}

function blanquearCajaAmigos() {
    document.querySelector('#amigo').value = " "; // Se borra el texto de la caja en la que se agregaban amigos
    return;
}