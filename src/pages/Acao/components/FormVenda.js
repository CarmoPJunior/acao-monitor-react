import React, {useState, useEffect}  from 'react';
import CurrencyFormat from 'react-currency-format';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { useForm } from "react-hook-form";


const schema = yup.object().shape({
    descricao: yup.string().required(),
    sigla: yup.string().required(),
    tipoInvestimento:yup.object().shape({
        id: yup.number().positive().integer().required(),
      }),
    dataVenda: yup.string().required(),
    qtVendida: yup.number().positive().integer().required().min(1),
  });


export default function FormVenda(props){

    const { register, handleSubmit, errors, reset } = useForm({
        resolver: yupResolver(schema),
    });


    const [valorVenda, setValorVenda] = useState({formattedValue:'0', value:0});

    useEffect(() => {

        props.setValorVenda(valorVenda);

      }, [valorVenda]);     


    return ( 

        <form onSubmit={handleSubmit(props.onSubmit)}>            
            
            <div className="form-row">

                <input  id="txtId"
                        name="id"                       
                        defaultValue={props.acao.id}    
                        ref={register}                
                        type="hidden" />

                <div className="form-group col-md-4">                

                <label htmlFor="txtSigla">Sigla</label>

                <input  id="txtSigla"
                        name="sigla"
                        placeholder="Sigla" 
                        defaultValue={props.acao.sigla}
                        maxLength="5"
                        ref={register}
                        className={`form-control form-control-sm ${errors.sigla && "is-invalid"}`}  />

                        {errors.sigla && 
                          <div className="alert alert-danger sm">
                              {errors.sigla.message}
                          </div>
                        }
                        
                </div>

                <div className="form-group col-md-4">

                <label htmlFor="txtDescricao">Descrição</label>

                <input  id="txtDescricao"
                        name="descricao"
                        placeholder="Descrição" 
                        defaultValue={props.acao.descricao}
                        ref={register}
                        className={`form-control form-control-sm ${errors.descricao && "is-invalid"}`}  />

                </div>

                <div className="form-group col-md-4">

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

            </div>

            <div className="form-row">

                <div className="form-group col-md-4">

                <label htmlFor="txtValorCompra">Valor de Venda</label>

                <CurrencyFormat value={valorVenda.formattedValue} 
                                thousandSeparator={true} 
                                decimalScale={2}
                                fixedDecimalScale={true}
                                prefix={'R$ '} 
                                className={`form-control form-control-sm`}
                                onValueChange={(values) => setValorVenda(values)}/>

                </div>
                
                <div className="form-group col-md-4">

                    <label htmlFor="txtQtAcoes">Qt</label>

                    <input  id="txtQtAcoesVendida"
                            name="qtVendida" 
                            defaultValue={props.acao.qtVendida}
                            type="number"
                            ref={register}
                            className={`form-control form-control-sm ${errors.qtVendida && "is-invalid"}`}  />

                </div>

                <div className="form-group col-md-4">               

                    <label htmlFor="txtDataVenda">Data Venda</label>

                    <input  id="txtDataVenda" 
                            name="dataVenda"                                           
                            type="date"
                            ref={register}    
                            defaultValue={props.acao.dataVenda}
                            className={`form-control form-control-sm ${errors.dataVenda && "is-invalid"}`} />
                    
                </div>

            </div>

            <div className="form-row">


                <div className="form-group col-md-2 offset-md-8">

                    <button  type="submit" className="btn btn-success btn-sm" >
                        Vender
                    </button>

                </div>

                <div className="form-group col-md-2 ">

                    
                    <button type="button" 
                            className="btn btn-primary btn-sm" 
                            onClick={props.handleClose}>
                        Fechar
                    </button>

                </div>

            </div>

        </form>

    );

}