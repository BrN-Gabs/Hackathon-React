import {Form, Button} from 'react-bootstrap';
import {InputForm, Validation} from '../components/main';
import {useEffect, useState} from 'react'
import { useRouter } from 'next/router';


const Login = () => {
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [errors, setErrors] = useState({email: null, senha: null});

  const router = useRouter();
 

  const isValidFormData = () => {
    if(!email) {
      setErrors({email: 'E-mail is required'});
      return false;
    }
  
    if(!senha) {
      setErrors({senha: 'Senha is required'});
      return false;
    }
  
    setErrors({});
    return true
  }


  async function handleLogin(e) {
    console.log(email, senha);
    e.preventDefault();

    isValidFormData();
    
    if (email == "teste@hotmail.com" && senha == "cavalo") {

      router.push('/admin/');

    } else {
      alert('Falha no login, email ou senha estão incorretos.');
    } 

  }

    return (
      <>
        <Form className="container mt-3 mb-3" onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <InputForm
                label="E-mail" 
                name="email" 
                type="email"
                placeholder="Digite seu e-mail"
                value={email} 
                error={errors.email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <InputForm
                label="Senha" 
                name="senha" 
                type="password"
                placeholder="Digite sua senha"
                value={senha} 
                error={errors.senha}
                onChange={e => setSenha(e.target.value)}
              />
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