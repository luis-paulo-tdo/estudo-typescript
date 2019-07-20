import { Negociacao, NegociacaoParcial } from "../models/index";

export class NegociacaoService {

    obterNegociacoes(handler: HandlerFunction): Promise<void | Negociacao[]> {

        return fetch('http://localhost:8080/dados')
            .then(resposta => handler(resposta))
            .then(resposta => resposta.json())
            .then((dados: NegociacaoParcial[]) => 
                dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
            )
            .catch(erro => console.log(erro));
    }
}

export interface HandlerFunction {
    
    (res: Response): Response;
}
