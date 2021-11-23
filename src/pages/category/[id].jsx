import axios from "axios";

function Category ({product}) {
  
  return(
    <>
      {product ?
        product.map((item) => (
          <h1>{item.produto}</h1>
          
        ))
          
        :

        <p>Página não encontrada</p>
      }
    </>
  );      
}

export async function getServerSideProps(context) {

  const {id} = context.query;

  const response = await axios.get(
    'http://react.professorburnes.com.br/categoria/'+id,
  );
  const product = await response.data;

  return {
    props: {product}, 
  };
}

export default Category;