# rentcars-programa-estagio-2023

## Visão geral

O projeto é um aplicativo CRUD (Create, Read, Update, Delete) desenvolvido em Node.js para a gestão de veículos em uma locadora de carros. O aplicativo permite a criação, leitura, atualização e exclusão de informações detalhadas sobre veículos, incluindo ID, locadora, modelo, marca, ano, motor, número de portas, tipo de câmbio, presença de ar-condicionado e datas de criação e atualização.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- Sequelize
- WSL (Windows Subsystem for Linux)

## Estrutura da aplicação

O aplicativo segue uma arquitetura RESTful, com endpoints para cada operação CRUD. Ele utiliza o Sequelize como ORM (Object-Relational Mapping) para interagir com o banco de dados MySQL.

## Requisitos funcionais

- Criação de novos veículos com informações detalhadas.
- Recuperação da lista de todos os veículos.
- Recuperação dos detalhes de um veículo com base no ID.
- Atualização dos detalhes de um veículo existente com base no ID.
- Exclusão de um veículo com base no ID.

## Modelo de dados

O banco de dados utilizado chama-se "gestao_veiculos", e a tabela é denominada "veiculos". A estrutura de um objeto de veículo é a seguinte:

```json
'{
 "id": "1",
 "locadora": "Movida",
 "modelo": "Virtus",
 "marca": "Volkswagen",
 "ano": 2023,
 "motor": "1.0",
 "portas": 4,
 "cambio": "Automatico",
 "ar_condicionado": true,
 "updatedAt": "2023-10-23T14:37:35.917Z",
 "createdAt": "2023-10-23T14:37:35.917Z"
}'
```

## API RESTful

O aplicativo fornece os seguintes endpoints para gerenciar veículos:

- `GET /veiculos`: Retorna a lista de todos os veículos.
- `GET /veiculos/:id`: Retorna os detalhes de um veículo específico com base no ID.
- `POST /veiculos`: Cria um novo veículo.
- `PUT /veiculos/:id`: Atualiza os detalhes de um veículo existente com base no ID.
- `DELETE /veiculos/:id`: Exclui um veículo com base no ID.

## Como iniciar o projeto

Para iniciar o projeto e executar o servidor, siga os passos a seguir:

1. Abra o terminal e acesse esse diretório:
`cd my_app`

2. Verifique se você tem o arquivo `package.json` no projeto. Se não tiver, você pode criar um novo arquivo `package.json` com o seguinte comando:
`npm init -y`

3. Em seguida, execute o seguinte comando para baixar as dependências definidas no arquivo `package.json`:
`npm install`

4. Verifique a versão do Node.js no seu ambiente. Execute o seguinte comando para verificar a versão do Node.js:
`node -v`
Se a versão do Node.js instalada for inferior à 18, você pode atualizar o Node.js usando o seu gerenciador de pacotes (npm), ou baixando a versão mais recente no site oficial.

## Problemas conhecidos
### Erro ao enviar formulário de cadastro de veículo
Atualmente, o aplicativo enfrenta um erro ao tentar enviar o formulário de cadastro de veículo no cliente. O erro é o seguinte:
POST http://localhost:3000/veiculos net::ERR_ABORTED 400 (Bad Request)

As solicitações funcionam corretamente quando enviadas por meio de um cURL no Postman.

### Descrição do problema
O erro ocorre quando o cliente tenta realizar uma solicitação POST para o endpoint `http://localhost:3000/veiculos`, e o servidor responde com um erro 400 (Bad Request), para melhor ilustrar, segue um screenshot do console do navegador:

![Captura de tela do console](img/error.console.png)

#### Status da Investigação
Estou atualmente investigando a causa do problema e trabalhando para identificar as possíveis razões por trás desse erro. Estou também buscando ajuda de colegas de profissão e explorando soluções possíveis para resolver o erro.

## Exemplos de solicitações cURL para o Postman.
Alguns exemplos de solicitações cURL para testar as funcionalidade da API no Postman.
### Solicitação GET para obter a lista de veículos
```bash
curl -X GET http://localhost:3000/veiculos
```
### Solicitação GET para obter detalhes de um veículo específico (substitua o ID)
```bash
curl -X GET http://localhost:3000/veiculos/1
```
### Solicitação POST para cadastrar um novo veículo (substitua os dados)
``` bash
curl -X POST -d '{
  "locadora": "Locadora A",
  "modelo": "Modelo X",
  "marca": "Marca Y",
  "ano": 2023,
  "motor": "Motor V8",
  "numero_de_portas": 4,
  "tipo_de_cambio": "Automático",
  "ar_condicionado": true
}' http://localhost:3000/veiculos
```
### Solicitação PUT para atualizar os detalhes de um veículo existente (substitua o ID e os dados)
``` bash
curl -X PUT -d '{
  "modelo": "Novo Modelo",
  "ano": 2024
}' http://localhost:3000/veiculos/1
```
### Solicitação DELETE para excluir um veículo com base no ID
``` bash
curl -X DELETE http://localhost:3000/veiculos/1
```



   
