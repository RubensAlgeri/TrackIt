import axios from 'axios';
import styled from 'styled-components';
import { useLocation } from "react-router-dom"
import { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'

import UserContext from "../contexts/UserContext";
import Topo from "./Topo"
import Rodape from "./Rodape";

export default function TelaHoje(){
    const DataHoje = dayjs().locale('pt-br').format('dddd, DD/MM')[0].toUpperCase() + dayjs().locale('pt-br').format('dddd, DD/MM').slice(1);
    const {state} = useLocation()
    console.log("habitos", state)
    const setUserData = useContext(UserContext).setUserData
    const {data, token} = state;
    const {image} = data;
    

    const [listaHabitosHoje, setListaHabitosHoje] = useState([])
    const [habitosClompletos, setHabitosClompletos] = useState(0)

    useEffect(() => {
        setUserData(state)
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }        
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, config)
        promise.then((resposta) => {
            setListaHabitosHoje(resposta.data);
        })
        promise.catch(()=>{alert('Erro, tente novamente mais tarde')})
    }, []);

    return(
        <>
        <Topo image={image}></Topo>
        <Habitos props={habitosClompletos}>
            <div>
                <p>{DataHoje}</p>
                {habitosClompletos>0?
                <em>67% dos hábitos concluídos</em>
                :
                <em>Nenhum hábito concluído ainda</em>}
            </div>
            {listaHabitosHoje.length>0? 
            listaHabitosHoje.map(habito=>{
                return(
                    <HabitosCriados>

                        <b>{habito.name}</b>
                        <h6>Sequência atual: 3 dias <br/>Seu recorde: 5 dias</h6>
                        <ion-icon name="checkbox"></ion-icon>
                    </HabitosCriados>
                )
            })
            :<em>Você não cadastrou nenhum hábito pra hoje. Adicione um hábito para começar a trackear!</em>}
        </Habitos>
        <Rodape></Rodape>
        </>
    )
}
const HabitosCriados = styled.div`
position: relative;
display: flex;
flex-wrap: wrap;
align-items: center;
width: calc(34000%/375);
min-width: 340px;
max-width: 500px;
height: 94px;
background-color: #FFFFFF;
border-radius: 5px;
margin: 0 18px 10px 18px;
b{
    position: absolute;
    left:15px;
    top: 13px;
    width: 208px;
    height: 25px;
    font-size: 19.976px;
    line-height: 25px;

    color: #666666;
}
h6{
    position: absolute;
    left:15px;
    top: 45px;
    width: 148px;
    height: 32px;
    font-size: 12.976px;
    line-height: 16px;

    color: #666666;
}
ion-icon{
    position: absolute;
    right:13px;
    top: 13px;
    font-size: 69px;
    color: #EBEBEB;
    color: #8FC549;
    border: #E7E7E7;
}
`
const Habitos = styled.div`
width: 100vw;
margin-top: 98px;
display: flex;
align-items: center;
flex-wrap: wrap;
div{
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
div p{
    width: 100vw;
    margin-left: 17px;
    font-size: 22.976px;
    line-height: 29px;

    color: #126BA5;
}
div em{
    margin-top: 0;
    width: 100vw;
    margin-left: 17px;
    font-size: 17.976px;
    line-height: 22px;

    color: ${(props)=>props.habitosClompletos>0?"#8FC549":"#BABABA"};
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