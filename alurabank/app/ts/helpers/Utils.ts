import { Negociacao } from "../models/index";

export function imprime(...negociacoes: Negociacao[]) {

    negociacoes.forEach(negociacao => negociacao.paraTexto());
}
