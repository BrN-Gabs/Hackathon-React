import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import { LoginVerification } from '../components/main';

const Login = (/* {usuarios} */) => {

    return (
      <>
        <Form className="container mt-3 mb-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" placeholder="Digite seu e-mail" name="email"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" name="senha"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Lembrar senha" />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={LoginVerification()}>
                Entrar
            </Button>
        </Form>
      </>
    )
}

/* export async function getServerSideProps(context) {

    const response = await axios.get(
      'Api - get/usuarios',
    );
    const usuarios = await response.data;
  
    return {
      props: {usuarios}, 
    };
} */


export default Login;