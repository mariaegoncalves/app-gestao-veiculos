//incluir o arquivo com as variaveis de ambiente
require('dotenv').config();

// exportar as credenciais do banco de dados
module.exports = {
  "development": {
    "username": "maria",
    "password": "123456",
    "database": "gestao_veiculos",
    "host": "localhost",
    "port": "3306",
    "dialect": "mysql",
  },
  "test": {
      "username": "maria",
      "password": "123456",
      "database": "gestao_veiculos",
      "host": "localhost",
      "port": "3306",
      "dialect": "mysql",
  },
  "production": {
    "username": "maria",
    "password": "123456",
    "database": "gestao_veiculos",
    "host": "localhost",
    "port": "3306",
    "dialect": "mysql",
  }
}
