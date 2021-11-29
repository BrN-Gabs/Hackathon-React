import { Container } from "@chakra-ui/react";
import api from "../services/api";
import {CarouselProduct, GridProdutos} from "../components/main";

function CategoryIndex ({produtos}) {
  
  return(
    <>
      <Container>
      <CarouselProduct />
      <GridProdutos produtos={produtos} />
      </Container>
    </>
  );      
}

export async function getServerSideProps(context) {

  const response = await api.get('/product');
  const produtos = await response.data;

  return {
    props: {produtos}, 
  };
}

export default CategoryIndex;