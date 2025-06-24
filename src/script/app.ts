const realAtual: HTMLElement | null = document.getElementById('real-atual'); //h1
const inputDolar = document.getElementById('input-dolar') as HTMLInputElement;
const inputReal = document.getElementById('input-real') as HTMLInputElement;

interface CotacaoResponse {
     USDBRL: {
          bid: string;
     };
}

document.addEventListener('DOMContentLoaded', () => {
     async function fetchAPi() {
          try {
               const response = await fetch(`https://economia.awesomeapi.com.br/last/USD`);

               if (!response.ok) {
                    throw new Error(`error ${response.status}: ${response.statusText}`);
               }

               const data: CotacaoResponse = await response.json();
               console.log(data);

               const bid: number = parseFloat(data.USDBRL.bid);

               if (realAtual) {
                    realAtual.innerText = `R$ ${bid.toFixed(2)}`;

                    const valorInputDolar: number = parseFloat(inputDolar.value);
                    const convertido = valorInputDolar * bid;
                    inputReal.value = convertido.toFixed(2);
               }

               inputDolar?.addEventListener('input', () => {
                    const valor = parseFloat(inputDolar.value);
                    if (!isNaN(valor)) {
                         inputReal.value = atualizarDeDolarParaReal(valor, bid);
                    }
               });

               inputReal?.addEventListener('input', () => {
                    const valor = parseFloat(inputReal.value);
                    if (!isNaN(valor)) {
                         inputDolar.value = atualizarDeRealParaDolar(valor, bid);
                    }
               });
          } catch (error) {
               console.error('erro ao buscar dados:', error);
          }
     }
     fetchAPi();
});

function atualizarDeDolarParaReal(dolar: number, cotacao: number): string {
     return (dolar * cotacao).toFixed(2);
}

function atualizarDeRealParaDolar(real: number, cotacao: number): string {
     return (real / cotacao).toFixed(2);
}
