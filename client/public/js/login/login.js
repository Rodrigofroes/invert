document.addEventListener('DOMContentLoaded', function () {

    const btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener('click', login);

});

function login(event) {
    event.preventDefault();

    const ra = document.getElementById('inputRa');
    const senha = document.getElementById('inputSenha');

    let array = [ra, senha];

    let isValid = true;

    array.forEach(input => {
        if (input.value.trim() === '') {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });

    if (!isValid) {
        return;
    }

    let objeto = {
        ra: ra.value,
        senha: senha.value
    }

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto)
    }).then(response => {
        if (response.status === 200) {
            response.json().then(data => {
                document.cookie = `token=${data.token}`;
            });
            window.location.href = '/mensalidade';
        } else {
            response.json().then(data => {
                const msgElement = document.getElementsByClassName('msg')[0];
                msgElement.classList.add('alert', 'alert-danger');
                msgElement.innerText = data.erro;
            });
        }
    });
}