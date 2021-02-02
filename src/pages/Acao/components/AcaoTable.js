import React, {useState, useEffect } from 'react';
import {formatCurrency, formatDecimal} from '../../../utils/formatNumberUtil';
import {getAcoes} from '../../Acao/controllers';


export default function  AcaoTable(props) {

    const [acoes, setAcoes] =  useState([]);
    
    useEffect(() =>{

        getAcoes(setAcoes);
    
    }, []);

    return (

        <div className="table-responsive">
        
            <table className="table table-bordered table-striped table-hover table-sm">
                <thead className="thead-dark align-middle">
                <tr >
                    <th scope="col">#</th>
                    <th scope="col">Sigla</th>
                    <th scope="col">Valor Compra</th>
                    <th scope="col">Valor Atual</th>
                    <th scope="col">Lucro/Prejuizo</th>
                    <th scope="col">Qt</th>
                    <th scope="col">Total Compra</th>
                    <th scope="col">Total Atual</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">% Base</th>
                    <th scope="col">Lucro Unitário</th>
                    <th scope="col">Valor Venda</th>
                    <th scope="col">Ações</th>
                </tr>
                </thead>
                <tbody>

                    {acoes && acoes.length > 0 ? (

                        acoes.map(item =>(

                            <tr key={item.id} >
                                <th scope="row">{item.id}</th>
                                <td>{item.sigla}</td>
                                <td>{formatCurrency(item.valorCompraMedia)}</td>
                                <td>{formatCurrency(item.valorAtualCotacao)}</td>
                                <td>{formatCurrency(item.lucroPrejuizo)}</td>
                                <td>{item.qtAcoeCompradas}</td>
                                <td>{formatCurrency(item.valorCompraTotal)}</td>
                                <td>{formatCurrency(item.valorTotalCotacaoAtual)}</td>
                                <td>{item.tipoInvestimento.sigla}</td>
                                <td>{ formatDecimal(item.porcentagemBase)} %</td>
                                <td>{formatCurrency(item.previsaoLucro)}</td>
                                <td>{formatCurrency(item.valorVendaPrevisao)}</td>
                                <td > 

                                    <div className="d-flex justify-content-center">

                                        <div className="p-2" >
                                            <button className="btn btn-success btn-sm rounded"
                                                    onClick={() => {props.compraRow(item)}}>
                                                <i className="fa fa-shopping-cart"></i>
                                            </button> 
                                        </div>

                                        <div className="p-2" >
                                            <button className="btn btn-success btn-sm rounded"
                                                    onClick={() => {props.vendaRow(item)}}>
                                                <i className="fa fa-shopping-cart"></i>
                                            </button> 
                                        </div>
                                        
                                        <div className="p-2" >
                                            <button className="btn btn-warning btn-sm rounded"
                                                    onClick={() => {props.editRow(item)}}>
                                                <i className="fa fa-pencil-square-o"></i>
                                            </button> 
                                        </div>                                        
                                        
                                        <div className="p-2" >
                                            <button className="btn btn-danger btn-sm rounded"
                                                    onClick={() => props.deleteRow(item.id)}>
                                                <i className="fa fa-trash-o"></i>
                                            </button>
                                        </div>
                                        
                                    </div>
                                
                                </td>
                            </tr>               
                        ))

                    ) : 
                    (
                        <tr>
                            <td colSpan={10}>Nenhuma informação encontrada!</td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        
        </div>
        
    )

}