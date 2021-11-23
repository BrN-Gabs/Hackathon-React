import '../../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header, Footer, HeaderAdmin } from '../components/main';
import {useRouter} from "next/router";

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const page = router.pathname;

  if (page == "/admin" || page == "/admin/categorias" || page == "/admin/produtos") {
    return <>
      <HeaderAdmin></HeaderAdmin>
      <Component {...pageProps} />
      <Footer></Footer>
    </>
  } else {
    return <>
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </>
  }
  
}

export default MyApp
