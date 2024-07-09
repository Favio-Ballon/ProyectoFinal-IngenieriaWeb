(async function () {
    const userInSession = getUserInSession();
    var admin = false;
    if (userInSession) {
        if (userInSession[0]['is_admin']) {
            setHeaderAdmin(userInSession);
            admin = true;

        } else {
            setHeaderUser(userInSession);
        }
    } else {
        setHeaderVisitante();
    }
    await cargarCategorias();
    const url = new URL(window.location.href);
    const buscado = url.searchParams.get("search");
    await cargarCursos(buscado);
    setLinkBuscador();
    if (admin) {
        setCursosAdmin();
        setCursoListenerAdmin();
    } else {
        setCursoListener();
    }
    document.body.style.display = 'block';
})();

async function cargarCursos(buscado) {
    const cursosContainer = document.querySelector('.cursos');
    const titulo = cursosContainer.querySelector('h2');
    const buscador = document.querySelector('.search-bar input');
    console.log(buscado);
    let cursos = null;
    if (!buscado) {

        const url = new URL(window.location.href);
        const categoria_id = url.searchParams.get("id");

        if (categoria_id) {
            cursos = await getCursosByCategoria(categoria_id);
            titulo.innerHTML = `Categoria "${categoriaList[categoria_id]}"`;
        } else {
            cursos = await getCursos();
            titulo.innerHTML = `Cursos`;
        }
    } else {
        cursos = await getCursosBuscados(buscado);
        titulo.innerHTML = `Resultados para "${buscado}"`;
    }
    buscador.value = buscado;
    if (cursos.length == 0){
        titulo.innerHTML = `No hay cursos disponibles`;
    }
    cursos.forEach(curso => {
        const cursoBus = `
            <div class="cursos_item" data-id = ${curso.id}>
            <div>
                <img src="${curso.imagen_path}" alt="imagencurso">
            </div>
            <div id="cursos_item_details" data-id=${curso.id}>
                <h3>${curso.titulo}</h3>
                <p>${curso.descripcion}</p>
                <p>Autor: ${curso.autor}</p>
            </div>
            </div>
        `;
        cursosContainer.innerHTML += cursoBus;
    });
}

async function getCursosBuscados(buscado) {

    const buscador = {
        "titulo": buscado
    };

    try {
        const response = await fetch('http://localhost:4000/cursos/name', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(buscador)
        });
        if (!response.ok) {
            return;
        }
        const listOfCursos = await response.json();
        return listOfCursos;
    } catch (error) {
        console.error(error);
    }
}

function setCursoListener() {
    const cursos = document.querySelectorAll('.cursos_item');
    cursos.forEach(curso => {
        curso.addEventListener('click', function (e) {
            e.preventDefault();
            const id = curso.dataset.id;
            window.location.href = `curso.html?id=${id}`;
        });
    });
}

function setCursoListenerAdmin() {
    const cursos = document.querySelectorAll('.cursos_item');
    cursos.forEach(curso => {
        curso.addEventListener('click', function (e) {
            e.preventDefault();
            const id = curso.dataset.id;
            window.location.href = `cursoAdmin.html?id=${id}`;
        });
    });
}

async function getCursosByCategoria(categoria_id){
    try {
        const response = await fetch(`http://localhost:4000/cursoHasCategoria/curso/${categoria_id}`);
        if (!response.ok) {
            return;
        }
        const listOfCursos = await response.json();
        return listOfCursos;
    } catch (error) {
        console.error(error);
    }
}