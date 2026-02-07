import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayouts"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"
import Products from "./pages/Products"
import WishList from "./pages/WishList"
import CartPage from "./pages/CartPage"
import { CartContextProvider } from "./contexts/CartContext"
import WelcomePopup from "./components/WelcomePopup"
import 'bootstrap-icons/font/bootstrap-icons.css';
import NotFound from "./pages/NotFound"
import { LoadContextProvider } from "./contexts/LoadContext"
import { WishListContextProvider } from "./contexts/WishListContext"
import {useState} from "react"
import {MessageProvider} from "./contexts/MessageContext"

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // Funzione per gestire il cambiamento del searchTerm
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
    <MessageProvider>
      <CartContextProvider>
        <WishListContextProvider>
          <LoadContextProvider>
            <BrowserRouter>
              <WelcomePopup />
              <Routes>
                <Route element={<DefaultLayout searchTerm={searchTerm} onSearch={handleSearch}/>}>
                  <Route path="/" element={<Home  searchTerm={searchTerm}/>} />
                  <Route path="/productdetails/:slug" element={<ProductDetails />} />
                  <Route path="/prodotti" element={<Products />} />
                  <Route path="/wishlist" element={<WishList />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </LoadContextProvider>
        </WishListContextProvider>
        </CartContextProvider>
      </MessageProvider>
    </>
  )
}
export default App
