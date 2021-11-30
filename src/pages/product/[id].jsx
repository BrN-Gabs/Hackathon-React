import { Container } from "@chakra-ui/react";
import api from "../../services/api";
import {PageProduct} from "../../components/main";

function Product ({produto}) {
  return(  
    <>{produto ?
        <Container maxW='container.md'>
            <PageProduct produto={produto}/>
        </Container>
      :
        <Container maxW='container.md'>
            <p>Categoria sem Produtos</p>
        </Container>
      }
    </>
  );      
}

export async function getServerSideProps(context) {
  const {id} = context.query;
  const response = await api.get('/product/'+id);  
  const produto = await response.data;

  return {
    props: {produto}, 
  }
   
}
export default Product;