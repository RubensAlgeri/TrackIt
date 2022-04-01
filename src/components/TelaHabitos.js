import axios from 'axios';
import styled from 'styled-components';
import { useLocation } from "react-router-dom"
import { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';

import UserContext from "../contexts/UserContext";
import Topo from "./Topo"
import Rodape from "./Rodape";

export default function TelaHabitos() {
    const [listaHabitos, setListaHabitos] = useState([])
    const userData = useContext(UserContext).userData
    const { state } = useLocation()
    const { data, token } = state;
    const { image } = data;
    const [dias, setDias] = useState([]);
    const [semana, setSemana] = useState([{ dia: "D", numero: 0 }, { dia: "S", numero: 1 }, { dia: "T", numero: 2 }, { dia: "Q", numero: 3 }, { dia: "Q", numero: 4 }, { dia: "S", numero: 5 }, { dia: "S", numero: 6 }])

    const [criarHabito, setCriarHabito] = useState(false)
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
        promise.catch(() => { alert('Erro, tente novamente mais tarde') })
    }, []);

    function criarHabitos(event) {
        event.preventDefault();
    }

    function selecioneiDia(numero, selecionado) {
        semana[numero].selecionado = selecionado;

        if (dias.length > 0 && dias.join(' ').includes(numero)) setDias(dias.filter(dias => { return dias !== numero }));
        else {
            setDias([...dias, numero]);
        }
    }

    function removerHabito(idHabito){
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promessa = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}`)
    }
    return (
        <>
            <Topo image={image}></Topo>
            <Habitos>
                <div>
                    <p>Meus Hábitos</p>
                    <small onClick={() => setCriarHabito(true)}>+</small>
                    {criarHabito ?
                        <Criacao>
                            <form >
                                <input type='text' required></input>
                                <div>
                                    {semana.map(dia => {
                                        return (
                                            <Semana escolhido={dia.selecionado}>
                                                <h5 onClick={() => selecioneiDia(dia.numero, !dia.selecionado)}>{dia.dia}</h5>
                                            </Semana>
                                        )
                                    })}
                                </div>
                                <p onClick={() => setCriarHabito(false)}>Cancelar</p>
                                <button type="submit">Salvar</button>
                            </form>
                        </Criacao>
                        :
                        <></>
                    }
                </div>
                {listaHabitos.length > 0 ?
                    listaHabitos.map(habito => {
                        return (
                            <Habito>

                                <h4>{habito.name}</h4>
                                <ion-icon onClick={()=>removerHabito(habito.id)} name="trash-outline"></ion-icon>
                                <div>
                                    {semana.map(dia => {
                                        return (
                                            <Semana escolhido={dia.selecionado}>
                                                <h5>{dia.dia}</h5>
                                            </Semana>
                                        )
                                    })}
                                </div>
                            </Habito>
                        )
                    })
                    : <em>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</em>}
            </Habitos>
            <Rodape></Rodape>
        </>
    )
}
const Semana = styled.div`
h5{
    width: 30px;
    height: 30px;

    background: ${props => props.selecionado ? "#CFCFCF" : "#ffffff"};
    border: 1px solid ${props => props.selecionado ? "#CFCFCF" : "#D5D5D5"};
    border-radius: 5px;

    font-size: 19.976px;
    line-height: 25px;
    text-align: center;
    
    color: ${props => props.selecionado ? "#ffffff" : "#DBDBDB"};
}
`
const Criacao = styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
margin: 20px 18px 10px 18px;
width: calc(34000%/375);
height: 180px;
background: #FFFFFF;
border-radius: 5px;
form{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
form div{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: start;
}
`

const Habito = styled.div`
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
    font-size: 19.976px;
    line-height: 25px;

    color: #666666;
}
ion-icon{
    position: absolute;
    right:10px;
    top: 11px;
    font-size: 20px;
    color: #666666;
}
div{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
}
`


const Habitos = styled.div`
width: 100vw;
margin-top: 98px;
display: flex;
align-items: center;
flex-wrap: wrap;
div{
    margin-bottom: 20px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}
div p{
    margin-left: 17px;
    font-size: 22.976px;
    line-height: 29px;

    color: #126BA5;
}
div small{
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