import axios from 'axios';
import styled from 'styled-components';
import { useLocation } from "react-router-dom"
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import Topo from "./Topo"
import Rodape from "./Rodape";

export default function TelaHabitos(){
    const [listaHabitos, setListaHabitos] = useState([])
    const {state} = useLocation()
    const {data} = state;
    const {image, token} = data;
    console.log("habitos", data)

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }        
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, config)
        promise.then((resposta) => {
            setListaHabitos(resposta.data);
        })
        promise.catch(()=>{alert('Erro, tente novamente mais tarde')})
    }, []);

    function criarHabito(){
        
    }

    return(
        <>
        <Topo image={image}></Topo>
        <Habitos>
            <div>
                <p>Meus Hábitos</p>
                <small onClick={criarHabito}>+</small>
            </div>
            {listaHabitos.length>0? 
            listaHabitos.map(habito=>{
                return(
                    <>
                        <p>{habito.name}</p>
                        <ion-icon name="trash-outline"></ion-icon>
                        <ion-icon name="checkbox"></ion-icon>
                    </>
                )
            })
            :<em>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</em>}
        </Habitos>
        <Rodape></Rodape>
        </>
    )
}
const Habitos = styled.div`
width: 100vw;
margin-top: 98px;
display: flex;
align-items: center;
flex-wrap: wrap;
div{
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
p{
    margin-left: 17px;
    font-size: 22.976px;
    line-height: 29px;

    color: #126BA5;
}
small{
    margin-right: 18px;
    width: 40px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4.63636px;
    font-size: 26.976px;
    line-height: 32px;
    text-align: center;
    justify-content: center;
    align-items: center;

    color: #FFFFFF;
}
em{
    width: calc(33800%/375);
    margin-left: 17px;
    margin-top: 28px;
    font-size: 17.976px;
    line-height: 22px;

    color: #666666;
}
`