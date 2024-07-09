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

    cargarCategorias();
    setLinkBuscador();


    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    await cargarCurso(id);
})();

async function cargarCurso(id) {
    const curso = await getCursoById(id);
    const cursosContainer = document.querySelector('.course-header');
    const img = cursosContainer.querySelector('img');
    const titulo = cursosContainer.querySelector('.course-title');
    const descripcion = cursosContainer.querySelector('.course-description');
    const autor = cursosContainer.querySelector('.course-author');
    titulo.innerHTML = curso[0].titulo;
    descripcion.innerHTML = curso[0].descripcion;
    autor.innerHTML = `Autor: ${curso[0].autor}`;
    img.src = curso[0].imagen_path;
    document.body.style.display = 'block';
    cargarLecciones(id);
}

async function getLecciones(id) {
    console.log(id);
    try {
        const response = await fetch(`http://localhost:4000/lecciones/curso/${id}`);
        if (!response.ok) {
            return;
        }
        const lecciones = await response.json();
        return lecciones;
    } catch (err) {
        console.error(err);
        console.log('Error al cargar lecciones')
    }
}

async function cargarLecciones(id) {
    const lecciones = await getLecciones(id);
    const leccionesContainer = document.querySelector('.course-lessons');
    let index = 0;
    leccionesContainer.innerHTML = '';
    lecciones.forEach(async leccion => {
        console.log("index:");
        let flechas;

        if (index === 0) {
            flechas = `<i class="fas fa-angle-down" data-id=${leccion.id}></i>`;
        } else if (index === lecciones.length - 1) {
            flechas = `<i class="fas fa-angle-up" data-id=${leccion.id}></i>`;
        } else {
            flechas = `<i class="fas fa-angle-up" data-id=${leccion.id}></i><i class="fas fa-angle-down" data-id=${leccion.id}></i>`;
        }

        index +=1;


        const leccionHtml = `
        <div class="lesson">
                <div class="lesson_items">
                    <h4>${flechas}${leccion.titulo}</h4>
                    <div class="lessons_btn">
                        <button class="btn editar-btn" data-id=${leccion.id}>Editar</button>
                        <button class="btn eliminar-btn" data-id=${leccion.id}>Eliminar</button>
                    </div>
                </div>
            </div>
        `;
        leccionesContainer.innerHTML += leccionHtml;
    });

    document.querySelector('#btn-anadir').addEventListener('click', () => {
        window.location.href = `crearLeccion.html?id=${id}`;
    });

    document.querySelectorAll('.editar-btn').forEach(button => {
        button.addEventListener('click', editarLeccion);
    });

    document.querySelectorAll('.eliminar-btn').forEach(button => {
        button.addEventListener('click', eliminarLeccion);
    });

    document.body.style.display = 'block';
    setMover();
}

function editarLeccion(e) {
    const id = e.target.dataset.id;
    window.location.href = `crearLeccion.html?leccion=${id}`;
}

async function eliminarLeccion(e) {
    const id = e.target.dataset.id;
    try {
        const response = await fetch(`http://localhost:4000/lecciones/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            return;
        }
        window.location.reload();
    } catch (error) {
        console.error(error);
    }
}


async function setMover() {
    const abajo = document.querySelectorAll('.fa-angle-down');
    abajo.forEach(search => {
        search.addEventListener('click', function (e) {
            e.preventDefault();
            moverAbajo(search);
        });
    });
    
    const arriba = document.querySelectorAll('.fa-angle-up');
    arriba.forEach(search => {
        search.addEventListener('click', function (e) {
            e.preventDefault();
            moverArriba(search);
        });
    });
}

async function moverAbajo(search){
    const id = search.dataset.id;
    try{
        const response = await fetch(`http://localhost:4000/lecciones/down/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok){
            return;
        }
        url = new URL(window.location.href);
        curso_id = url.searchParams.get("id");
        cargarLecciones(curso_id);
    }
    catch(error){
        console.error(error);
    }
}

async function moverArriba(search){
    const id = search.dataset.id;
    try{
        const response = await fetch(`http://localhost:4000/lecciones/up/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok){
            return;
        }
        url = new URL(window.location.href);
        curso_id = url.searchParams.get("id");
        cargarLecciones(curso_id);
    }
    catch(error){
        console.error(error);
    }
}
