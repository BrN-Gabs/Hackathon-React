import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import axios from 'axios';
import Logo from '../images/logo.png';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';

export const Header = () => {

    const [category, getCategory] = useState([]);

    useEffect(() => {
        axios.get('http://react.professorburnes.com.br/categoria').then((response)=> {
            getCategory(response.data);
        })
    },[])


    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/"><img src={Logo}></img></Navbar.Brand>
                <Nav className="me-auto">
                    {category.map((data) => (
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

export const HeaderAdmin = () => {
    return(
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/admin"><img src={Logo}></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="/admin">Admin</Nav.Link>
                            <NavDropdown title="Cadastro" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/admin/produtos">Produtos</NavDropdown.Item>
                                <NavDropdown.Item href="/admin/categorias">Categorias</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>    
            </Navbar>
        </>
    )
}

export const LoginVerification = () => {
    const router = useRouter();

    return () => router.push('/admin/');
}