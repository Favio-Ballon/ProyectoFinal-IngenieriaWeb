(async function () {
    const userInSession = getUserInSession();
    if (userInSession) {
        if (userInSession[0]['is_admin']) {
            setHeaderAdmin(userInSession);
        } else {
            window.location.href = 'index.html';
            return;
        }
    } else {
        window.location.href = 'index.html';
        return;
    }
})();



async function createCurso() {

    //get id from param
    url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    //get datos del form
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const autor = document.getElementById('autor').value;
    const imagenInput = document.getElementById('imagen'); 
    const imagen = imagenInput.files[0]; 

    if (!id) {
        console.log('createCurso')
        //validamos datos
        if (validarDatos(titulo, descripcion, autor, imagen)) {
            //upload image
            const path = await uploadImage(imagen);
            if (path) {
                userInSession = getUserInSession();
                imagen_path = `http://localhost:4000/src/uploads/${path}`
                console.log(imagen_path)
                //create curso
                const curso = {
                    titulo,
                    descripcion,
                    autor,
                    admin_id: userInSession[0].id,
                    imagen_path
                };
                console.log(curso);
                const response = await createCursoDB(curso);
                console.log(response);
                if (response) {
                    window.history.back();
                }
            }

        }
    } else {
        if (!imagen) {
            //update si no se cambio imagen
            if (validarDatosSinImagen(titulo, descripcion, autor)) {
                //update curso
                const curso = {
                    titulo,
                    descripcion,
                    autor
                };
                console.log(curso);
                const response = await updateCurso(curso, id);
                console.log(response);
                if (response) {
                    //Se vuelve a la pagina anterior
                    volver();
                }


            }
        }
        else {
            //update si se cambio imagen
            if (validarDatos(titulo, descripcion, autor, imagen)) {
                const path = await uploadImage(imagen);
                if (path) {
                    imagen_path = `http://localhost:4000/src/uploads/${path}`
                    console.log(imagen_path)
                    const curso = {
                        titulo,
                        descripcion,
                        autor,
                        imagen_path
                    };
                    console.log(curso);
                    const response = await updateCurso(curso, id);
                    console.log(response);
                    if (response) {
                        window.history.back();
                    }
                }
            }
        }

    }
}

async function createCursoDB(curso) {
    try {
        const response = await fetch('http://localhost:4000/cursos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(curso)
        });

        if (response.ok) {
            const result = response;
            console.log(result);
            return result;
        } else {
            console.error('Error creating curso:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error creating curso:', error);
        return null;
    }
}

async function uploadImage(imagen) {
    const formData = new FormData();
    formData.append('image', imagen);

    try {
        const response = await fetch('http://localhost:4000/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json(); 
            console.log(result);
            return result; 
        } else {
            console.error('Error uploading image:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}


function validarDatos(titulo, descripcion, autor, imagen) {
    const validationTitulo = document.querySelector('#validation-titulo');
    const validationDescripcion = document.querySelector('#validation-descripcion');
    const validationAutor = document.querySelector('#validation-autor');
    const validationImagen = document.querySelector('#validation-imagen');

    let isValid = true;

    if (titulo === '') {
        validationTitulo.innerHTML = 'El campo de titulo es requerido';
        isValid = false;
        validationTitulo.style.display = 'block';
    } else if (titulo.length < 5) {
        validationTitulo.innerHTML = 'El campo de titulo debe tener al menos 5 caracteres';
        isValid = false;
        validationTitulo.style.display = 'block';
    } else if (titulo.length > 50) {
        validationTitulo.innerHTML = 'El campo de titulo debe tener máximo 50 caracteres';
        isValid = false;
        validationTitulo.style.display = 'block';
    }
    else {
        validationTitulo.style.display = 'none';
    }

    if (descripcion === '') {
        validationDescripcion.innerHTML = 'El campo de descripcion es requerido';
        isValid = false;
        validationDescripcion.style.display = 'block';
    } else if (descripcion.length < 10) {
        validationDescripcion.innerHTML = 'El campo de descripcion debe tener al menos 10 caracteres';
        isValid = false;
        validationDescripcion.style.display = 'block';
    } else if (descripcion.length > 255) {
        validationDescripcion.innerHTML = 'El campo de descripcion debe tener máximo 200 caracteres';
        isValid = false;
        validationDescripcion.style.display = 'block';
    }
    else {
        validationDescripcion.style.display = 'none';
    }

    if (autor === '') {
        validationAutor.innerHTML = 'El campo de autor es requerido';
        isValid = false;
        validationAutor.style.display = 'block';
    } else if (autor.length < 5) {
        validationAutor.innerHTML = 'El campo de autor debe tener al menos 5 caracteres';
        isValid = false;
        validationAutor.style.display = 'block';
    } else if (autor.length > 50) {
        validationAutor.innerHTML = 'El campo de autor debe tener máximo 50 caracteres';
        isValid = false;
        validationAutor.style.display = 'block';
    }
    else {
        validationAutor.style.display = 'none';
    }

    if (!imagen) {
        validationImagen.innerHTML = 'La imagen es requerida';
        isValid = false;
        validationImagen.style.display = 'block';
    } else {
        validationImagen.style.display = 'none';
    }

    return isValid;
}

function validarDatosSinImagen(titulo, descripcion, autor) {
    const validationTitulo = document.querySelector('#validation-titulo');
    const validationDescripcion = document.querySelector('#validation-descripcion');
    const validationAutor = document.querySelector('#validation-autor');

    let isValid = true;

    if (titulo === '') {
        validationTitulo.innerHTML = 'El campo de titulo es requerido';
        isValid = false;
        validationTitulo.style.display = 'block';
    } else if (titulo.length < 5) {
        validationTitulo.innerHTML = 'El campo de titulo debe tener al menos 5 caracteres';
        isValid = false;
        validationTitulo.style.display = 'block';
    } else if (titulo.length > 50) {
        validationTitulo.innerHTML = 'El campo de titulo debe tener máximo 50 caracteres';
        isValid = false;
        validationTitulo.style.display = 'block';
    }
    else {
        validationTitulo.style.display = 'none';
    }

    if (descripcion === '') {
        validationDescripcion.innerHTML = 'El campo de descripcion es requerido';
        isValid = false;
        validationDescripcion.style.display = 'block';
    } else if (descripcion.length < 10) {
        validationDescripcion.innerHTML = 'El campo de descripcion debe tener al menos 10 caracteres';
        isValid = false;
        validationDescripcion.style.display = 'block';
    } else if (descripcion.length > 255) {
        validationDescripcion.innerHTML = 'El campo de descripcion debe tener máximo 200 caracteres';
        isValid = false;
        validationDescripcion.style.display = 'block';
    }
    else {
        validationDescripcion.style.display = 'none';
    }

    if (autor === '') {
        validationAutor.innerHTML = 'El campo de autor es requerido';
        isValid = false;
        validationAutor.style.display = 'block';
    } else if (autor.length < 5) {
        validationAutor.innerHTML = 'El campo de autor debe tener al menos 5 caracteres';
        isValid = false;
        validationAutor.style.display = 'block';
    } else if (autor.length > 50) {
        validationAutor.innerHTML = 'El campo de autor debe tener máximo 50 caracteres';
        isValid = false;
        validationAutor.style.display = 'block';
    }
    else {
        validationAutor.style.display = 'none';
    }

    return isValid;
}

async function updateCurso(curso, id) {
    try {
        const response = await fetch(`http://localhost:4000/cursos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(curso)
        });

        if (response.ok) {
            const result = response;
            console.log(result);
            return result;
        } else {
            console.error('Error updating curso:', response.statusText);
            return null;
        }
    } catch {
        console.error('Error updating curso:', error);
        return null;
    }
}

