function enviarMensagem(origem, destino, mensagem) {
    console.log(`[${origem} -> ${destino}] Enviando mensagem: "${mensagem}"`);
}

function enviarControle(origem, destino, controle) {
    console.log(`[${origem} -> ${destino}] Enviando controle: "${controle}"`);
}

function simularComunicacao() {
    const probabilidadeErro = 0.5; 
    const probabilidadePerda = 0.05; 
    let mensagem = 'Mensagem de teste';
    let controle = 'Controle de teste';

    
    while (true) {
        
        enviarMensagem('A', 'B', mensagem);

        if (Math.random() < probabilidadeErro) {
            console.log('[B -> A] Erro na transmissão detectado. Retransmitindo...');
            continue;
        }

        if (Math.random() < probabilidadePerda) {
            console.log('[B -> A] Mensagem perdida. Retransmitindo...');
            continue;
        }

        enviarControle('B', 'A', 'Recebido');
        break;
    }

    while (true) {

        enviarControle('B', 'A', controle);

        if (Math.random() < probabilidadeErro) {
            console.log('[A -> B] Erro na transmissão do controle detectado. Retransmitindo...');
            continue;
        }

        if (Math.random() < probabilidadePerda) {
            console.log('[A -> B] Controle perdido. Retransmitindo...');
            continue;
        }

        console.log('[A -> B] Controle recebido corretamente.');
        break;
    }
}

simularComunicacao();
