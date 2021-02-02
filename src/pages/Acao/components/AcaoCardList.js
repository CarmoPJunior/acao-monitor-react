import React, {useState, useEffect } from 'react';
import {formatCurrency, formatDecimal} from '../../../utils/formatNumberUtil';
import {getAcoes} from '../../Acao/controllers';


export default function AcaoCardList(props) {
    
    const [acoes, setAcoes] =  useState([]);
    
    useEffect(() =>{

        getAcoes(setAcoes);
    
    }, []);
    
    const verificarLucroPrejuizo =(valor) => {

        if(valor >0){
            return 'text-success';
        } else if(valor <0){
            return 'text-danger';
        }else{
            return 'text-muted';
        }

    }
    
    return (
    
    
        <div className="card text-center ">

            <div className="card-header">
                <h5 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">{props.title}</span>
                    <span className="badge bg-success rounded-pill text-white">3</span>
                </h5>
            </div>

                <ul className="list-group mb-3 list-group-flush">                       

                    { console.log(acoes)}

                        {acoes && acoes.length > 0 ? (

                            acoes.map(item =>(       

                                    <li  key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                                        
                                        <div className="text-left">
                                            <h6 className="my-0">{item.sigla}</h6>
                                            <small className="text-muted">Valor Compra: {formatCurrency(item.valorCompraMedia)}</small>                                            
                                        </div>

                                        <div className="text-right">  
                                            <h6 className="my-0 ">{formatCurrency(item.valorAtualCotacao)}</h6>
                                            <small className={`${verificarLucroPrejuizo(item.lucroPrejuizo)} `}>Lucro/Prejuíízo: <span>{formatDecimal(item.lucroPrejuizo)}</span></small>                                            
                                        </div>
                                       
                                       
                                    </li>           
                                
                                ))

                                ) : 
                                (
                                    
                                    <li colSpan={10}>Nenhuma informação encontrada!</li>
                                    
                                )
                            }
                </ul>           

            <div className="card-footer text-muted">
                2 days ago
            </div>

        </div>      

    )

}