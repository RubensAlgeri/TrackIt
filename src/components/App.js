import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

import Reset from "../themes/Reset";
import Style from "../themes/Style"


import TelaCadastro from "./TelaCadastro"
import TelaLogin from "./TelaLogin"
import TelaHabitos from "./TelaHabitos"
import TelaHoje from "./TelaHoje"
import TelaHistorico from "./TelaHistorico"


export default function App(){
    return(
        <>
		<Reset />
        <Style />
        <BrowserRouter>
			<Routes>
				<Route path="/" element={<TelaLogin />} />
				<Route path="/cadastro" element={<TelaCadastro />} />
				<Route path="/habitos" element={<TelaHabitos />} />
				<Route path="/hoje" element={<TelaHoje />} />
				<Route path="/historico" element={<TelaHistorico />} />
			</Routes>
		</BrowserRouter>
        </>
    );
}