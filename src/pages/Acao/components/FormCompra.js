import React, {useState , useEffect }  from 'react';
import CurrencyFormat from 'react-currency-format';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Alert from 'react-bootstrap/Alert';

const schema = yup.object().shape({   
    sigla: yup.string().required(),
    dataCompra: yup.string().required(),    
    qtComprada: yup.number().positive().integer().required().min(1),
  });


export default function FormCompra(props){

    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState([]);

    const { register, handleSubmit, errors, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const [valorCompra, setValorCompra] = useState({formattedValue: props.acao.valorCompra, value: props.acao.valorCompra});
    
    useEffect(() => {

      props.setValorCompra(valorCompra);

    }, [valorCompra]);     

    useEffect(() => {

      if(Object.keys(errors).length !== 0){
        setShowAlert(true);
      }else{
        setShowAlert(false);
      }
      

    }, [errors]);     

    return (

        <form onSubmit={handleSubmit(props.onSubmit)}>  
         
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible show={showAlert}>
            <Alert.Heading>Erro</Alert.Heading>

              <ul>

                { Object.keys(errors).map(function(keyName, keyIndex) {

                  return (<li key={keyIndex}><span>{keyName}</span> - {errors[keyName].message}</li>);

                })}

              </ul>

          </Alert>
                  
            
              <input  id="txtId"
                      name="id"                       
                      defaultValue={props.acao.id}
                      ref={register}
                      type="hidden" />

              
              <div className="form-row">

                <div className="form-group col-md-6">

                  <label htmlFor="txtSigla">sigla</label>

                  <input  id="txtSigla"
                          name="sigla"
                          placeholder="Sigla" 
                          defaultValue={props.acao.sigla}
                          maxLength="5"
                          ref={register}
                          className={`form-control form-control-sm ${errors.sigla && "is-invalid"}`} />
                          {errors.sigla && 
                            <div className="alert alert-danger sm">
                                {errors.sigla.message}
                            </div>
                          }
                </div>    

              </div>       

              <div className="form-row">    

                <div className="form-group col-md-6">

                  <label htmlFor="txtTipoIvestimento">Tipo de Investimento</label>

                  <select id="txtTipoIvestimento" 
                          name="tipoInvestimento.id"
                          defaultValue={props.acao.tipoInvestimento.id}
                          ref={register}
                          className={`form-control form-control-sm ${errors.tipoInvestimento && "is-invalid"}`}>
                    <option value={0}>Selecione...</option>
                    <option value={1}>Fundo Imobiliário</option>
                    <option value={2}>Ação</option>
                  </select>
                </div>

                <div className="form-group col-md-6">

                  <label htmlFor="txtDataCompra">Data Compra</label>

                  <input  id="txtDataCompra" 
                          name="dataCompra"                                           
                          type="date"
                          ref={register}    
                          defaultValue={props.acao.dataCompra}
                          className={`form-control form-control-sm ${errors.dataCompra && "is-invalid"}`} />  

                </div>
                
              </div>
            
              <div className="form-row">

                <div className="form-group col-md-6">

                  <label htmlFor="txtValorCompra">Valor de Compra</label>

                  <CurrencyFormat id="txtValorCompra"   
                                  value={valorCompra.formattedValue} 
                                  name="valorCompra"                                
                                  thousandSeparator={true} 
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  prefix={'R$ '} 
                                  className={`form-control form-control-sm ${errors.sigla && "is-invalid"}`}
                                  onValueChange={(values) => setValorCompra(values)}
                                  />

                </div>

                <div className="form-group col-md-6">

                  <label htmlFor="txtQtAcoes">Qt</label>

                  <input  id="txtQtAcoes"
                          name="qtComprada" 
                          defaultValue={props.acao.qtComprada}
                          type="number"
                          ref={register}
                          className={`form-control form-control-sm ${errors.qtComprada && "is-invalid"}`} />

                </div>
                
              </div>              
                                                
            
            <div className="form-row">

                <div className="form-group col-md-6">

                    <button  type="submit" className="btn btn-success btn-sm form-control" >
                        Salvar
                    </button>

                </div>

                <div className="form-group col-md-6 ">

                    <button type="button" 
                            className="btn btn-primary btn-sm form-control" 
                            onClick={props.handleClose}>
                        Sair
                    </button>

                </div>

            </div>


  <div>
	


	</div>

        </form>

    );




}