
function enviarDatos(nombre, email, interes) {
    fetch('https://proyecto02-26a96-default-rtdb.firebaseio.com/usuarios.json', {
        method: 'POST',
        body: JSON.stringify({
            nombre: nombre,
            email: email,
            interes: interes
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Hubo un problema al enviar los datos.');
        }
        return response.json();
    })
    .then(data => {
        alert('Datos enviados con éxito a Firebase.');
        console.log('Datos enviados correctamente a Firebase:', data);

        // Después de enviar los datos exitosamente, actualizar automáticamente la tabla
        mostrarUsuarios();
    })
    .catch(error => {
        console.error('Error al enviar los datos a Firebase:', error);
        alert('Hubo un error al enviar los datos. Por favor, intenta de nuevo más tarde.');
    });
}

function mostrarUsuarios() {
    fetch('https://proyecto02-26a96-default-rtdb.firebaseio.com/usuarios.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los datos.');
            }
            return response.json();
        })
        .then(data => {
            // Limpiar tabla antes de agregar nuevas filas
            const tablaUsuarios = document.getElementById('tablaUsuarios');
            tablaUsuarios.innerHTML = '';

            // Iterar sobre los datos y agregar filas a la tabla
            Object.keys(data).forEach(key => {
                const usuario = data[key];
                const fila = `<tr>
                                <td>${usuario.nombre}</td>
                                <td>${usuario.email}</td>
                                <td>${usuario.interes}</td>
                              </tr>`;
                tablaUsuarios.innerHTML += fila;
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos desde Firebase:', error);
            alert('Hubo un error al obtener los datos desde Firebase.');
        });
}
