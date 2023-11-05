document.addEventListener('DOMContentLoaded', () => {
    const form =  document.querySelector('form');
    const veiculosTable = document.querySelector('#veiculos-table tbody');
    const atualizarListaBtn = document.querySelector('#atualizar_lista');
    const parser = require('body-parser');
    const urlencodedParser = parser.urlencoded({extended : false});

    // evento de envio do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData =  new FormData(form);
        const formDataJSON = {};
        formData.forEach((value, key) => {
            formDataJSON[key] = value;
        });
        const jsonData = JSON.stringify(formDataJSON);

        fetch('http://localhost:3000/veiculos', {
            method: 'POST',
            body: jsonData,
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }) .then(response => {
            if (!response.ok) {
                throw new Error (`HTTP error! Status`, response.status);
            }
            return response.json();
            })
            .then(data => {
                carregarVeiculos();
                form.reset();
            })
            .catch(error => {
                res.status(400);
                console.log(error);
            });
    });

    //carregar a lista de veículos
    const carregarVeiculos = () => {
        fetch('http://localhost:3000/veiculos') 
        .then((response) => response.json())
        .then((data) => {
            veiculosTable.innerHTML = '';

            data.veiculos.forEach((veiculo) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${veiculo.locadora}</td>
                <td>${veiculo.modelo}</td>
                <td>${veiculo.marca}</td>
                <td>${veiculo.ano}</td>
                <td>${veiculo.motor}</td>
                <td>${veiculo.cambio}</td>
                <td>${veiculo.ar_condicionado ? 'Sim' : 'Não'}</td>
                `;

                veiculosTable.appendChild(row);
            });
        });
    };

    app.use(parser .json());
    app.use(urlencodedParser);

    // evento de atualização da lista
    atualizarListaBtn.addEventListener('click', () => {
        carregarVeiculos();
    });

    //carregar lista de veiculos ao carregar a página
    carregarVeiculos();
});