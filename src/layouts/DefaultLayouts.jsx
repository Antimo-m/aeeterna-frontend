import { Outlet } from "react-router-dom";
import Footer from "../components/Footer"
import PreFooter from "../components/PreFooter";
import Header from "../components/Header";

export default function DefaultLayout({ searchTerm, onSearch }) {

    return (
        <>
            <Header searchTerm={searchTerm} onSearch={onSearch} />
            <main>
                <Outlet />
                <PreFooter />
            </main>
            <Footer />
        </>
    )
}