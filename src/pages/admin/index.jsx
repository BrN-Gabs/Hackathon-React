import { 
   VStack,
   Box,
   StackDivider,
   Container,
   Link
} from "@chakra-ui/react"

function Home() {
    return(
        <>  
        <Container maxW='container.sm'>
            <br/>
            <h1 className="text-center" style={{fontSize: 30}}><b>Cadastro:</b></h1>
            <br/>
            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'
                >
                <Link href={'admin/categorias'} className="btn" style={{fontSize: 20, color: "white", textDecoration: "none", backgroundColor: "#820b89"}}>
                    <b>-------------  CATEGORIAS  ------------</b>   
                </Link>

                <Link href={'admin/empresas'} className="btn" style={{fontSize: 20, color: "white", textDecoration: "none", backgroundColor: "black"}}>
                    <b>-------------  EMPRESAS  ------------</b>   
                </Link>

                <Link href={'admin/produtos'} className="btn" style={{fontSize: 20, color: "white", textDecoration: "none", backgroundColor: "#00febf"}}>
                    <b>-------------  PRODUTOS  ------------</b>   
                </Link>
            </VStack>
            <br/>
        </Container>    
        </>
    )

} 
export default Home;