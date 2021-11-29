import { Container } from "@chakra-ui/react";
import api from "../../services/api";
import {GridProdutos} from "../../components/main";
import { Link } from "@chakra-ui/layout";
import Image from 'react-bootstrap/Image';

function Category ({produtos}) {
  return(  
    <>{produtos ?
        <Container>
        <GridProdutos produtos={produtos}/>
        </Container>
      :
       <p>Categoria sem Produtos</p>
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