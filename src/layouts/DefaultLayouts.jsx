import { Outlet } from "react-router-dom";
import Footer from "../components/Footer"
import PreFooter from "../components/PreFooter";
import Header from "../components/Header";

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <PreFooter />
            <Footer />
        </>
    )
}