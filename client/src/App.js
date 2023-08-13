import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">ShoppingHub</Link>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;