"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const realAtual = document.getElementById('real-atual'); //h1
const inputDolar = document.getElementById('input-dolar');
const inputReal = document.getElementById('input-real');
document.addEventListener('DOMContentLoaded', () => {
    function fetchAPi() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`https://economia.awesomeapi.com.br/last/USD`);
                if (!response.ok) {
                    throw new Error(`error ${response.status}: ${response.statusText}`);
                }
                const data = yield response.json();
                console.log(data);
                const bid = parseFloat(data.USDBRL.bid);
                if (realAtual) {
                    realAtual.innerText = `R$ ${bid.toFixed(2)}`;
                    const valorInputDolar = parseFloat(inputDolar.value);
                    const convertido = valorInputDolar * bid;
                    inputReal.value = convertido.toFixed(2);
                }
                inputDolar === null || inputDolar === void 0 ? void 0 : inputDolar.addEventListener('input', () => {
                    const valor = parseFloat(inputDolar.value);
                    if (!isNaN(valor)) {
                        inputReal.value = atualizarDeDolarParaReal(valor, bid);
                    }
                });
                inputReal === null || inputReal === void 0 ? void 0 : inputReal.addEventListener('input', () => {
                    const valor = parseFloat(inputReal.value);
                    if (!isNaN(valor)) {
                        inputDolar.value = atualizarDeRealParaDolar(valor, bid);
                    }
                });
            }
            catch (error) {
                console.error('erro ao buscar dados:', error);
            }
        });
    }
    fetchAPi();
});
function atualizarDeDolarParaReal(dolar, cotacao) {
    return (dolar * cotacao).toFixed(2);
}
function atualizarDeRealParaDolar(real, cotacao) {
    return (real / cotacao).toFixed(2);
}
