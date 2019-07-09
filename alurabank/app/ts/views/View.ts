export abstract class View<T> {

    protected _elemento: JQuery;
    private _escapar: boolean;

    constructor(seletor: string, escapar: boolean = false) {
        this._elemento = $(seletor);
        this._escapar = escapar;
    }

    update(modelo: T): void {

        const t1 = performance.now();

        let template = this.template(modelo);
        if(this._escapar)
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '');

        this._elemento.html(template);

        const t2 = performance.now();
        console.log(`O tempo de execução de update(modelo) é de ${t2 - t1} ms.`);
    }
    
    abstract template(modelo: T): string;
}
