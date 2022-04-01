import axios from 'axios';
import styled from 'styled-components';
import { useLocation } from "react-router-dom"
import { useState, useEffect, useContext } from 'react';

import UserContext from "../contexts/UserContext";
import Topo from "./Topo"
import Rodape from "./Rodape";

export default function TelaHistorico(){

    const setUserData = useContext(UserContext).setUserData
    const userData = useContext(UserContext).userData
    const { data, token } = userData;
    const { image } = data;
    const porcentagem = useContext(UserContext).porcentagem

    const [listaHistorico, setListaHistorico] = useState([])

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily`, config)
        promise.then((resposta) => {
            setListaHistorico(resposta.data);
        })
        promise.catch(() => { alert('Erro, tente novamente mais tarde') })
    }, []);
    return(
        <>
        <Topo image={image}></Topo>
        <Historico>
            <p>Historico</p>
            <small>Em breve você poderá ver o histórico dos seus hábitos aqui!</small>
        </Historico>
        <Rodape porcentagem={porcentagem}></Rodape>
        </>
    )
}
const Historico = styled.div`
margin-top: 98px;
margin-left: 17px;
p{ 
    font-size: 22.976px;
    line-height: 29px;

    color: #126BA5;
    margin-bottom: 17px;
}
small{
    font-size: 17.976px;
    line-height: 22px;

    color: #666666;
}
`