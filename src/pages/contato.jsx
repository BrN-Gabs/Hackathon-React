import emailjs from "emailjs-com";
import { AiFillInstagram, AiFillGithub } from "react-icons/ai";  
import { Container } from "@chakra-ui/layout";

function Contato() {

    function enviarEmail(e) {
        e.preventDefault();

        emailjs.sendForm('gmailMessage', 'template_8jl0cch', e.target, 'user_FxyIOIoulZf4dPssDCjE9')
        .then((result) => {
            alert("Mensagem enviada com sucesso!");
            
        }, (error) => {
            alert(error.message)
        });
        e.target.reset()
    }

    return(
        <Container maxW='container.xl'>
                <br />
                <h2 className="text-center" style={{fontSize: 30}}>Entre em Contato:</h2>
                <br />
                <div className="row">
                    <div className="col-12 col-md-10">
                        <form onSubmit={enviarEmail}>
                            <div className="row">
                                <div className="col-lg-8 col-sm-12 form-group mx-auto">
                                    <p className="textoEmail">Preencha o formulário abaixo ou envie um e-mail para: <a href="mailto:infinitystore@hotmail.com" title="E-mail">infinitystore@hotmail.com</a></p>
                                    <label>Nome:</label>
                                    <input type="text" autoFocus className="form-control" required placeholder="Digite seu nome" name="name"/>
                                </div>
                                <div className="col-lg-8 col-sm-12 form-group mx-auto">
                                    <label>E-mail:</label>
                                    <input type="email" className="form-control" required placeholder="Digite seu e-mail" name="email"/>
                                </div>
                                <div className="col-lg-8 col-sm-12 form-group mx-auto">
                                    <label>Mensagem:</label>
                                    <textarea className="form-control" cols="30" rows="8" required placeholder="Digite sua mensagem" name="message"></textarea>
                                </div>
                                <div className="col-lg-8 col-sm-12 mx-auto send">
                                    <input type="submit" className="btn btn-info" value="Enviar mensagem"></input>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 col-md-2">
                        <h3>Redes Sociais:</h3>
                        <p>
                            <AiFillInstagram size="25"></AiFillInstagram>
                            <a href="https://www.instagram.com/infinitystore/" className="icons" title="Instagram" target="_blank">@infinitystore</a>
                            <br/>
                            <AiFillGithub size="25"></AiFillGithub>
                            <a href="https://github.com/BrN-Gabs" className="icons" title="GitHub" target="_blank">BrN-Gabs</a>
                            <br/>
                            <AiFillGithub size="25"></AiFillGithub>
                            <a href="https://github.com/JoasVieira" className="icons" title="GitHub" target="_blank">JoasVieira</a>
                            <br/>
                            <AiFillGithub size="25"></AiFillGithub>
                            <a href="https://github.com/JaimeBaldin" className="icons" title="GitHub" target="_blank">JaimeBaldin</a>
                        </p>
                    </div>    
                </div>    
                <br/>
        </Container>
    )
}  

export default Contato;


    



