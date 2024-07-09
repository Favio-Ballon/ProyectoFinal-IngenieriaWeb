
async function setCursosAdmin() {
    setBotonTitulo();
    setBotonCrearEditar();
    var link = document.createElement("link");

    // se Añade css de para admin
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "css/cursosAdmin.css"; 

    
    document.getElementsByTagName("head")[0].appendChild(link);
}

function setBotonTitulo() {
    var boton = document.getElementById("cursos_titulo");
    const btnCrearCurso = document.createElement('button');
    btnCrearCurso.className = 'btn';
    btnCrearCurso.textContent = 'Crear Curso';
    btnCrearCurso.id = "btnAñadirCurso";
    btnCrearCurso.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = 'crearCurso.html';
    });
    boton.appendChild(btnCrearCurso);
}


async function setBotonCrearEditar() {
    const cursosContainer = document.querySelectorAll('#cursos_item_details');
    console.log(cursosContainer);
    cursosContainer.forEach((curso, index) => {
        const id = curso.dataset.id;
        const cursoBotones = document.createElement('div');
        cursoBotones.className = 'curso_botones';

        const btnEditarCurso = document.createElement('button');
        btnEditarCurso.className = 'btn';
        btnEditarCurso.textContent = 'Editar';
        btnEditarCurso.dataset.id = id;
        btnEditarCurso.addEventListener('click', (e) => {
            e.stopPropagation();
            editarCurso(id);
        });

        const btnBorrarCurso = document.createElement('button');
        btnBorrarCurso.className = 'btn';
        btnBorrarCurso.textContent = 'Borrar';
        btnBorrarCurso.dataset.id = id;
        btnBorrarCurso.addEventListener('click', (e) => {
            e.stopPropagation();    
            borrarCurso(id);
        });

        cursoBotones.appendChild(btnEditarCurso);
        cursoBotones.appendChild(btnBorrarCurso);

        curso.appendChild(cursoBotones);
    });
}

function editarCurso(id){
    window.location.href = `crearCurso.html?id=${id}`;
}

async function borrarCurso(id){
    try{
        const response = await fetch(`http://localhost:4000/cursos/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok){
            return;
        }
        window.location.reload();
    }catch(error){
        console.error(error);
    }
}

