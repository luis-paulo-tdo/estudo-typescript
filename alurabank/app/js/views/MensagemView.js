class MensagemView extends View {
    update(modelo) {
        this._elemento.innerHTML = this.template(modelo);
    }
    template(modelo) {
        return `<p class="alert alert-info">${modelo}</p>`;
    }
}
