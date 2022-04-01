import axios from 'axios';
import styled from 'styled-components';
import React from 'react';
import {ThreeDots} from "react-loader-spinner"
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";

import logo from "../img/Logo.png"
import UserContext from '../contexts/UserContext';

export default function TelaLogin(){
    const [login, setLogin] = useState({email: "", password:""})
    const {email, password} = login;
    const [carregando, setCarregando] = useState(false)
    const setUserData = useContext(UserContext).setUserData
    

    const navigate = useNavigate();


    function logar(event){
        setCarregando(true);
        event.preventDefault();
        const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", {email, password})
        promessa.then(resposta=>{
            setCarregando(false)
            setUserData({data: resposta.data, token: resposta.data.token})
            navigate("/hoje",{
                state:{data: resposta.data, token: resposta.data.token},
            })
            
        })
        promessa.catch(err=>{
            setCarregando(false)
        })
    }

    return(
        <Login>
            <img src={logo} alt="Logo"/>
            <form onSubmit={logar}>
                {carregando ?
                    <>
                        <input disabled type="email" placeholder="email" value={login.email} onChange={(e)=>setLogin({email:e.target.value, password})} required></input>
                        <input disabled type="password" placeholder="senha" value={login.password} onChange={(e)=>setLogin({password:e.target.value, email})} required></input>
                        <button disabled><ThreeDots color="#FFFFFF" height={13} width={51}/></button>
                    </>
                    :
                    <>
                        <input type="email" placeholder="email" value={login.email} onChange={(e)=>setLogin({email:e.target.value, password})} required></input>
                        <input type="password" placeholder="senha" value={login.password} onChange={(e)=>setLogin({password:e.target.value, email})} required></input>
                        <button type="submit">Entrar</button>
                    </>
                }
            </form>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>

        </Login>
    )
}
const Login = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
width: auto;
height: 100vh;
form{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 500px;
}
img{
    margin-top: 68px;
    width: 180px;
    height: 178.38px;
}
input{
    width: 303px;
    height: 45px;
    margin-bottom: 6px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
}
input::placeholder{
    font-size: 19.976px;
    line-height: 25px;

    color: #DBDBDB;
}
input:disabled{
    background: #F2F2F2;
}
button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 303px;
    height: 45px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border: none;

    font-size: 20.976px;
    line-height: 26px;
    text-align: center;

    color: #FFFFFF;
}
button:disabled{
    opacity: 0.7;
}
`