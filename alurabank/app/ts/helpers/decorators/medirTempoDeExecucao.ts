export function medirTempoDeExecucao(emSegundos: boolean = false) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[]) {

            let unidade = 'ms';
            let divisor = 1;
            if(emSegundos) {
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
            console.log(`Tempo de Execução: ${(tempoFinal - tempoInicial)/divisor} ${unidade}`);

            return retorno;
        }
        return descriptor;
    }
}