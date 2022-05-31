class ListaNegociacoes {
  constructor() {
    this._listaNegociacoes = [];
  }

  adicionar(negociacao) {
    this._listaNegociacoes.push(negociacao);
  }

  esvazia()   {
    this._listaNegociacoes = [];
  }

  get negociacoes() {
    return [].concat(this._listaNegociacoes);
  }
}