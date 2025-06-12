import { toast } from 'react-toastify';

export const tratarErroAPI = (erro) => {
  if (erro.response) {
    // Erro com resposta do servidor
    if (erro.response.status === 400 && erro.response.data?.errors) {
      erro.response.data.errors.forEach(e => toast.error(`${e.campo}: ${e.mensagem}`));
      return;
    }
    switch (erro.response.status) {
      case 400:
        toast.error(erro.response.data?.error || 'Dados inválidos. Verifique as informações.');
        break;
      case 401:
        toast.error('Não autorizado. Faça login novamente.');
        break;
      case 403:
        toast.error('Você não tem permissão para esta ação.');
        break;
      case 404:
        toast.error('Recurso não encontrado.');
        break;
      case 500:
        toast.error('Erro interno do servidor. Tente novamente mais tarde.');
        break;
      default:
        toast.error('Ocorreu um erro inesperado.');
    }
  } else if (erro.request) {
    // Erro de requisição sem resposta
    toast.error('Sem resposta do servidor. Verifique sua conexão.');
  } else {
    // Erro antes da requisição
    toast.error('Erro ao processar a solicitação.');
  }

  // Logar erro para debugging
  console.error('Erro detalhado:', erro);
};