const url = new URL(window.location.href);
(async function () {
    const userInSession = getUserInSession();
    if (userInSession) {
        if (userInSession[0]['is_admin']) {
            const id = url.searchParams.get("id");
            if (!id) {
                window.location.href = 'index.html';
            }else{
                window.location.href = 'cursoAdmin.html?id=' + id;
            }
            return;
        } else {
            setHeaderUser(userInSession);
            setUsuario();
        }
    } else {
        setHeaderVisitante();
    }

    cargarCategorias();
    setLinkBuscador();

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
    console.log(lecciones);
    const bandera = await getCursoInscrito();
    const leccionesContainer = document.querySelector('.course-lessons');
    lecciones.forEach(async leccion => {
        var leccionHtml = '';
        if (bandera) {
            const mis_curso_id = await getMisCursosId(getUserInSession()[0].id, id);
            const visto = await getLeccionVista(leccion.id);
            console.log(visto)
            const tipo = leccion.tipo
            let contenido = '';
            if (tipo) {
                const edjsParser = edjsHTML();
                let htmlData = edjsParser.parse(JSON.parse(leccion.contenido));

                let html = '';

                for (const code of htmlData) {
                    html += code;
                }


                contenido = `
                <div id="${leccion.id}" class="lesson-text">
                    ${html}
                </div>
                `
            } else {
                contenido = `
                <div id="${leccion.id}" class="lesson-video">
                    <iframe width="100%" height="315"
                    src="${leccion.contenido}" frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
                </div>
                `
            }
            if (visto) {
                leccionHtml = `
                <div class="lesson" data-id=${leccion.id} onclick="toggleVideo('${leccion.id}')">
                        <div class="lesson_items">
                            <h4><i class="fas fa-angle-down"></i>${leccion.titulo} </h4>
                            <input id="menu-switch" type="checkbox" disabled checked>
                        </div>
                            ${contenido}

                    </div>
                `;
            } else {
                leccionHtml = `
                <div class="lesson" data-id=${leccion.id} onclick="toggleVideo('${leccion.id}')">
                        <div class="lesson_items">
                            <h4><i class="fas fa-angle-down"></i>${leccion.titulo} </h4>
                            <input id="menu-switch-${leccion.id}" data-id=${mis_curso_id} type="checkbox" disable>
                        </div>
                            ${contenido}
                    </div>
                `;
            }
        } else {
            leccionHtml = `
        <div class="lesson"  >
                <i class="fas fa-angle-down"></i>${leccion.titulo}
                <div id="${leccion.titulo}" class="lesson-video">
                    <iframe width="100%" height="315" src="${leccion.contenido}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        `;
        }
        console.log(leccionHtml);
        leccionesContainer.innerHTML += leccionHtml;
    });
    document.body.style.display = 'block';
}

async function getLeccionVista(leccion_id) {
    const userInSession = getUserInSession();
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    const mis_curso_id = await getMisCursosId(userInSession[0].id, id);
    console.log("id", leccion_id, mis_curso_id)
    try {
        const response = await fetch(`http://localhost:4000/vistos/leccion/${leccion_id}/curso/${mis_curso_id}`);
        const data = await response.json();
        return data.completado;
    } catch (error) {
        console.error(error);
    }
}

async function setUsuario() {
    if (await getCursoInscrito()) {
        const cursoHeader = document.querySelector('#course-final');
        const htmls = `
    <button class="btn" id="botonSuscribir">Retirar</button>
    `;
        cursoHeader.innerHTML += htmls;
    } else {
        const cursoHeader = document.querySelector('#course-final');
        const htmls = `
    <button class="btn" id="botonSuscribir">Inscribirse</button>
    `;
        cursoHeader.innerHTML += htmls;
    }
    document.querySelector('#botonSuscribir').addEventListener('click', function (e) {
        e.preventDefault();
        inscribirse();
    });
}

async function getCursoInscrito() {
    const userInSession = getUserInSession();
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    try {
        const response = await fetch(`http://localhost:4000/miscursos/curso/${id}/usuario/${userInSession[0].id}`);
        const data = await response.json();
        if (data.length > 0) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
    }
}

async function inscribirse() {
    const userInSession = getUserInSession();
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    if (await getCursoInscrito()) {
        try {
            const response = await fetch(`http://localhost:4000/miscursos/${userInSession[0].id}/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        idInt = parseInt(id);
        const data = {
            "usuario_id": userInSession[0].id,
            "curso_id": idInt
        };
        console.log(data)
        try {
            const response = await fetch('http://localhost:4000/miscursos', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                await createMisCursosVisto();
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    }

}


//Consigue id de tabla mis_cursos
async function getMisCursosId(usuario_id, id) {
    try {
        const response = await fetch(`http://localhost:4000/miscursos/curso/${id}/usuario/${usuario_id}/id`);
        const data = await response.json();
        console.log("Mis cursos id :", data.id);
        return data.id;
    } catch (error) {
        console.error(error);
    }
}

async function createMisCursosVisto() {
    const userInSession = getUserInSession();
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    const lecciones = await getLecciones(id);
    const mis_cursos_id = await getMisCursosId(userInSession[0].id, id);

    lecciones.forEach(async leccion => {
        const data = {
            "mis_cursos_id": mis_cursos_id,
            "leccion_id": leccion.id
        };

        try {
            const response = await fetch('http://localhost:4000/vistos', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                console.log('Mis cursos visto creado');
            }
        } catch (error) {
            console.error(error);
        }


    });
}

function toggleVideo(id) {
    if (getUserInSession()) {
        const video = document.getElementById(id);
        if (video.style.display === 'block') {
            video.style.display = 'none';
        } else {
            video.style.display = 'block';
            const input = document.getElementById(`menu-switch-${id}`);
            if (input) {
                if (input.checked) {
                    return;
                }
                const mis_curso_id = input.getAttribute('data-id');
                updateLeccionVista(id, mis_curso_id);
                input.checked = true;
                input.disabled = true;
            }
        }
    }
}

async function updateLeccionVista(leccion_id, mis_curso_id) {
    try {
        const response = await fetch(`http://localhost:4000/vistos/leccion/${leccion_id}/curso/${mis_curso_id}`, {
            method: 'PUT'
        });
        if (response.ok) {
            console.log('Leccion vista actualizada');
        }
    } catch (error) {
        console.error(error);
    }
}


