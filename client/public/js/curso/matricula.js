document.addEventListener('DOMContentLoaded', function () {
    (function () {
        'use strict'
        var forms = document.querySelectorAll('.needs-validation');
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }

                    form.classList.add('was-validated');
                }, false);
            });
    })();

    const btnCep = document.getElementById('btnBuscarCep');
    let clientSecret = document.getElementById('clientSecret').value;

    btnCep.addEventListener('click', consultaCep);

    formatarInputs();
    handleCardPayment(clientSecret);
});




function showLoader() {
    document.getElementsByClassName('lottie-loader')[0].style.display = 'flex';
}

function hideLoader() {
    document.getElementsByClassName('lottie-loader')[0].style.display = 'none';
}

function formatarInputs() {
    const nome = document.getElementById('inputNome');
    const email = document.getElementById('inputEmail');
    const cep = document.getElementById('inputCep');
    const endereco = document.getElementById('inputEndereco');
    const bairro = document.getElementById('inputBairro');
    const cidade = document.getElementById('inputCidade');
    const estado = document.getElementById('inputEstado');

    nome.addEventListener('input', () => {
        nome.value = nome.value.replace(/[^a-zA-Z\s]/g, '');
    });

    endereco.addEventListener('input', () => {
        endereco.value = endereco.value.replace(/[^a-zA-Z0-9\s,]/g, '');
    });

    cep.addEventListener('input', () => {
        cep.value = cep.value.replace(/\D/g, '');
    });

    bairro.addEventListener('input', () => {
        bairro.value = bairro.value.replace(/[^a-zA-Z\s]/g, '');
    });

    cidade.addEventListener('input', () => {
        cidade.value = cidade.value.replace(/[^a-zA-Z\s]/g, '');
    });
}

function matricula(event) {
    event.preventDefault();

    const nome = document.getElementById('inputNome');
    const email = document.getElementById('inputEmail');
    const cep = document.getElementById('inputCep');
    const endereco = document.getElementById('inputEndereco');
    const bairro = document.getElementById('inputBairro');
    const cidade = document.getElementById('inputCidade');
    const estado = document.getElementById('inputEstado');
    const id = document.getElementById('inputId');

    let inputs = [nome, email, cep, endereco, bairro, cidade, estado];
    let isValid = true;

    inputs.forEach(input => {
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
        nome: nome.value,
        email: email.value,
        cep: cep.value,
        endereco: endereco.value,
        bairro: bairro.value,
        cidade: cidade.value,
        estado: estado.value,
        id: id.value
    };

    localStorage.setItem('matricula', JSON.stringify(objeto));

    fetch('/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objeto)
    }).then(response => {
        if (response.status === 200) {
            response.json().then(data => {
                let modal = `
                    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false"  tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Seja Bem-Vindo!</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="d-flex flex-column align-items-center">
                                        <dotlottie-player src="https://lottie.host/a3c2a9e8-a214-496a-8a06-534523b69665/4VQtI8ql8W.json"
                                            background="transparent" speed="1" style="width: 200px; height: 200px;" loop autoplay>
                                        </dotlottie-player>
                                        <p class="text-center">Para acessar o curso, clique no botão abaixo</p>
                                        <div class="row mb-4 w-75">
                                            <div class="col-md-6">
                                                <label for="inputRA">RA:</label>
                                                <input type="text" id="inputRA" value="${data.RA}" class="form-control" readonly>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inputSenha">Senha:</label>
                                                <input type="text" id="inputSenha" value="${data.Senha}" class="form-control" readonly>
                                            </div>
                                        </div>
                                        <a  href="/login" class="btn btn-success mt-2">Acessar Curso</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                document.body.innerHTML += modal;
                let modalElement = document.querySelector('.modal');
                let modalInstance = new bootstrap.Modal(modalElement);
                modalInstance.show();
            });

        } else {
            response.json().then(data => {
                alert(data.msg);
            });

            let dados = JSON.parse(localStorage.getItem('matricula'));

            nome.value = dados.nome;
            email.value = dados.email;
            cep.value = dados.cep;
            endereco.value = dados.endereco;
            bairro.value = dados.bairro;
            cidade.value = dados.cidade;
            estado.value = dados.estado;
        }
    }).catch(error => {
        console.error('Erro ao realizar a matrícula:', error);
        alert('Erro ao realizar a matrícula. Tente novamente mais tarde.');
    });
}

function consultaCep() {
    const cep = document.getElementById('inputCep');

    if (cep.value === '' || cep.value.length !== 8) {
        cep.classList.add('is-invalid');
        return;
    }

    fetch(`/cep/${cep.value}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.status === 200) {
            response.json().then(data => {
                document.getElementById('inputCidade').value = data.localidade;
                document.getElementById('inputEstado').value = data.uf;
            });
            cep.classList.remove('is-invalid');
        } else {
            response.json().then(data => {
                alert(data.erro);
            });
        }
    }).catch(error => {
        console.error('Erro ao consultar o CEP:', error);
        alert('Erro ao consultar o CEP. Tente novamente mais tarde.');
    });
}

async function handleCardPayment(clientSecret) {
    const stripe = Stripe(''); // Substitua por sua chave pública
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    document.getElementById('pay-button').addEventListener('click', async (event) => {
        event.preventDefault();

        const form = document.getElementById('payment-form');
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        showLoader();

        try {
            const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: document.getElementById('inputNome').value,
                        email: document.getElementById('inputEmail').value,
                    },
                }
            });

            if (error) {
                document.getElementById('card-errors').textContent = error.message;
            } else if (paymentIntent.status === 'succeeded') {
                matricula(event);
                clearFormFields(elements);
            }
        } catch (err) {
            console.error('Erro durante o processamento do pagamento:', err);
        } finally {
            hideLoader();
        }
    });
}

function clearFormFields(elements) {
    document.getElementById('payment-form').reset();

    const cardElement = elements.getElement('card');
    if (cardElement) {
        cardElement.clear();
    }

    const nome = document.getElementById('inputNome');
    const email = document.getElementById('inputEmail');
    const cep = document.getElementById('inputCep');
    const endereco = document.getElementById('inputEndereco');
    const bairro = document.getElementById('inputBairro');
    const cidade = document.getElementById('inputCidade');
    const estado = document.getElementById('inputEstado');

    let inputs = [nome, email, cep, endereco, bairro, cidade, estado];
    inputs.forEach(input => {
        input.value = '';
    });

}
