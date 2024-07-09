(function () {
    const UserInSession = getUserInSession();
    if (UserInSession) {
        if (userInSession[0]['is_admin']) {
            window.location.href = 'cursosAdmin.html';
        } else {
            window.location.href = 'indexUsuario.html';
        }
    }

    document.body.style.display = 'flex';
    document.querySelector('.btn').addEventListener("click", register);

})();

async function register(e) {
    e.preventDefault();

    const inputUsername = document.querySelector('#username').value;
    const inputPassword = document.querySelector('#password').value;
    const inputEmail = document.querySelector('#email').value;

    const validationUsername = document.querySelector('#validation-username');
    const validationPassword = document.querySelector('#validation-password');
    const validationEmail = document.querySelector('#validation-email');

    let isValid = true;

    if (inputUsername === '') {
        validationUsername.innerHTML = 'El campo de usuario es requerido';
        isValid = false;
        validationUsername.style.display = 'block';
    } else if (inputUsername.length < 2) {
        validationUsername.innerHTML = 'El usuario debe tener al menos 5 caracteres';
        isValid = false;
        validationUsername.style.display = 'block';
    } else if (inputUsername.length > 30) {
        validationUsername.innerHTML = 'El usuario debe tener menos de 30 caracteres';
        isValid = false;
        validationUsername.style.display = 'block';
    }
    else {
        validationUsername.style.display = 'none';
    }

    if (inputPassword === '') {
        validationPassword.innerHTML = 'El campo de contraseña es requerido';
        isValid = false;
        validationPassword.style.display = 'block';
    } else if (inputPassword.length < 5) {
        validationPassword.innerHTML = 'La contraseña debe tener al menos 5 caracteres';
        isValid = false;
        validationPassword.style.display = 'block';
    } else {
        validationPassword.style.display = 'none';
    }

    if (inputEmail === '') {
        validationEmail.innerHTML = 'El campo de email es requerido';
        isValid = false;
        validationEmail.style.display = 'block';
    } else if (!validateEmail(inputEmail)) {
        validationEmail.innerHTML = 'El email debe tener un formato válido';
        isValid = false;
        validationEmail.style.display = 'block';
    } else {
        validationEmail.style.display = 'none';
    }

    if (!isValid) {
        return;
    }

    const valUser = await fetch('http://localhost:4000/usuarios/username/' + inputUsername);
    const valEmail = await fetch('http://localhost:4000/usuarios/email/' + inputEmail);

    if (valUser.ok) {
        const data = await valUser.json();
        if (data.length > 0) {
            validationUsername.innerHTML = 'El usuario ya existe';
            validationUsername.style.display = 'block';
            isValid = false;
        }
    }

    if (valEmail.ok) {
        const data = await valEmail.json();
        if (data.length > 0) {
            validationEmail.innerHTML = 'El email ya está en uso';
            validationEmail.style.display = 'block';
            isValid = false;
        }
    }

    if (!isValid) {
        return;
    }

    const userRequest = {
        "username": inputUsername,
        "password": inputPassword,
        "email": inputEmail
    };

    console.log(userRequest);

    try {
        const response = await fetch('http://localhost:4000/usuarios', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userRequest)
        });

        if (response.ok) {
            window.location.href = 'inicio.html';
        } else {
            return;
        }
    } catch (ex) {
        console.error(ex);
        return;
    }

}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

