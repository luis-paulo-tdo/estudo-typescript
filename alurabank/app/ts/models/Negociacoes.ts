import { Imprimivel } from './Imprimivel';
import { Negociacao } from './Negociacao';

export class Negociacoes extends Imprimivel {

    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao) {
        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {
        console.log('Impressão de Negociações:');
        console.log(JSON.stringify(this._negociacoes));
    }
}