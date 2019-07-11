System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function medirTempoDeExecucao(emSegundos = false) {
        return function (target, propertyKey, descriptor) {
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                let unidade = 'ms';
                let divisor = 1;
                if (emSegundos) {
                    unidade = 's';
                    divisor = 1000;
                }
                console.log('----------------------');
                console.log(`Executando método ${propertyKey}...`);
                console.log(`Parâmetros passados: ${JSON.stringify(args)}`);
                const tempoInicial = performance.now();
                const retorno = metodoOriginal.apply(this, args);
                const tempoFinal = performance.now();
                console.log(`Retorno: ${JSON.stringify(retorno)}`);
                console.log(`Tempo de Execução: ${(tempoFinal - tempoInicial) / divisor} ${unidade}`);
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("medirTempoDeExecucao", medirTempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
