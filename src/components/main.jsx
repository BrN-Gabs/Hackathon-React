import {Navbar, Container, Nav, Carousel} from 'react-bootstrap';
import api from '../services/api';
import logo from '../images/logo.png';
import firstmodel from '../images/firstmodel.png';
import secondmodel from '../images/secondmodel.png';
import thirdmodal from '../images/thirdmodal.png';
import {useEffect, useState} from 'react';
import { 
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Link,
    Select,
} from "@chakra-ui/react"
import {RiAdminFill} from 'react-icons/ri';
import Image from 'next/image';
import marcas from '../images/marcas.png';
import midia from '../images/midia.png';
import midia2 from '../images/midia2.png';

export const Header = () => {

    const [category, getCategory] = useState([]);

    useEffect(() => {
        api.get('/category').then((response)=> {
            getCategory(response.data);
        })
    },[])


    return(
        <>
            <Container>
                <Navbar style={{backgroundColor: "#ABD7D5"}}>
                    <Navbar.Brand href="/" style={{marginLeft: 15}}><Image src={logo} width="100" height="50"/></Navbar.Brand>
                    <Nav className="me-auto" style={{margin: "auto"}}>
                        {category.map((data) => (
                            <Nav.Link style={{color: "black", fontSize: 20}} href={`/category/${data.id}`} className="nav-link">
                                <b>{data.name}</b>
                            </Nav.Link>    
                            
                        ))}
                    </Nav>
                    <Nav.Link href="/contato" alt="Contato" className="nav-link" style={{color: "black", fontSize: 20}}><b>Contato</b></Nav.Link>
                    <Nav.Link href="/login" alt="Admin" className="float-end nav-link" style={{color: "black"}}><RiAdminFill size='30'/></Nav.Link>

                    
                </Navbar>
            </Container>
            
        </>
    )
}

export const Footer = () => {
    return(
        <> 
            <Container>
                <footer style={{backgroundColor: "#ABD7D5"}}>
                    <div className="text-center" style={{color: 'black'}}>
                        <br/>
                        <h1><b>Empresas associadas:</b></h1>
                        <Image src={marcas}/>
                        <hr/>
                        <br/>
                        <div className="row">    
                            <div className="col-10 col-md-5 m-auto">
                                <h2 style={{fontSize:20}}><b>Redes Sociais:</b></h2>
                                <br/>
                                    <div>
                                        <a href="https://www.instagram.com/infinitystore/" className="icons" title="Instagram" target="_blank">@infinitystore</a>
                                        <br/>
                                        <a href="https://github.com/BrN-Gabs" className="icons" title="GitHub" target="_blank">BrN-Gabs</a>
                                        <br/>
                                        <a href="https://github.com/JoasVieira" className="icons" title="GitHub" target="_blank">JoasVieira</a>
                                        <br/>
                                        <a href="https://github.com/JaimeBaldin" className="icons" title="GitHub" target="_blank">JaimeBaldin</a>
                                    </div>  
                                    <br/>
                                    <Image src={midia} />
                            </div>
                            <div className="col-12 col-md-5 m-auto">
                                <h2 style={{fontSize:20}}><b>Entre em contato:</b></h2>
                                <br/>
                                    <div>
                                        <p><b>Whatsapp:</b> (44) 9 8813-8899</p>
                                        <p><b>Email:</b> infinitystore@hotmail.com</p>
                                    </div>
                                    <br/>
                                    <Image src={midia2} />
                            </div> 
                        </div>   
                        <br/> 
                        <hr/>
                        <b>Desenvolvido por: Bruno Gabriel da Silva, Joás Vieira e Jaime Baldin</b>
                    </div>
                </footer>
            </Container>
            
        </>
    )
}

export const HeaderAdmin = () => {
    return(
        <>  
                <Navbar style={{backgroundColor: "#212529"}}>
                    <Container>
                        <Navbar.Brand href="/admin"><Image src={logo} width="100" height="50"/></Navbar.Brand>
                        <h1 style={{color: "white", fontSize: 20}}>Seja bem vindo ao Admin</h1>
                        <Nav.Link href="/" alt="Voltar" className="nav-link" style={{color: "white", fontSize: 20}}>Voltar ao Site</Nav.Link>
                    </Container>
                </Navbar>
        </>
    )
}

export const FooterAdmin = () => {
    return(
        <> 
                <footer style={{backgroundColor: "#212529"}}>
                    <div className="text-center" style={{color: 'white'}}>
                        <br/>
                        <h1><b>Empresas associadas:</b></h1>
                        <Image src={marcas}/>
                        <hr/>
                        <br/>
                        <div className="row">    
                            <div className="col-10 col-md-5 m-auto">
                                <h2 style={{fontSize:20}}><b>Redes Sociais:</b></h2>
                                <br/>
                                    <div>
                                        <a href="https://www.instagram.com/infinitystore/" className="icons" title="Instagram" target="_blank">@infinitystore</a>
                                        <br/>
                                        <a href="https://github.com/BrN-Gabs" className="icons" title="GitHub" target="_blank">BrN-Gabs</a>
                                        <br/>
                                        <a href="https://github.com/JoasVieira" className="icons" title="GitHub" target="_blank">JoasVieira</a>
                                        <br/>
                                        <a href="https://github.com/JaimeBaldin" className="icons" title="GitHub" target="_blank">JaimeBaldin</a>
                                    </div>  
                                    <br/>
                                    <Image src={midia} />
                            </div>
                            <div className="col-12 col-md-5 m-auto">
                                <h2 style={{fontSize:20}}><b>Entre em contato:</b></h2>
                                <br/>
                                    <div>
                                        <p><b>Whatsapp:</b> (44) 9 8813-8899</p>
                                        <p><b>Email:</b> infinitystore@hotmail.com</p>
                                    </div>
                                    <br/>
                                    <Image src={midia2} />
                            </div> 
                        </div>   
                        <br/> 
                        <hr/>
                        <b>Desenvolvido por: Bruno Gabriel da Silva, Joás Vieira e Jaime Baldin</b>
                    </div>
                </footer>
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

export const InputFormSelect = ({rota, label, name, error = null, ...rest }) => {
    
    const [data, getData] = useState([]);
    useEffect(() => {
        api.get(rota).then((response)=> {
            getData(response.data);
        })
    },[])


    return (
    <FormControl marginY="1rem" isInvalid={!!error}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Select placeholder="Selecione uma opção" name={name} id={name} {...rest}>
            {data.map(item => ( 
                <option value={item.id}>{item.name}</option>
            ))}
        </Select>

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

export const ValueFormat = (valor) => {
    valor = parseFloat(valor);
    return valor.toLocaleString('pt-br', {style:'currency', currency:'BRL'});
}

export const SearchForId = ({rota, id}) => {
    const [data, getData] = useState([]);
    useEffect(() => {
        api.get(rota+id).then((response)=> {
            getData(response.data);
        })
    },[])

    return String(data.name);
}

export const CarouselProduct = () => {
    return (
        <Container>
            <Carousel>
                <Carousel.Item>
                    <Image height="700" src={firstmodel} alt="Primeiro Slide" className="d-block w-100"/>
                </Carousel.Item>
                <Carousel.Item>
                    <Image height="700" src={secondmodel} alt="Primeiro Slide" className="d-block w-100"/>
                </Carousel.Item>
                <Carousel.Item>
                    <Image height="700" src={thirdmodal} alt="Primeiro Slide" className="d-block w-100"/>
                </Carousel.Item>
            </Carousel>
        </Container>
    )
}

export const GridProdutos = ({produtos}) => {
    return (
    <>
        <br/>
        <h1 className="text-center" style={{fontSize: 30}}><b>Produtos em Destaque:</b></h1>
        <div className="row">
                {produtos.map((item) => (
                    <div className="col-12 col-md-4 text-center mt-4">
                        <div className="card">
                         <Image width='300' height='300' src={'http://localhost:8080/product/image/' + (item.photo)} />
                            <h2><b>{item.name}</b></h2>
                                <div>
                                    Valor: <span style={{color: "#820b89"}}>
                                            <b>{ValueFormat(item.price)}</b>
                                        </span>
                                    <br/>  
                                </div>
                            <Link href={'/product/'+item.id} style={{textDecoration: "none"}} className="btn btn-info">
                                <b>Detalhes</b>
                            </Link>
                        </div>
                    </div>    
                ))}
        </div>
        <br/>
    </>       
    )
}

export const PageProduct = ({produto}) => {
    return(
    <>
        <br/>
            <div className="row">
                <div className="col-12 col-md-4 text-center">
                    <Image width='300' height='300' src={'http://localhost:8080/product/image/' + (produto.photo)} />
                        <br/>
                        <br/>
                        <div style={{fontSize: 30}}>
                            Valor: <span style={{color: "#820b89"}}>
                                        <b>{ValueFormat(produto.price)}</b>
                                    </span>
                                <br/>  
                        </div>
                    <hr/>
                </div>
                <div className="col-12 col-md-8">
                    <h1 style={{fontSize: 30}}><b>{produto.name}</b></h1>
                    <br/>
                    <h2 className="text-center">
                        <b>Descrição do Produto:</b>
                    </h2>
                    <p>{produto.description}</p>
                    <br/>
                    <h2 className="text-center">Vendido e Entregue por {SearchCompany(produto.company_id)}</h2>
                </div>    
            </div>
        <br/>
    </>
    )
    
}

export const SearchCompany = (id) => {
    const [data, getData] = useState([]);
    useEffect(() => {
        api.get('/company/'+id).then((response)=> {
            getData(response.data);
        })
    },[])

    return data.name;
}