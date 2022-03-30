import axios from 'axios';
import styled from 'styled-components';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import logo from "../img/Logo.png"

export default function TelaLogin(){
    return(
        <Login>
            <img src={logo} alt="Logo"/>
            <form>
                <input type="email" placeholder="email" required></input>
                <input type="password" placeholder="senha" required></input>
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
width: 100vw;
height: 100vh;
img{
    width: 180px;
    height: 178.38px;
}
input{
    width: 303px;
    height: 45px;
    margin: 0 700px;
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
    margin: 0 700px;
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