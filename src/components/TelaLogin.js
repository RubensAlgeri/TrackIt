import axios from 'axios';
import styled from 'styled-components';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from "../img/Logo.png"

export default function TelaLogin(){
    const [login, setLogin] = useState({email: "", password:""})
    const [token, setToken] = useState('')
    const {email, password} = login;


    function logar(event){
        event.preventDefault();
        const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", {email, password})
        promessa.then(resposta=>{
            console.log("deu bom", resposta.data)
            setToken(resposta.data.token)
        })
        promessa.catch(err=>{
            console.log('deu ruim', err.message)
        })
    }
    console.log(token)
    return(
        <Login>
            <img src={logo} alt="Logo"/>
            <form onSubmit={logar}>
                <input type="email" placeholder="email" value={login.email} onChange={(e)=>setLogin({email:e.target.value, password})} required></input>
                <input type="password" placeholder="senha" value={login.password} onChange={(e)=>setLogin({password:e.target.value, email})} required></input>
                <button type="submit">Entrar</button>
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
    width: auto;
}
img{
    margin-top: 68px;
    width: 180px;
    height: 178.38px;
}
input{
    width: 303px;
    height: 45px;
    margin: 0 500px;
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
button{
    margin: 0 500px;
    width: 303px;
    height: 45px;
    background: #52B6FF;
    border-radius: 4.63636px;

    font-size: 20.976px;
    line-height: 26px;
    text-align: center;

    color: #FFFFFF;
}
`