class MensagemView extends View {

    update(modelo: string): void {
        this._elemento.innerHTML = this.template(modelo);
    }

    template(modelo: string) {
        return `<p class="alert alert-info">${modelo}</p>`;
    }
}