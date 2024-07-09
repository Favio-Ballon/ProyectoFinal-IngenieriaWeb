(function () {
    const UserInSession = getUserInSession();
    if (UserInSession) {
        window.location.href = 'indexUsuario.html';
        return;
    }

    document.body.style.display = 'flex';

    document.querySelector('#btnLogin').addEventListener("click", login);
    setBtnRegister();
})();

async function login(e) {
    e.preventDefault();

    const inputUsername = document.querySelector('#username').value;
    const inputPassword = document.querySelector('#password').value;

    const validationUsername = document.querySelector('#validation-username');
    const validationPassword = document.querySelector('#validation-password');
    const msgError = document.querySelector('#error-msg');


    let isValid = true;


    if (inputUsername === '') {
        validationUsername.innerHTML = 'El campo de usuario es requerido';
        isValid = false;
        validationUsername.style.display = 'block';
    } else {
        validationUsername.style.display = 'none';
        msgError.style.display = 'none';
    }

    if (inputPassword === '') {
        validationPassword.innerHTML = 'El campo de contraseña es requerido';
        isValid = false;
        validationPassword.style.display = 'block';
    } else {
        validationPassword.style.display = 'none';
    }

    if (!isValid) {
        return;
    }

    const userRequest = {
        "username": inputUsername,
        "password": inputPassword
    };

    console.log(userRequest);
    try {
        const response = await fetch('http://localhost:4000/usuarios/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userRequest)
        });
        if (response.ok) {
            const userInSession = await response.json();
            setUserInSession(userInSession);
            window.location.href = 'index.html';
        } else {
            msgError.innerHTML = 'Usuario o contraseña incorrectos';
            msgError.style.display = 'block';
        }
    } catch (ex) {
        console.error(ex);
        return;
    }
}

function setBtnRegister() {
    const btnRegister = document.querySelector('.btn_registrar');
    btnRegister.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'registro.html';
    });
}


