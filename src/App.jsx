import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayouts"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"
import Search from "./pages/Search"
import WishList from "./pages/WishList"
import CartPage from "./pages/CartPage"
import { CartContextProvider } from "./contexts/CartContext"
import 'bootstrap-icons/font/bootstrap-icons.css';
import NotFound from "./pages/NotFound"




function App() {

  return (
    <>
      <CartContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/productdetails/:slug" element={<ProductDetails />} />
              <Route path="/search" element={<Search />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartContextProvider>

    </>
  )
}

export default App
