

export const formatCurrency = (data) =>{

    return Intl.NumberFormat('pt-BR'
              , {style: 'currency', currency: 'BRL'})
              .format(data);

}

export const formatDecimal = (data) =>{

    return Intl.NumberFormat('pt-BR'
    , {style: 'decimal',   minimumFractionDigits: 2})
    .format(data);
}