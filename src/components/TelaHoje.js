import axios from 'axios';
import styled from 'styled-components';
import { useLocation } from "react-router-dom"
import { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'

import UserContext from "../contexts/UserContext";
import Topo from "./Topo"
import Rodape from "./Rodape";

export default function TelaHoje() {
    const DataHoje = dayjs().locale('pt-br').format('dddd, DD/MM')[0].toUpperCase() + dayjs().locale('pt-br').format('dddd, DD/MM').slice(1).replace("-feira", "");
    // const { state } = useLocation()
    // console.log("habitos", state)
    const setUserData = useContext(UserContext).setUserData
    const userData = useContext(UserContext).userData
    const setPorcentagem = useContext(UserContext).setPorcentagem
    const porcentagem = useContext(UserContext).porcentagem
    const { data, token } = userData;
    const { image } = data;
    console.log("token ", token)


    const [listaHabitosHoje, setListaHabitosHoje] = useState([])
    const [habitosCompletos, setHabitosCompletos] = useState(0)
    // const [porcentagem, setPorcentagem] = useState(habitosCompletos / listaHabitosHoje.length * 100)

    setPorcentagem(Math.round(habitosCompletos / listaHabitosHoje.length * 100))

    useEffect(() => {
        // setUserData(state)
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, config)
        promise.then((resposta) => {
            setListaHabitosHoje(resposta.data);
            setHabitosCompletos(resposta.data.filter(habito => { return habito.done }).length)
        })
        promise.catch(() => { alert('Erro, tente novamente mais tarde') })
    }, []);

    function atualizarHabito(status, id) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        if (status) {
            const promessa = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, config)
            promessa.then(() => {
                setHabitosCompletos(habitosCompletos - 1)
                console.log("desmarca ", habitosCompletos)
                const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, config)
                promise.then((resposta) => {
                    setListaHabitosHoje(resposta.data);
                    setHabitosCompletos(resposta.data.filter(habito => { return habito.done }).length)
                })
                promise.catch(() => { alert('Erro, tente novamente mais tarde') })

            })
            promessa.catch(err => {
                console.log("erro ", err.response)
                alert(err.response.data.message)
            })
        } else {
            const promessas = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {}, config)
            promessas.then(() => {
                setHabitosCompletos(habitosCompletos + 1)
                console.log("marca ", habitosCompletos)
                const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, config)
                promise.then((resposta) => {
                    setListaHabitosHoje(resposta.data);
                    setHabitosCompletos(resposta.data.filter(habito => { return habito.done }).length)
                })
                promise.catch(() => { alert('Erro, tente novamente mais tarde') })
            })
            promessas.catch(err => {
                console.log("erro ", err.response)
                alert(err.response.data.message)
            })
        }
    }

    return (
        <>
            <Topo image={image}></Topo>
            <HabitosHoje completos={porcentagem}>
                <div>
                    <p>{DataHoje}</p>
                    {habitosCompletos > 0 ?
                        <em>{porcentagem}% dos hábitos concluídos</em>
                        :
                        <em>Nenhum hábito concluído ainda</em>}
                </div>
                {listaHabitosHoje.length > 0 ?
                    listaHabitosHoje.map(habito => {
                        return (
                            <HabitosCriados sequencia={habito.currentSequence} recorde={habito.highestSequence} feito={habito.done}>

                                <h4>{habito.name}</h4>
                                <h6>Sequência atual: <b className='sequencia'>{habito.currentSequence} dias</b> <br />Seu recorde: <b className='recorde'>{habito.highestSequence} dias</b></h6>
                                <ion-icon onClick={() => atualizarHabito(habito.done, habito.id)} name="checkbox"></ion-icon>
                            </HabitosCriados>
                        )
                    })
                    : <em>Você não cadastrou nenhum hábito pra hoje. Adicione um hábito para começar a trackear!</em>}
            </HabitosHoje>
            <Rodape porcentagem={porcentagem}></Rodape>
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
h4{
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
.sequencia{
    color: ${props => props.feito ? "#8FC549" : "#666666"};
}
.recorde{
    color: ${props => props.feito && props.sequencia == props.recorde ? "#8FC549" : "#666666"};
}
ion-icon{
    position: absolute;
    right:13px;
    top: 13px;
    font-size: 69px;
    color: ${(props) => props.feito ? "#8FC549" : '#EBEBEB'};
    border: #E7E7E7;
}
`
const HabitosHoje = styled.div`
width: 100vw;
margin-top: 98px;
margin-bottom: 101px;
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

    color: ${(props) => props.completos > 0 ? "#8FC549" : "#BABABA"};
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