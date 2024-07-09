let texto = '';
let curso_id = 0;

(async function(){
    const url = new URL(window.location.href);
    const id = url.searchParams.get("leccion");
    if(!id){
        return;
    }

    setEditarFormUpdate();
    leccion = await getLeccioneById(id);
    await setLeccionDatos(leccion);
   /*  getCursoById(id).then((curso) => {
        setCursoDatos(curso);
    }); */

})();

async function setEditarFormUpdate(){
    titulo = document.getElementById('titulo');
    button = document.getElementById('btn-crear') ;
    
    titulo.innerHTML = 'Editar Leccion';
    button.innerHTML = 'Editar';
    
    button.addEventListener('click', async () => {
        updateLeccionButton();
    });
}


async function setLeccionDatos(leccion){
    const titulo = document.getElementById('nombre');
    const link = document.getElementById('linkVideo');
    titulo.value = leccion.titulo;
    tipo = leccion.tipo;
    curso_id = leccion.curso_id;
    console.log(leccion)

    if(tipo){
        console.log(leccion.contenido);
        texto = leccion.contenido;
    }else{
        link.value = leccion.contenido;
    }

    setRadio();
    document.getElementById('btn-cancelar').addEventListener('click', function(e) {
        e.preventDefault(); 
        window.history.back(); 
    });
}

async function getLeccioneById(id) {
    console.log(id);
    try {
        const response = await fetch(`http://localhost:4000/lecciones/${id}`);
        if (!response.ok) {
            return;
        }
        const leccion = await response.json();
        return leccion[0];
    } catch (err) {
        console.error(err);
        console.log('Error al cargar lecciones')
    }
}

function setRadio(){
    const textoRadio = document.getElementById('texto');
    const link = document.getElementById('link');
    const texto = document.getElementById('edit-view');

    if(tipo){
        textoRadio.checked = true;
        link.style.display = 'none';
        texto.style.display = 'flex';
        mostrarEditor();
    }

    
}


async function updateLeccion(leccion){
    const url = new URL(window.location.href);
    const id = url.searchParams.get("leccion");
    console.log("updateeeee", leccion)
    if (!leccion || typeof leccion !== 'object') {
        console.error('Invalid leccion data', leccion);
        return; 
    }
    try {
        const response = await fetch(`http://localhost:4000/lecciones/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leccion)
        });
        
        if (response.ok) {

            window.location.href = `cursoAdmin.html?id=${curso_id}`;
        }
    } catch (err) {
        console.error(err);
        console.log('Error al actualizar leccion')
    }
}


async function updateLeccionButton(){
    console.log('crearLeccion');
    const titulo = document.getElementById('nombre').value;
    const link = document.getElementById('linkVideo').value;
    const validationTitulo = document.querySelector('#validation-titulo');
    const validationContenido = document.querySelector('#validation-contenido');
    let isValid = true;

    let leccion = {}

    if(titulo === ''){
        validationTitulo.innerHTML = 'El titulo no puede estar vacio';
        validationTitulo.style.display = 'block';
        isValid = false;
    }else if(titulo.length < 5){
        validationTitulo.innerHTML = 'El titulo debe tener al menos 5 caracteres';
        validationTitulo.style.display = 'block';
        isValid = false;
    }else if(titulo.length > 77){
        validationTitulo.innerHTML = 'El titulo debe tener menos de 75 caracteres';
        validationTitulo.style.display = 'block';
        isValid = false;
    }else{
        validationTitulo.innerHTML = '';
        validationTitulo.style.display = 'none';
    }


    if(tipo){
        await guardar().then (texto => {

            if(texto.length < 54){
                console.log(texto.length)
                validationContenido.innerHTML = 'El contenido no puede estar vacio';
                validationContenido.style.display = 'block';
                isValid = false;
            }else{
                validationContenido.innerHTML = '';
                validationContenido.style.display = 'none';
            }

            leccion = {
                titulo: titulo,
                contenido: texto,
                tipo: tipo
            }

        });
    }else{
        let linkModificado = ''
        if(link === ''){
            validationContenido.innerHTML = 'El link no puede estar vacio';
            validationContenido.style.display = 'block';
            isValid = false;
        }else{
            console.log(link);
            videoId = getVideoId(link);
            if (!videoId) {
                validationContenido.innerHTML = "La Url ingresada es invalida";
                validationContenido.style.display = 'block';
                isValid = false;
            }else{
                validationContenido.innerHTML = '';
                validationContenido.style.display = 'none';
            }
            linkModificado = `https://www.youtube.com/embed/${videoId}`;
        }


        leccion = {
            titulo: titulo,
            contenido: linkModificado,
            tipo: tipo
        }
        console.log(leccion);
    }

    if (!isValid) {
        return;
    }

    console.log("leccions:",leccion);
    await updateLeccion(leccion);

}