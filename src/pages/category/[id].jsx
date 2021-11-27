import api from "../../services/api";

function Category ({produtos}) {
  
  return(
    <>
      {produtos ?
        produtos.map((item) => (
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

  const response = await api.get(
    '/category/'+id,
  );
  const produtos = await response.data;

  return {
    props: {produtos}, 
  };
}

export default Category;