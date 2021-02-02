import React, {useState, useEffect} from 'react';
import AcaoCardList from '../Acao/components/AcaoCardList';
import {getTotalInvestido, getTotalPosicaoAtual} from '../../pages/Acao/controllers';
import {formatCurrency} from '../../utils/formatNumberUtil';


export default function Home() {

    const [totalInvestido, setTotalInvestido] = useState(0); 
    const [totalPosicaoAtual, setTotalPosicaoAtual] = useState(0); 
    // const [lucroPrejuizo, setLucroPrejuizo] = useState(0); 

    useEffect(() =>{

        getTotalInvestido(setTotalInvestido);
        getTotalPosicaoAtual(setTotalPosicaoAtual);

        
    
    }, []);    

    const calcLucroPrejuizo = () => {return (totalPosicaoAtual - totalInvestido)};


    return (    

        <>

            {/* Início da Linha dos status */}

            <div className="row p-3">

                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <div className="media d-flex">
                                    <div className="align-self-center">
                                        <h1><span class="badge badge-success rounded">$</span></h1>
                                    </div>
                                    <div className="media-body text-right">
                                        <h3 className="text-success">{formatCurrency(totalInvestido)}</h3>
                                        <span>Total Investido</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <div className="media d-flex">
                                    <div className="media-body text-left">
                                        <h3 className="text-success">{formatCurrency(totalPosicaoAtual)}</h3>
                                        <span>Posição Atual</span>
                                    </div>
                                    <div className="align-self-center">
                                        <h1><span class="badge badge-success rounded">$</span></h1>
                                    </div>
                                </div>                        
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card">
                    <div className="card-content">
                        <div className="card-body">
                        <div className="media d-flex">
                            <div className="media-body text-left">
                            <h3 className="text-success">{formatCurrency(calcLucroPrejuizo())}</h3>
                            <span>Lucro/Prejuízo</span>
                            </div>
                            <div className="align-self-center">
                            <i className="icon-cup success font-large-2 float-right"></i>
                            </div>
                        </div>
                        <div className="progress mt-1 mb-0" style={{height: "7px"}} >
                            <div className="progress-bar bg-success" role="progressbar" style={{width: "60%"}} ></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

            </div>

            {/* Fim da Linha dos status */}


            {/* Início da Linha dos cardlist*/}

            <div className="row">
              
                <div className="col-md-4">             
        
                    <div className="col-md-12 col-lg-12 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Your cart</span>
                        <span className="badge bg-secondary rounded-pill">3</span>
                        </h4>
                        <ul className="list-group mb-3">
                        <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                            <h6 className="my-0">Product name</h6>
                            <small className="text-muted">Brief description</small>
                            </div>
                            <span className="text-muted">$12</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-sm bg-success text-white">
                            <div>
                            <h6 className="my-0">Second product</h6>
                            <small className=" text-white">Brief description</small>
                            </div>
                            <span className="text-white">$8</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                            <h6 className="my-0">Third item</h6>
                            <small className="text-muted">Brief description</small>
                            </div>
                            <span className="text-muted">$5</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between bg-light">
                            <div className="text-success">
                            <h6 className="my-0">Promo code</h6>
                            <small>EXAMPLECODE</small>
                            </div>
                            <span className="text-success">−$5</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between ">
                            <span>Total (USD)</span>
                            <strong>$20</strong>
                        </li>
                        </ul>
                
                        <form className="card p-2">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Promo code"/>
                            <button type="submit" className="btn btn-secondary">Redeem</button>
                        </div>
                        </form>
                    </div>
        

                </div>

                <div className="col-md-4">     
                    <AcaoCardList  title={"Ações Compradas"} />
                </div>


            </div>


            {/* Fim da Linha dos cardlist */}

        </>
    );
}
    