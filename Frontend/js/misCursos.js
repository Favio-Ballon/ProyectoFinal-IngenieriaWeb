(async function(){
    const userInSession = getUserInSession();
    if(!userInSession){
        window.location.href = 'inicio.html';
        return;
    }else{
        if (userInSession[0]['is_admin']) {
            window.location.href = 'index.html';
            return;
        } else {
            setHeaderUser(userInSession);
        }
    }

    cargarCategorias();
    setLinkBuscador();
    await setMisCursos();
    document.body.style.display = 'block';
})();



async function getMisCursos(usuario_id){
    try{
        const response = await fetch(`http://localhost:4000/miscursos/usuario/${usuario_id}`);
        const data = await response.json();
        return data;
    }catch(error){
        console.error(error);
    }
}

async function setMisCursos(){
    const userInSession = getUserInSession();
    const usuario_id = userInSession[0].id; 
    const cursos = await getMisCursos(usuario_id);
    const cursosContainer = document.querySelector('.cursos');
    const cursosHTML = []; // Array para almacenar

    if(cursos.length === 0){
        cursosContainer.innerHTML = '<h2>No tienes cursos</h2>';
        return
    }

    // Iterar sobre los cursos
    for (const curso of cursos) {
        const porcentaje = await getPorcentaje(curso.id);
        const cursoBus = `
          <div class="cursos_item" data-id="${curso.id}">
            <div>
                <img src="${curso.imagen_path}" alt="imagencurso">
            </div>
            <div>
                <h3>${curso.titulo}</h3>
                <p>${curso.descripcion}</p>
                <p>Autor: ${curso.autor}</p>
                <div class="progress-container"><div class="progress-bar" style="width: ${porcentaje}%"></div></div>
            </div>
          </div>
        `;
        cursosHTML.push(cursoBus); // Agregar html al array
    }

    // Actualizar el HTML
    cursosContainer.innerHTML = cursosHTML.join('');

    // set istener a los cursos
    setCursoListener();
}


async function getPorcentaje(id){
    const total = await getTotalLecciones(id);
    const completadas = await getLeccionesCompletadas(id);

    if(total === 0 || completadas === 0){
        return 0;
    }

    const porcentaje = (completadas / total) * 100;
    console.log(`porcentaje del curso ${id}: `, porcentaje);
    return porcentaje;

}

async function getTotalLecciones(id){
    try{
        const response = await fetch(`http://localhost:4000/lecciones/curso/${id}`);
        const data = await response.json();
        console.log(`lecciones del curso ${id}: `,data.length)
        return data.length;
    }catch(error){
        console.error(error);
    }
}

async function getLeccionesCompletadas(id){
    try{
        const userInSession = getUserInSession();
        const usuario_id = userInSession[0].id;
        const response = await fetch(`http://localhost:4000/vistos/curso/${id}/usuario/${usuario_id}`);
        const data = await response.json();
        console.log(data)
        console.log(`lecciones completadas del curso ${id}: `,data.completed_lessons)
        return data.completed_lessons;
    }catch(error){
        console.error(error);
    }
}


async function getMisCursosId(usuario_id, id) {
    try {
        const response = await fetch(`http://localhost:4000/miscursos/curso/${id}/usuario/${usuario_id}/id`);
        const data = await response.json();
        console.log("Mis cursos id :",data.id);
        return data.id;
    } catch (error) {
        console.error(error);
    }
}

function setCursoListener(){
    const cursos = document.querySelectorAll('.cursos_item');
    cursos.forEach(curso => {
        curso.addEventListener('click', function(e){
            e.preventDefault();
            const id = curso.dataset.id;
            window.location.href = `curso.html?id=${id}`;
        });
    });
}

