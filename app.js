require('dotenv').config();

/*const db = require("./db/models/index")

const sequelize = require('sequelize');*/
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./db/models/index');

const Sequelize = sequelize.Sequelize;

//criando a model - classe que representa a tabela dentro do banco de dados
const Veiculos = sequelize.define('veiculos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    locadora: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, //não deve estar vazio
            isString(value) {
                if (typeof value !== 'string') {
                    throw new Error('Locadora deve ser uma string.');
                }
            },
        },
    },
    modelo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isString(value) {
                if (typeof value !== 'string') {
                    throw new Error('Modelo deve ser uma string.');
                }
            },
        },
    },
    marca: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isString(value) {
                if (typeof value !== 'string') {
                    throw new Error('Marca deve ser uma string,');
                }
            },
        },
    },
    ano: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true, // deve ser um numero inteiro
            isNumeric: true, //deve ser  numérico
            len: [4,4], // deve ter exatamente 4 dígitos
        }
    },
    motor: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isString(value) {
                if (typeof value !== 'string') {
                    throw new Error('Motor deve ser uma string');
                }
            },
        },
    },
    portas: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        validate: {
            isInt: true, //deve ser número inteiro
            isNumeric: true,
            min: 1, //deve ser maior ou igual a 1
            max: 5, //deve ser menor ou igual a 5
        },
    },
    cambio: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isString(value) {
                if (typeof value !== 'string') {
                    throw new Error('Câmbio deve ser uma string.');
                }
            },
        },
    },
    ar_condicionado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            isBoolean(value) {
                if (typeof value !== 'boolean') {
                    throw new Error('Ar condicionado deve ser um valor boolean.')
                }
            },
        },
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
});

//connection.sync({force: true}); 

const app = express();
const corsOptions = {
    origin: 'http://localhost:5500',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.send('Bem-vindo!');
  });  

//retornam a lista de todos os veiculos - com suporte a paginação
app.get('/veiculos', (req, res) => {
    const resp = {};
    const page = req.query.page || 1; // página a ser retornada
    const pageSize = req.query.pageSize || 10; //tamanho da página - número de itens que vão aparecer por página

    try {
        Veiculos.findAndCountAll({
            offset: (page - 1) * pageSize, // calcula o deslocamento com base na pagina
            limit: pageSize, //define o tamanho da página
        })
        .then(result => {
            const veiculos =  result.rows;
            const totalCount = result.count;

            const totalPages = Math.ceil(totalCount / pageSize);

            resp.page = page;
            resp.totalPages = totalPages;
            resp.veiculos = veiculos;

            res.json(resp);
        });
    } catch (error) {
        resp.status = 'fail';
        res.json(resp);
    }
});

//pesquisa por ID
app.get('/veiculos/:id', (req, res) => {
    const resp = {}

    try {
        Veiculos.findByPk(req.params.id) //findByPk busca um registro específico em uma tabela, com base na chave primária (ID)
        .then(veiculos => {
            if (veiculos) {
                res.json(veiculos);
            } else {
                resp.status = 'Veículo não encontrado';
                res.status(404).json(resp);
            }
        });
        
    } catch (error) {
        console.log(error)
        resp.status = 'fail'
        res.json(resp)
    }
});

//o POST é utilizado para realizar o registro do banco de dados
app.post('/veiculos', (req, res) => { 
    const resp = {};

    try {
        //função `create` para criar um novo veículo
        Veiculos.create(req.body)
            .then(() => {
                resp.status = 'ok';
                res.json(resp);
            })
            .catch(error => {
                if (error.name === 'SequelizeValidationError') {
                    // Erro de validação do modelo, campos obrigatórios estão faltando
                    const missingFields = error.errors.map(err => err.path);
                    resp.status = 'fail';
                    resp.error = 'Campos obrigatórios faltando: ' + missingFields.join(', ');
                    res.status(400).json(resp);
                } else {
                    console.log("Erro ao adicionar veículo:", error);
                    resp.status = 'fail';
                    resp.error = 'Erro desconhecido ao adicionar veículo';
                    res.status(500).json(resp);
                }
            });
    } catch (error) {
        console.log(error);
        resp.status = 'fail';
        resp.error = 'Erro desconhecido ao adicionar veículo1';
        res.status(500).json(resp);
    }
});

//atualiza os detalhes de um veículo existente com base no ID
app.put('/veiculos/:id', (req, res) => {
    const resp = {}

        Veiculos.findByPk(req.params.id)
        .then(veiculos => {
            if (veiculos) {
                veiculos.update(req.body)
                .then(updateVeiculos => {
                    res.json(updateVeiculos);
                })
                .catch(error => {
                    resp.status = 'Falha ao atualizar veículo';
                    res.status(500).json(resp);
                });
            } else {
                resp.status = 'Veículo não encontrado';
                res.status(404).json(resp);
            }
        })
        .catch(error => {
            resp.status = 'Erro ao buscar veículo';
            res.status(500).json(resp);
        });
});

//deletar um registro
app.delete('/veiculos/:id', (req, res) => {
    const resp = {}

    try {
        Veiculos.findByPk(req.params.id)
        .then(veiculos => {
            if (veiculos) {
                veiculos.destroy()
                .then(() => {
                    resp.status = 'ok';
                    res.json(resp);
                });
            } else {
                resp.status = 'Veículo não encontrado';
                res.status(404).json(resp);
            }
        });
    } catch (error) {
        resp.status = 'fail';
        res.json(resp);
    }
});

//deve ficar sempre no final do script!!
//const port = process.env.PORT || 3000; 
 
sequelize.sync({force: false})
    .then(() => {
        console.log('Tabela de veiculos criada.');
    })

app.listen(3000, () => {
  console.log(`Servidor ouvindo na porta 3000`);
});