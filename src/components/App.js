import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

import Reset from "../themes/Reset";
import Style from "../themes/Style"

import UserContext from "../contexts/UserContext";
import TelaCadastro from "./TelaCadastro"
import TelaLogin from "./TelaLogin"
import TelaHabitos from "./TelaHabitos"
import TelaHoje from "./TelaHoje"
import TelaHistorico from "./TelaHistorico"


export default function App(){
	const [userData, setUserData] = React.useState([])
	const [porcentagem, setPorcentagem] = React.useState(0);
    return(
        <>
		<Reset />
        <Style />
			<BrowserRouter>
				<UserContext.Provider value={{ userData, setUserData, porcentagem, setPorcentagem}}>
					<Routes>
						<Route path="/" element={<TelaLogin />} />
						<Route path="/cadastro" element={<TelaCadastro />} />
						<Route path="/habitos" element={<TelaHabitos />} />
						<Route path="/hoje" element={<TelaHoje />} />
						<Route path="/historico" element={<TelaHistorico />} />
					</Routes>
				</UserContext.Provider>
			</BrowserRouter>
        </>
    );
}