import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header, Footer, HeaderAdmin, FooterAdmin} from '../components/main';
import {useRouter} from "next/router";
import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const page = router.pathname;

    if (page == "/admin" || page == "/admin/categorias" || page == "/admin/produtos" || page == "/admin/empresas") {
      return <>
          <HeaderAdmin></HeaderAdmin>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
          <FooterAdmin></FooterAdmin>
      </>
    } else {
      return <>
        <Header></Header>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
        <Footer></Footer>
      </>
    }  
  
}

export default MyApp
