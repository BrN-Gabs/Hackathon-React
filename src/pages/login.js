import {Form, Button} from 'react-bootstrap';
import axios from 'axios';

const Login = ({usuarios}) => {

    constructor(props) {
        super(props);
        this.state = { email: '' };
    }
    
    handleChange = (event) => {
        this.setState({[event.target.email]: event.target.value});
    }
    
    handleSubmit = (event) => {

    }
        
    

    return (
      <>
        <Form className="container mt-3 mb-3" onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" placeholder="Digite seu e-mail" value={this.state.value} name="email" onChange={this.handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" value={this.state.value} name="senha" onChange={this.handleChange} />
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

export async function getServerSideProps(context) {

    const response = await axios.get(
      'Api - get/usuarios',
    );
    const usuarios = await response.data;
  
    return {
      props: {usuarios}, 
    };
}

export default Login;