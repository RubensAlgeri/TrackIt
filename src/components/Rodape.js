import { Link } from "react-router-dom";
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Rodape(props){
    const {porcentagem} = props;

    return(
        <>
            <Footer>
                <Link to="/habitos">Habitos</Link>
                <div>
                    <Link to="/hoje">
                        <CircularProgressbar value={porcentagem} text='Hoje' background={true} backgroundPadding={6}
                            styles={buildStyles({

                                pathColor: `#fff`,
                                textColor: '#ffffff',
                                trailColor: '#52B6FF',
                                backgroundColor: '#52B6FF'
                            })} />
                    </Link>
                </div>
                <Link to="/historico">Historico</Link>
        </Footer>
        </>
    )
}
const Footer = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: space-between;
position: fixed;
z-index: 2;
width: 100vw;
height: 70px;
bottom: 0;

background: #FFFFFF;
a{
    margin-left: 36px;
    margin-right: 31px;
    text-decoration: none;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;

    color: #52B6FF;
}
div{
    position: absolute;
    bottom: -39px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 91px;
    height: 91px;

    border-radius: 50%;
}
div a{
    margin: 0;
}
`