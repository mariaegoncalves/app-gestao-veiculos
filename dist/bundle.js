/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', () => {\n    const form =  document.querySelector('form');\n    const veiculosTable = document.querySelector('#veiculos-table tbody');\n    const atualizarListaBtn = document.querySelector('#atualizar_lista');\n\n    //carregar a lista de veículos\n    const carregarVeiculos = () => {\n        fetch('http://localhost:3000/veiculos') \n        .then((response) => response.json())\n        .then((data) => {\n            veiculosTable.innerHTML = '';\n\n            data.veiculos.forEach((veiculo) => {\n                const row = document.createElement('tr');\n                row.innerHTML = `\n                <td>${veiculo.locadora}</td>\n                <td>${veiculo.modelo}</td>\n                <td>${veiculo.marca}</td>\n                <td>${veiculo.ano}</td>\n                <td>${veiculo.motor}</td>\n                <td>${veiculo.cambio}</td>\n                <td>${veiculo.ar_condicionado ? 'Sim' : 'Não'}</td>\n                `;\n\n                veiculosTable.appendChild(row);\n            });\n        });\n    };\n\n    // evento de envio do formulário\n    form.addEventListener('submit', (event) => {\n        event.preventDefault();\n\n        const formData =  new FormData(form);\n        const formDataJSON = {};\n        formData.forEach((value, key) => {\n            formDataJSON[key] = value;\n        });\n        const jsonData = JSON.stringify(formDataJSON);\n\n        fetch('http://localhost:3000/veiculos', {\n            method: 'POST',\n            mode: 'no-cors',\n            body: jsonData,\n            headers: {\n                'Content-Type': 'application/json'\n            }\n        }) .then(response => {\n            if (!response.ok) {\n                throw new Error (`HTTP error! Status`, response.status);\n            }\n            return response.json();\n            })\n            .then(data => {\n                carregarVeiculos();\n                form.reset();\n            })\n            .catch(error => {\n                console.error('Erro na solicitação POST:', error);\n            });\n    });\n\n    // evento de atualização da lista\n    atualizarListaBtn.addEventListener('click', () => {\n        carregarVeiculos();\n    });\n\n    //carregar lista de veiculos ao carregar a página\n    carregarVeiculos();\n});\n\n//# sourceURL=webpack:///./script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./script.js"]();
/******/ 	
/******/ })()
;