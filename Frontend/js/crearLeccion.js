let tipo = false;
const url = new URL(window.location.href);
const id = url.searchParams.get("id");


(async function(){
    const userInSession = getUserInSession();
    if (userInSession) {
        if (userInSession[0]['is_admin']) {
            console.log(userInSession);
            setHeaderAdmin(userInSession);
            console.log('admin');
        } else {
            window.location.href = 'index.html';
            return;
        }
    } else {
        window.location.href = 'index.html';
        return;
    }


    setTipoLeccion();

    
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if(!id){
        return;
    }

    setEditarFormCrear();

})();

async function setEditarFormCrear(){
    button = document.getElementById('btn-crear') ;
    
    button.addEventListener('click', async () => {
        crearLeccion();
    });
}

async function crearLeccion(){
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
    }else if(titulo.length > 100){
        validationTitulo.innerHTML = 'El titulo debe tener menos de 30 caracteres';
        validationTitulo.style.display = 'block';
        isValid = false;
    }else{
        validationTitulo.innerHTML = '';
        validationTitulo.style.display = 'none';
    }


    if(tipo){
        guardar().then (texto => {

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
                curso_id: parseInt(id),
                tipo: tipo
            }

            createLeccion(leccion);
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
            curso_id: parseInt(id),
            tipo: tipo
        }
        console.log(leccion);
    }

    if (!isValid) {
        return;
    }

    console.log("leccions:",leccion);
    await createLeccion(leccion);

}

function setTipoLeccion(){
    const videoRadio = document.getElementById('video');
    const textoRadio = document.getElementById('texto');

    videoRadio.addEventListener('change', toggleContenido);
    textoRadio.addEventListener('change', toggleContenido);
}

function toggleContenido() {
    const videoRadio = document.getElementById('video');
    const link = document.getElementById('link');
    const texto = document.getElementById('edit-view');
    const validationContenido = document.querySelector('#validation-contenido');

    if (videoRadio.checked) {
        link.style.display = 'flex';
        texto.style.display = 'none';
        tipo = false;
    } else {
        link.style.display = 'none';
        texto.style.display = 'flex';
        validationContenido.style.display = 'none';
        tipo = true;
        mostrarEditor();
    }
}

async function createLeccion(leccion){
    try {
        const response = await fetch('http://localhost:4000/lecciones', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leccion)
        });
        if (response.ok) {
            window.location.href = `cursoAdmin.html?id=${id}`;
        }
    } catch (err) {
        console.error(err);
        console.log('Error al crear leccion')
    }
}

function getVideoId(url) {
    var videoid = url.match(/(?:https?:\/\/)?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)\/(?:watch\?v=|embed\/|)([^\s&]+)/);
    console.log(JSON.stringify(videoid));
    if (videoid != null)
        return videoid[1];
    return null;
}
