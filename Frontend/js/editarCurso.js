(async function(){
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if(!id){
        return;
    }

    setEditarForm();
    getCursoById(id).then((curso) => {
        setCursoDatos(curso);
    });

})();

async function setEditarForm(){
    titulo = document.getElementById('tituloCurso');
    button = document.getElementById('botonCrear') ;
    
    titulo.innerHTML = 'Editar Curso';
    button.innerHTML = 'Editar';
    
}

async function setCursoDatos(curso){
    const titulo = document.getElementById('titulo');
    const descripcion = document.getElementById('descripcion');
    const autor = document.getElementById('autor');
    let imagen = document.getElementById('imagen');

    titulo.value = curso[0].titulo;
    descripcion.value = curso[0].descripcion;
    autor.value = curso[0].autor;
}