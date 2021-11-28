import api from "../../services/api";

function Category ({produtos}) {
  console.log(produtos);
  return(
    
    <>
      {produtos ?
        produtos.map((item) => (
          <h1>{item.name}</h1>
          
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
    '/product/'+id,
  );
  const produtos = await response.data;

  return {
    props: {produtos}, 
  };
}

export default Category;