let categoriaList = {};

function getUserInSession() {
    const UserInSession = localStorage.getItem('userInSession');

    if (!UserInSession) {
        return null;
    }
    let user = null;
    try {
        user = JSON.parse(UserInSession);
    }
    catch (e) {
        console.error('Error al obtener el usuario');
    }
    return user;
}

function setUserInSession(user) {
    if (user) {
        localStorage.setItem('userInSession', JSON.stringify(user));
    } else {
        localStorage.removeItem('userInSession');
    }
}

function logout() {
    setUserInSession(null);
    console.log('Sesión cerrada');
    window.location.href = 'index.html';
}


async function getCategorias() {
    try {
        const response = await fetch('http://localhost:4000/categorias');
        if (!response.ok) {
            return;
        }
        const listOfCategorias = await response.json();
        return listOfCategorias;
    } catch (error) {
        console.error(error);
    }
}


async function cargarCategorias() {
    const categorias = await getCategorias();
    const selectCategorias = document.querySelector('.dropdown-content');
    categorias.forEach(categoria => {
        const option = `
            <li><a data-id=${categoria.id}>${categoria.nombre}</a></li>
        `;
        selectCategorias.innerHTML += option;
        categoriaList[categoria.id] = categoria.nombre;
    });
    setCategoriasListener();
}

function setCategoriasListener() {
    const categorias = document.querySelectorAll('.dropdown-content li a');
    categorias.forEach(categoria => {
        categoria.addEventListener('click', function (e) {
            e.preventDefault();
            const id = categoria.dataset.id;
            window.location.href = `cursosBuscador.html?id=${id}`;
        });
    });
}

async function getCursos() {
    try {
        const response = await fetch('http://localhost:4000/cursos');
        if (!response.ok) {
            return;
        }
        const listOfCursos = await response.json();
        return listOfCursos;
    } catch (error) {
        console.error(error);
    }
}

async function setLinkBuscador() {
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query === '') {
            return
        }
        window.location.href = `cursosBuscador.html?search=${query}`;
    });
}

function setHeaderVisitante() {
    const header = document.querySelector('#header_items');
    const option = `
    <li><a href="inicio.html" class="btn">Iniciar Sesión</a></li>
    <li><a href="registro.html" class="btn">Registrarse</a></li>
    `;
    header.innerHTML += option;
}

function setHeaderUser(UserInSession) {
    const header = document.querySelector('#header_items');
    const option = `
        <li><a href="misCursos.html" class="btn">Mis Cursos</a></li>
        <li><a class="btn">${UserInSession[0].username}</a></li>
        <li><a href="index.html" class="btn" id="btn-salir">Salir</a></li>
    `;
    header.innerHTML += option;
    document.getElementById('btn-salir').addEventListener('click', function(e){
        e.preventDefault();
        logout();
    });
}

function setHeaderAdmin(UserInSession) {
    const header = document.querySelector('#header_items');
    const option = `
        <li><a href="cursosAdmin.html" class="btn">Administrar Cursos</a></li>
        <li><a class="btn">${UserInSession[0].username}</a></li>
        <li><a href="index.html" class="btn" id="btn-salir">Salir</a></li>
    `;
    header.innerHTML += option;
    document.getElementById('btn-salir').addEventListener('click', function(e){
        e.preventDefault();
        logout();
    });
}

async function getCursoById(id){
    console.log(id);
    try{
        const response = await fetch(`http://localhost:4000/cursos/${id}`);
        if(!response.ok){
            return;
        }
        const curso = await response.json();
        return curso;
    }catch(error){
        console.error(error);
    }
}

function volver() {
    if (document.referrer) {
        window.location.href = document.referrer;
    } else {
        // Redirige al usuario a una página predeterminada si no hay referrer
        window.location.href = 'index.html';
    }
}