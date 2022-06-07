class NegociacaoController {

  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._ordemAtual = '';

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adicionar', 'esvazia', 'ordena', 'inverteOrdem'
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'texto'
    );
  }

  adicionar(event) {
    event.preventDefault();

    try {
      let negociacao = this._criaNegociacao();
      this._listaNegociacoes.adicionar(negociacao);
      this._mensagem.texto = 'Negociacao adicionada com sucesso';
      this._limparFormulario();
    } catch (erro) {
      this._mensagem.texto = erro;
    }
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  _limparFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = 'Negociações apagadas com sucesso';
  }

  importarNegociacoes() {

    let negociacoesService = new NegociacoesService();
    negociacoesService
      .obterNegociacoes()
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
        this._mensagem.texto = 'Negociações do período importadas com sucesso';
      })
      .catch(error => this._mensagem.texto = error);

  }

  ordena(coluna) {
    if (this._ordemAtual == coluna) {
      this._listaNegociacoes.inverteOrdem();
    } else {
      this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }
    this._ordemAtual = coluna;
  }
}