function InAPP(versionCliente) {
    var Download = document.getElementById('appActualizacion');

    var versionNecesaria = '17/9/24';
    if(versionCliente == '' || versionCliente == null) {
        location.reload();
    } else {
        // Verificar si el elemento existe y si la versión del cliente es correcta
        if (versionCliente === versionNecesaria) {
        console.log('Versión correcta');
        } else {
        console.error('Versión incorrecta');
        // Evitar el scroll
        document.body.style.overflow = 'hidden';
        // Mostrar el div de actualización
        Download.style.display = 'flex';
        }
    }
}