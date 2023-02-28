import logo from './logo.svg';
import './App.css';
import Header from './Component/Layout/Header'
import Footer from './Component/Layout/Footer';
import MenuLeft from './Component/Layout/MenuLeft';
import MenuAcc from './Component/Layout/MenuAcc';
import { useLocation } from 'react-router-dom';
import { ProductProvide } from './Context/Context';

function App(props) {

  let params = useLocation()

  return (
    <>
      <ProductProvide>
        <Header />
        <section>
          <div className='container'>
            <div className='row'>
              {
                params['pathname'].includes('cart') || params['pathname'].includes('login') ? "" : (params['pathname'].includes('account') ? <MenuAcc /> : <MenuLeft />)
              }
              {props.children}
            </div>
          </div>
        </section>
        <Footer />
      </ProductProvide>
    </>
  );
}

export default App;
