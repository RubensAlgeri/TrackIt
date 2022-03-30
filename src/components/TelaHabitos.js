import { useLocation } from "react-router-dom"
import Topo from "./Topo"

export default function TelaHabitos(){

    const {state} = useLocation()
    const {data} = state;
    const {image, token} = data;
    console.log("habitos", data)
    return(
        <>
        <Topo image={image}></Topo>
        </>
    )
}