import '../../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header, Footer } from '../components/main';

function MyApp({ Component, pageProps }) {
  return <>
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </>
}

export default MyApp
