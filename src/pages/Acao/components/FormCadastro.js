import React, {useState , useEffect }  from 'react';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
    descricao: yup.string().required(),
    sigla: yup.string().required(),
    tipoInvestimento:yup.object().shape({
          id: yup.number().positive().integer().required(),
        }),
  });


export default function FormCadastro(props){

    const { register, handleSubmit, errors, reset } = useForm({
        resolver: yupResolver(schema),
    });    
   
    return (

        <form onSubmit={handleSubmit(props.onSubmit)}>        

            {errors && 

              <div className="alert alert-warning alert-dismissible fade show" role="alert">

                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>       

            }
          
            <div className="form-row">

              <input  id="txtId"
                      name="id"                       
                      defaultValue={props.acao.id}
                      ref={register}
                      type="hidden" />

              <div className="form-group col-md-4">

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

                <label htmlFor="txtPorcentagem">Porcentagem</label>

                {/* <CurrencyFormat id="txtValorCompra"   
                                  value={valorCompra.formattedValue} 
                                  name="valorCompra"                                
                                  thousandSeparator={true} 
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  className={`form-control form-control-sm`}
                                  onValueChange={(values) => setValorCompra(values)}
                                  /> */}porcentagemBase

                <input  id="txtPorcentagemBase"
                        name="porcentagemBase"
                        placeholder="Porcentagem" 
                        defaultValue={props.acao.porcentagemBase}
                        ref={register}
                        className={`form-control form-control-sm `}  />

                </div>

            </div>


            <div className="form-row">

                <div className="form-group col-md-2 offset-md-8">

                    <button  type="submit" className="btn btn-success btn-sm" >
                        Salvar
                    </button>

                </div>

                <div className="form-group col-md-2 ">

                    <button type="button" 
                            className="btn btn-primary btn-sm" 
                            onClick={props.handleClose}>
                        Close
                    </button>

                </div>

            </div>

        </form>

    );

}