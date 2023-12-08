// Función para obtener el valor del parámetro "p" de la URL actual
function obtenerValorParametroP() {
    // Obtener la URL actual
    var url = window.location.href;

    // Buscar el índice del parámetro "p" en la URL
    var indiceP = url.indexOf("?p=");

    // Verificar si se encontró el parámetro "p" en la URL
    if (indiceP !== -1) {
        // Obtener el valor del parámetro "p" extrayendo la subcadena después de "?p="
        var valorP = url.substring(indiceP + 3);

        // Devolver el valor como un número (puedes cambiarlo según tus necesidades)
        return parseInt(valorP, 10);
    } else {
        // Si el parámetro "p" no se encuentra en la URL, devolver un valor predeterminado o manejar el caso en consecuencia
        return null;
    }
}
