import axios from 'axios';
import styled from 'styled-components';
import { useLocation } from "react-router-dom"
import { useState, useEffect, useContext } from 'react';
import {ThreeDots} from "react-loader-spinner"
import dayjs from 'dayjs';

import UserContext from "../contexts/UserContext";
import Topo from "./Topo"
import Rodape from "./Rodape";

export default function TelaHabitos() {
    const [listaHabitos, setListaHabitos] = useState([])
    const userData = useContext(UserContext).userData
    const porcentagem = useContext(UserContext).porcentagem
    const { data, token } = userData;
    const { image } = data;
    const [dias, setDias] = useState([]);
    const [semana, setSemana] = useState([{ dia: "D", numero: 0 }, { dia: "S", numero: 1 }, { dia: "T", numero: 2 }, { dia: "Q", numero: 3 }, { dia: "Q", numero: 4 }, { dia: "S", numero: 5 }, { dia: "S", numero: 6 }])

    const [criarHabito, setCriarHabito] = useState(false)
    const [nomeHabito, setNomeHabito] = useState('')
    const [carregando, setCarregando] = useState(false)
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
        setCarregando(true)

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        if (dias.length > 0) {
            const promessa = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, { name: nomeHabito, days: dias }, config)
            promessa.then(() => {
                const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, config)
                promise.then((resposta) => {
                    setCriarHabito(false)
                    setCarregando(false)
                    setDias([])
                    setNomeHabito("")
                    setSemana([{ dia: "D", numero: 0 }, { dia: "S", numero: 1 }, { dia: "T", numero: 2 }, { dia: "Q", numero: 3 }, { dia: "Q", numero: 4 }, { dia: "S", numero: 5 }, { dia: "S", numero: 6 }])
                    setListaHabitos(resposta.data);
                })
                setCarregando(false)
                promise.catch(() => { alert('Erro, tente novamente mais tarde') })
            })
        } else { alert("Selecione ao menos um dia da semana para aplicar o hábito") }
    }

    function selecioneiDia(numero, selecionado) {
        semana[numero].selecionado = selecionado;

        if (dias.length > 0 && dias.join(' ').includes(numero)) setDias(dias.filter(dias => { return dias !== numero }));
        else {
            setDias([...dias, numero]);
        }
    }

    function removerHabito(idHabito) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promessa = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}`, config)
        promessa.then(() => {
            const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, config)
            promise.then((resposta) => {
                setListaHabitos(resposta.data);
            })
            promise.catch(() => { alert('Erro, tente novamente mais tarde') })
        })
    }
    function cancelar() {
        setCriarHabito(false)
        setDias([])
        setNomeHabito("")
        setSemana([{ dia: "D", numero: 0 }, { dia: "S", numero: 1 }, { dia: "T", numero: 2 }, { dia: "Q", numero: 3 }, { dia: "Q", numero: 4 }, { dia: "S", numero: 5 }, { dia: "S", numero: 6 }])
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
                            {carregando ?
                                <form onSubmit={criarHabitos}>
                                    <input disabled type='text' placeholder='nome do hábito' value={nomeHabito} ></input>
                                    <div>
                                        {semana.map(dia => {
                                            return (
                                                <Semana selecionado={dia.selecionado}>
                                                    <h5 >{dia.dia}</h5>
                                                </Semana>
                                            )
                                        })}
                                    </div>
                                    <span >Cancelar</span>
                                    <button disabled><ThreeDots color="#FFFFFF" height={11} width={43}/></button>
                                </form>
                                :
                                <form onSubmit={criarHabitos}>
                                    <input type='text' placeholder='nome do hábito' value={nomeHabito} onChange={(e) => setNomeHabito(e.target.value)} required></input>
                                    <div>
                                        {semana.map(dia => {
                                            return (
                                                <Semana selecionado={dia.selecionado}>
                                                    <h5 onClick={() => selecioneiDia(dia.numero, !dia.selecionado)}>{dia.dia}</h5>
                                                </Semana>
                                            )
                                        })}
                                    </div>
                                    <span onClick={cancelar}>Cancelar</span>
                                    <button type="submit">Salvar</button>
                                </form>
                            }
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
                                <ion-icon onClick={() => removerHabito(habito.id)} name="trash-outline"></ion-icon>
                                <article>
                                    {semana.map(dia => {
                                        return (
                                            <Dia selecionado={habito.days.join(',').includes(dia.numero)}>
                                                <h5>{dia.dia}</h5>
                                            </Dia>
                                        )
                                    })}
                                </article>
                            </Habito>
                        )
                    })
                    : <em>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</em>}
            </Habitos>
            <Rodape porcentagem={porcentagem}></Rodape>
        </>
    )
}
const Dia = styled.div`
    margin-right: 4px;
    margin-top: 10px;
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
min-width: 340px;
max-width: 500px;
height: 180px;
background: #FFFFFF;
border-radius: 5px;
position: relative;
form{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: 19px;
}
form input{
    margin-bottom: 10px;
    width: 303px;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
}
form input::placeholder{
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
}
form input:disabled{
    background: #F2F2F2;
}
form span{
    position: absolute;
    bottom: 23px;
    right: 123px;
    margin-right: 23px;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;

    color: #52B6FF;
}
form button{
    position: absolute;
    bottom: 15px;
    right: 16px;
    width: 84px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border: none;

    font-size: 15.976px;
    line-height: 20px;
    text-align: center;

    color: #FFFFFF;
}
form button:disabled{
    opacity: 0.7;
    padding: auto;
}
form div{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: start;
    width: 246px;

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
article{
    margin-top: 10px;
    margin-left: 15px;
    width: 30px;
    height: 30px;
    display: flex;
    flex-wrap: nowrap;
}
`

const Habitos = styled.div`
width: 100vw;
margin-top: 98px;
margin-bottom: 91px;
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