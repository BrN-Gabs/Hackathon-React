import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';


function Categoria () {

  const router = useRouter();
  const id = router.query.id;

  const [produtos, getProdutos] = useState([]);

  useEffect(()=>{
      axios.get('http://react.professorburnes.com.br/categoria/'+id).then((response)=>{
          getProdutos(response.data);
      })
  }, [id])

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

export default Categoria;