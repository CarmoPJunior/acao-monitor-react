
import api from '../../../services/api';

export const getAcoes = async (setAcoes) => {

    await api.get('acoes/getfulldata/')
      .then(response => {      
        setAcoes(response.data);     
      }).catch(error => {
        console.log(error);        
      });
  
}

export const getTotalInvestido = async (setTotalInvestido) => {

  await api.get('investimento/totalInvestido/')
    .then(response => {      
      setTotalInvestido(response.data);   
      
      console.log(response.data);
    }).catch(error => {
      console.log(error);        
    });

}

export const getTotalPosicaoAtual = async (setTotalPosicaoAtual) => {

  await api.get('acoes/totalPosicaoAtual')
    .then(response => {      
      setTotalPosicaoAtual(response.data);   
      
      console.log(response.data);
    }).catch(error => {
      console.log(error);        
    });

}