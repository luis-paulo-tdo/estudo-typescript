const controller = new NegociacaoController();

// Utilizando o jQuery.
$('.form').submit(controller.adiciona.bind(controller));
