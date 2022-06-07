class ListaNegociacoes {
  constructor() {
    this._listaNegociacoes = [];
  }

  adicionar(negociacao) {
    this._listaNegociacoes.push(negociacao);
  }

  esvazia() {
    this._listaNegociacoes = [];
  }

  ordena(criterio) {
    this._listaNegociacoes.sort(criterio);
  }

  inverteOrdem() {
    this._listaNegociacoes.reverse();
  }

  get negociacoes() {
    return [].concat(this._listaNegociacoes);
  }

  get volumeTotal() {
    return this._listaNegociacoes.reduce((total, n) => total + n.volume, 0.0);
  }
}