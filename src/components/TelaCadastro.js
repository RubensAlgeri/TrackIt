import axios from 'axios';
import styled from 'styled-components';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/Logo.png"

export default function TelaCadastro(){
    const [cadastro, setCadastro] = useState({email: "", password:"", name:"", image:""})
    const {email, password, name, image} = cadastro;

    const navigate = useNavigate();

    function cadastrar(event){
        event.preventDefault();
        const promessa = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", {email, password, name, image});
        promessa.then(()=>{navigate("/")});
        promessa.catch((err)=>{console.log("deu ruim", err.message, err.response.data.message)});
    }

    return(
            <Cadastro>
                <img src={logo} alt="Logo"/>
                <form onSubmit={cadastrar}>
                    <input type="email" placeholder="email" value={cadastro.email} onChange={(e)=>setCadastro({email:e.target.value, password, name, image})} required></input>
                    <input type="password" placeholder="senha" value={cadastro.password} onChange={(e)=>setCadastro({password:e.target.value, email, name, image})} required></input>
                    <input type="text" placeholder="nome" value={cadastro.name} onChange={(e)=>setCadastro({name:e.target.value, email, password, image})} required></input>
                    <input type="url" placeholder="foto" value={cadastro.img} onChange={(e)=>setCadastro({image:e.target.value, email, password, name})} required></input>

                    <button type="submit">Cadastrar</button>
                </form>
                <Link to="/">Já tem uma conta? Faça login!</Link>
    
            </Cadastro>
        )
    }
const Cadastro = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    img{
        margin-top: 68px;
        width: 180px;
        height: 178.38px;
    }
    form{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 500px;
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
    button{
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