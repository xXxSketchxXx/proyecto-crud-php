function obtenerValorParametroP() {
    // Obtener la URL actual
    var url = window.location.href;

    // Buscar el índice del parámetro "p"
    var indiceP = url.indexOf("?p=");

    // Verificar si se encontró el parámetro "p"
    if (indiceP !== -1) {
        // Obtener el valor del parámetro "p"
        var valorP = url.substring(indiceP + 3);

        // Devolver el valor como un número (puedes cambiarlo según tus necesidades)
        return parseInt(valorP, 10);
    } else {
        // Devolver un valor predeterminado o manejar el caso en el que no se encuentre el parámetro "p"
        return null;
    }
}