import { Outlet } from "react-router-dom";
import Footer from "../components/Footer"
import PreFooter from "../components/PreFooter";
import Header from "../components/Header";
import { useState } from "react";
import LoadWrapper from "../components/LoadWrapper";
import { useLoad } from "../contexts/LoadContext";

export default function DefaultLayout() {

    const { load } = useLoad();
    return (
        <>
            <Header />
            <>
                <main>
                    <Outlet />
                    <PreFooter />
                </main>
                <Footer />
            </>
            {load && <LoadWrapper />}
        </>
    )
}