import { Outlet } from "react-router-dom";
import Footer from "../components/Footer"
import PreFooter from "../components/PreFooter";
export default function DefaultLayout() {
    return (
        <>
            <Outlet />
            <PreFooter />
            <Footer />
        </>
    )
}