import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayouts"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"
import Search from "./pages/Search"
import WishList from "./pages/WishList"
import CartPage from "./pages/CartPage"
import { CartContextProvider } from "./contexts/CartContext"
import 'bootstrap-icons/font/bootstrap-icons.css';
import { LoadContextProvider } from "./contexts/LoadContext"
import { WishListContextProvider } from "./contexts/WishListContext"




function App() {

  return (
    <>
      <CartContextProvider>
        <WishListContextProvider>
          <LoadContextProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<DefaultLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/productdetails/:slug" element={<ProductDetails />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/wishlist" element={<WishList />} />
                  <Route path="/cart" element={<CartPage />} />
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
