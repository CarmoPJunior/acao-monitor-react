import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import api from '../../services/api';
import ModalCad from '../../components/forms/ModalCad'
import AcaoTable from './components/AcaoTable'; 
import FormCadastro from './components/FormCadastro';
import FormCompra from './components/FormCompra';
import FormVenda from './components/FormVenda';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import {getAcoes} from '../Acao/controllers';



export default function Acao() {

  const { reset } = useForm();

  const initialFormState = { 
    id: null,
    descricao: '',
    sigla: '', 
    valorCompra: 0, 
    valorAtualCotacao: 0,
    valorVenda: 0,
    qtAcoeCompradas: 0, 
    qtVendida: 0,
    tipoInvestimento :{id: null},
    valorCompraMedia: 0,
    valorCompraTotal: 0,
    porcentagemBase: 0,
    lucroPrejuizo: 0,

  }

  const [acao, setAcao] = useState(initialFormState);  
  const [acoes, setAcoes] =  useState([]);
  const [showCadastro, setShowCadastro] = useState(false);
  const [showVenda, setShowVenda] = useState(false);
  const [showCompra, setShowCompra] = useState(false);
  const [valorCompra, setValorCompra] = useState({formattedValue:'0', value:0});
  const [valorAtualCotacao, setValorAtualCotacao] = useState({formattedValue:'0', value:0});
  const [valorVenda, setValorVenda] = useState({formattedValue:'0', value:0});

  
  const handleShowCadastro = () => setShowCadastro(true);

  const handleCloseCadastro = () => {
    setShowCadastro(false);
    setAcao(initialFormState);
    reset();
  };

  const handleShowCompra = () => setShowCompra(true);

  const handleCloseCompra = () => {
    setShowCompra(false);
    setAcao(initialFormState);
    reset();
  };

  const handleShowVenda = () => setShowVenda(true);

  const handleCloseVenda = () => {
    setShowVenda(false);
    setAcao(initialFormState);
    reset();
  };


  const onSubmitCadastro = async(dados) =>{
    
    try {
            
      dados.valorCompra = valorCompra.value;
      dados.valorAtualCotacao = valorAtualCotacao.value;

      
      if(dados.id){

        await api.put(`acoes/${dados.id}`, dados)
                .then(response => {                      
                  alert(`Registro Atualizado, Id: ${response.data.id}`); 
                }).catch(error => {  
                    console.log(error.response);                      
                    console.log(error.response.data);    
                });

      }else{

        const response = await api.post('acoes', dados);
        alert(`Registro Salvo, Id: ${response.data.id}`);         
        reset();
        setValorCompra({formattedValue:'0', value:0});
        setValorAtualCotacao({formattedValue:'0', value:0});
      }

      getAcoes(setAcoes);
      
    } catch (error) {
        alert(`Erro ao tentar salvar, tente novamente!`);   
        console.log(error);
    }
    
  }

  const onSubmitVender = async(dados) =>{
    
    try {
      
      let acaoVendaTemp = {

        id: dados.id,
        valorVenda: valorVenda.value,
        qtVendida: dados.qtVendida,
        dataVenda: dados.dataVenda,
        acao: {id: dados.id}    

      }
           
      if(acaoVendaTemp.id){

        await api.post(`acoes/vender`, acaoVendaTemp)
                .then(response => {                      
                  alert(`Registro Salvo, Id: ${response.data.id}`); 
                }).catch(error => {  
                    console.log(error.response);                      
                    console.log(error.response.data);  
                    alert(`Erro ao tentar salvar, tente novamente!`);    
                });

      }

      getAcoes(setAcoes);
      
    } catch (error) {
        alert(`Erro ao tentar salvar, tente novamente!`);   
        console.log(error);
    }
    
  }

  const onSubmitComprar = async(dados) =>{
    
    try {
      

      console.log(dados);
      let acaoCompraTemp = {
        
        id: dados.id,
        valorCompra: valorCompra.value,
        qtComprada: dados.qtComprada,
        dataCompra: dados.dataCompra,
        acao: {id: dados.id}    

      }
      
      if(acaoCompraTemp.id){

        await api.post(`acoes/comprar`, acaoCompraTemp)
                .then(response => {                      
                  alert(`Registro Salvo, Id: ${response.data.id}`); 
                }).catch(error => {  
                    console.log(error.response);                      
                    console.log(error.response.data); 
                    alert(`Erro ao tentar salvar, tente novamente!`);     
                });

      }

      getAcoes(setAcoes);
      
    } catch (error) {
        alert(`Erro ao tentar salvar, tente novamente!`);   
        console.log(error);
    }
    
  }

  const  handleVenda = async (acaoTemp) => {

    setAcao(acaoTemp);    
    handleShowVenda();

  }

  const  handleCompra = async (acaoTemp) => {

    setAcao(acaoTemp);    
    handleShowCompra();

  }

  const  handleConfirmDelete = async (id) => {
    
      confirmAlert ({
        title: 'Confirma exclusão',
        message: 'Tem certeza que deseja excluir?',
        buttons: [
          {
            label: 'Sim',
            onClick: () => {  handleDelete(id);  }
          },
          {
            label: 'Não',            
          }
        ]
      });    

  }

  const  handleDelete = async (id) => {

    try {

      await api.delete(`acoes/${id}`);
      getAcoes(setAcoes);
      toast(`Registro Deletado, Id: ${id}`)

    } catch (error) {
      toast(`Erro ao Deletar, tente novamente!`);
    }

  }

  
  const handleEditRow = (acaoEdit) => {    

    setAcao(acaoEdit);    
    handleShowCadastro();

  }

  const notify = () => toast("Wow so easy !");
   
 
  return (    

    <div className="row">
      <div className="col-md-12">

        <div className="card">

          <div className="card-header ">

            <div className="d-flex">

              <div className="p-2 align-self-stretch" >
                <h5>Ações</h5>
              </div>

              <div className="p-2">
                <button className="btn btn-primary btn-sm rounded" 
                        onClick={handleShowCadastro}>
                  <i className="fa fa-plus"></i>
                </button>
              </div>

            </div>
            
          </div>

          <div className="card-body responsive">
            
            <AcaoTable  acoes={acoes} 
                        editRow={handleEditRow}  
                        deleteRow={handleConfirmDelete} 
                        compraRow={handleCompra}
                        vendaRow={handleVenda}/>

          </div>
        </div>

      </div>


      <div>
        <button onClick={notify}>Notify !</button>
        <ToastContainer />
      </div>
      

      {/* INICIO DO MODAL CADASTRO*/}

      <ModalCad   show={showCadastro} 
                  handleClose={handleCloseCadastro} 
                  title={'Cadastro de Ações'} >
                        
          <FormCadastro   acao={acao} 
                          onSubmit={onSubmitCadastro} 
                          handleClose={handleCloseCadastro} />
      </ModalCad>

       {/* FIM DO MODAL CADASTRO*/}


       {/* INICIO DO MODAL COMPRA*/}

      <ModalCad   show={showCompra} 
                  handleClose={handleCloseCompra} 
                  title={'Comprar Ações'} >
                        
          <FormCompra   acao={acao} 
                        onSubmit={onSubmitComprar} 
                        handleClose={handleCloseCompra} 
                        setValorCompra={setValorCompra}/>
      </ModalCad>

       {/* FIM DO MODAL COMPRA*/}


       

       {/* INICIO DO MODAL VENDA*/}

       <ModalCad    show={showVenda} 
                    handleClose={handleCloseVenda} 
                    title={'Venda de Ações'} >
                        
          <FormVenda    acao={acao} 
                        onSubmit={onSubmitVender} 
                        handleClose={handleCloseVenda} 
                        setValorVenda={setValorVenda}/>
      </ModalCad>

      
    </div>
  );
}

