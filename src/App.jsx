import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayouts"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"
import Products from "./pages/Products"
import WishList from "./pages/WishList"
import CartPage from "./pages/CartPage"
import { CartContextProvider } from "./contexts/CartContext"
import CartPreview from "./components/CartPreview"
import WelcomePopup from "./components/WelcomePopup"
import 'bootstrap-icons/font/bootstrap-icons.css';
import NotFound from "./pages/NotFound"
import { WishListContextProvider } from "./contexts/WishListContext"
import { MessageProvider } from "./contexts/MessageContext"
import Checkout from "./pages/Checkout"
import { useState } from "react"
import ScrollToTop from "./components/ScrollToTop"
import Community from "./pages/Community"
import OrderSummaryPage from "./pages/OrderSummaryPage"
import SendContacts from "./pages/SendContacts"
import Founders from "./pages/Founders"
import InsideOutQuiz from "./pages/QuizPage"

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
            <BrowserRouter>
              <CartPreview />
              <WelcomePopup />
              <ScrollToTop />
              <Routes>
                <Route element={<DefaultLayout searchTerm={searchTerm} onSearch={handleSearch} />}>
                  <Route path="/" element={<Home searchTerm={searchTerm} />} />
                  <Route path="/productdetails/:slug" element={<ProductDetails />} />
                  <Route path="/prodotti" element={<Products />} />
                  <Route path="/quiz" element={<InsideOutQuiz/>}/>
                  <Route path="/wishlist" element={<WishList />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/ordersummary" element={<OrderSummaryPage />} />
                  <Route path="/sendcontacts" element={<SendContacts />} />
                  <Route path="/founders" element={<Founders/>} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </WishListContextProvider>
        </CartContextProvider>
      </MessageProvider>
    </>
  )
}
export default App
