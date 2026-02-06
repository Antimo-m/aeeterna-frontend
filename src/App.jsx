import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayouts"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"
import Prodotti from "./pages/Prodotti"
import WishList from "./pages/WishList"
import CartPage from "./pages/CartPage"
import { CartContextProvider } from "./contexts/CartContext"
import WelcomePopup from "./components/WelcomePopup"
import 'bootstrap-icons/font/bootstrap-icons.css';
import NotFound from "./pages/NotFound"
import { LoadContextProvider } from "./contexts/LoadContext"
import { WishListContextProvider } from "./contexts/WishListContext"


function App() {

  return (
    <>
      <CartContextProvider>
        <WishListContextProvider>
          <LoadContextProvider>
            <BrowserRouter>
              <WelcomePopup />
              <Routes>
                <Route element={<DefaultLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/productdetails/:slug" element={<ProductDetails />} />
                  <Route path="/prodotti" element={<Prodotti />} />
                  <Route path="/wishlist" element={<WishList />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </LoadContextProvider>
        </WishListContextProvider>
      </CartContextProvider>
    </>
  )
}

export default App
