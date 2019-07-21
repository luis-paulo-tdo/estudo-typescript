import { Imprimivel } from './Imprimivel';
import { Igualavel } from './Igualavel';
import { Negociacao } from './Negociacao';

export class Negociacoes implements Imprimivel, Igualavel<Negociacoes> {

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

    flagIgual(negociacoes: Negociacoes) {
        return JSON.stringify(this._negociacoes) === JSON.stringify(negociacoes.paraArray());
    }
}