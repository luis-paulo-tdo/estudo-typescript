import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index'; 
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index';

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes  = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _service = new NegociacaoService();
    private _mensagemView = new MensagemView('#mensagemView');
    
    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona() {

        let data = new Date(this._inputData.val().replace(/-/g, ','));
        if(!this._flagDiaUtil(data)) {
            this._mensagemView.update('Somente Negociações em dias úteis, por favor!');
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );
        this._negociacoes.adiciona(negociacao);
        
        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso.');
    }

    @throttle()
    async importa() {

        try {

            const negociacoesParaImportar = await this._service.obterNegociacoes((resposta) => {

                if (resposta.ok) {
                    return resposta;
                } else {
                    throw new Error(resposta.statusText);
                }
            });
                
            const negociacoesExistentes = this._negociacoes.paraArray();
    
            negociacoesParaImportar.filter(negociacao => 
                !negociacoesExistentes.some(existente => 
                    negociacao.flagIgual(existente)
                )
            ).forEach(negociacao => 
                this._negociacoes.adiciona(negociacao)
            );
            this._negociacoesView.update(this._negociacoes);     

        } catch(erro) {
            this._mensagemView.update(erro.message);
        }
    }

    private _flagDiaUtil(data: Date) {
        return data.getDay() !== DiaDaSemana.Sabado && data.getDay() !== DiaDaSemana.Domingo;
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}
