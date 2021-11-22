import {Navbar, Container, Nav} from 'react-bootstrap';
import axios from 'axios';
import Logo from '../images/logo.png';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';

export const Header = () => {

    const [categorias, getCategorias] = useState([]);

    useEffect(() => {
        axios.get('http://react.professorburnes.com.br/categoria').then((response)=> {
            getCategorias(response.data);
        })
    },[])


    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/"><img src={Logo}></img></Navbar.Brand>
                <Nav className="me-auto">
                    {categorias.map((data) => (
                        <Nav.Link href={`/categoria/${data.id}`} className="nav-link">
                            {data.categoria}
                        </Nav.Link>    
                    ))}
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            
        </>
    )
}

export const Footer = () => {
    return(
        <>
            <footer className="bg-dark">
                <p className="text-center" style={{color: 'white'}}>
                    Desenvolvido por Bruno Gabriel da Silva
                </p>
            </footer>
        </>
    )
}