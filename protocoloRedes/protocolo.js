/**
 * Envia uma mensagem e espera por uma confirmação dentro de um limite de tempo.
 *
 * @param {function} enviarFuncao Função responsável por enviar a mensagem.
 * @param {function} receberConfirmacaoFuncao Função que ouve/verifica a confirmação.
 * @param {number} timeout Tempo máximo de espera pela confirmação (em milissegundos).
 * @return {Promise} Promessa que resolve se a confirmação for recebida a tempo, e rejeita se o tempo esgotar.
 */
function enviarMensagemComTimeout(enviarFuncao, receberConfirmacaoFuncao, timeout) {
    return new Promise((resolve, reject) => {
        // Flag para controle do estado da promessa.
        let foiConfirmado = false;

        // Define o comportamento para quando receber a confirmação.
        const confirmacaoHandler = () => {
            foiConfirmado = true;
            resolve('Confirmação recebida!');
        };

        // Inicia a escuta pela confirmação.
        receberConfirmacaoFuncao(confirmacaoHandler);

        // Envia a mensagem.
        enviarFuncao();

        // Define o timeout.
        setTimeout(() => {
            if (!foiConfirmado) {
                reject('Timeout: confirmação não recebida a tempo.');
            }
        }, timeout);
    });
}

// Simula o envio de uma mensagem.
function enviarMensagem() {
    console.log('Mensagem enviada.');
}

// Simula a função que escuta pela confirmação.
function ouvirPorConfirmacao(callback) {
    // Simula o recebimento da confirmação após 2 segundos.
    setTimeout(callback, 1000);
}

// Tempo máximo de espera pela confirmação (exemplo: 3 segundos).
const TIMEOUT = 3000;

enviarMensagemComTimeout(enviarMensagem, ouvirPorConfirmacao, TIMEOUT)
    .then(resposta => console.log(resposta))
    .catch(erro => console.log(erro));
