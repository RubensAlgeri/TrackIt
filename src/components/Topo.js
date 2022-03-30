import axios from 'axios';
import styled from 'styled-components';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Rodape from './Rodape';

export default function Topo(props){
    const {image} = props;
    return(
        <NomeApp>
            <p>TrackIt</p>
            <img src={image} alt="foto de perfil"/>
        </NomeApp>
    )
}
const NomeApp = styled.div`
position: fixed;
top: 0;
width: 100vw;
height: 70px;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: space-between;
background: #126BA5;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
p{
    margin-left: 18px;
    font-family: 'Playball', cursive;
    font-size: 38.982px;
    line-height: 49px;
    color: #FFFFFF;
}
img{
    margin-right: 9px;
    border-radius: 98.5px;
    width: 51px;
    height: 51px;
}
`
