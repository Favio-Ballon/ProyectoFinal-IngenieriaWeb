(function () {
    const userInSession = getUserInSession();
    console.log(userInSession);
    if (userInSession) {
        if (userInSession[0]['is_admin']) {
            setHeaderAdmin(userInSession);
        } else {
            setHeaderUser(userInSession);
        }
    }else{
        setHeaderVisitante();
    }

    cargarCategorias();
    cargar2cursos();
    cursoListener();
    setLinkBuscador();

})();

async function cargar2cursos() {
    const cursos = await getCursos();
    console.log(cursos);
    const firstCurso = document.getElementById('firstCurso');
    const secondCurso = document.getElementById('secondCurso');

    firstCurso.dataset.id = cursos[0].id;
    secondCurso.dataset.id = cursos[1].id;

    const img = firstCurso.querySelector('img');
    const h3 = firstCurso.querySelector('h3');
    const p = firstCurso.querySelector('p');

    const img2 = secondCurso.querySelector('img');
    const h32 = secondCurso.querySelector('h3');
    const p2 = secondCurso.querySelector('p');

    if (cursos.length > 0) {
        img.src = cursos[0].imagen_path;
        h3.innerHTML = cursos[0].titulo;
        p.innerHTML = cursos[0].descripcion;

        img2.src = cursos[1].imagen_path;
        h32.innerHTML = cursos[1].titulo;
        p2.innerHTML = cursos[1].descripcion;

    } else {
        console.log('No cursos available');
    }
    document.body.style.display = 'block';
}

function cursoListener(){
    const firstCurso = document.getElementById('firstCurso');
    const secondCurso = document.getElementById('secondCurso');

    firstCurso.addEventListener('click', function(e){
        e.preventDefault();
        const id = firstCurso.dataset.id;
        window.location.href = `curso.html?id=${id}`;
    });

    secondCurso.addEventListener('click', function(e){
        e.preventDefault();
        const id = secondCurso.dataset.id;
        window.location.href = `curso.html?id=${id}`;
    });
}

