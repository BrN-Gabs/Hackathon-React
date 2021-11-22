
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import {useEffect, useState} from 'react';

const Login = () => {

    const [logins, getLogins] = useState([]);

    useEffect(() => {
        axios.get('Api - get/login').then((response)=> {
            getLogins(response.data);
        })
    },[])



    return (
      <>
        <Form className="container mt-3 mb-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" placeholder="Digite seu e-mail" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Lembrar senha" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Entrar
            </Button>
        </Form>
      </>
    )
}

export default Login;