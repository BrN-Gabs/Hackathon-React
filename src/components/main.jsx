import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import api from "../services/api";
import Logo from '../images/logo.png';
import {useEffect, useState} from 'react';
import { 
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage
} from "@chakra-ui/react"

export const Header = () => {

    const [category, getCategory] = useState([]);

    useEffect(() => {
        api.get('/categoria').then((response)=> {
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
                                <NavDropdown.Item href="/admin/empresas">Empresas</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>    
            </Navbar>
        </>
    )
}

export const InputForm = ({ label, name, error = null, ...rest }) => {
    
    return (
    <FormControl marginY="1rem" isInvalid={!!error}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Input name={name} id={name} {...rest} />

        {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
        
    </FormControl>
    )
}

export const Verification = (email, senha, router) => {
    if (email == "teste@hotmail.com" && senha == "cavalo") {
      router.push('/admin/');
    } else {
      alert('Falha no login, email ou senha estão incorretos.');
    } 
}

export const formataValor = (valor) => {
    valor = parseFloat(valor);
    return valor.toLocaleString('pt-br', {style:'currency', currency:'BRL'});
}