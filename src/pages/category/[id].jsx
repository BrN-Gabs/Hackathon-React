import { Container } from "@chakra-ui/react";
import api from "../../services/api";
import {GridProdutos} from "../../components/main";

function Category ({produtos}) {
  return(  
    <>{produtos ?
        <Container maxW='container.md'>
        <GridProdutos produtos={produtos}/>
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
  const response = await api.get('/product/category/'+id);  
  const produtos = await response.data;

  return {
    props: {produtos}, 
  }
   
}
export default Category;