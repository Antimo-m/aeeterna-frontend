import { Outlet } from "react-router-dom";
import Footer from "../components/Footer"
import PreFooter from "../components/PreFooter";
import Header from "../components/Header";
import { useState } from "react";
import LoadWrapper from "../components/LoadWrapper";
import { useLoad } from "../contexts/LoadContext";

export default function DefaultLayout({searchTerm, onSearch}) {

    const { load } = useLoad();
    return (
        <>
             <Header searchTerm={searchTerm} onSearch={onSearch}/>
                <main>
                    <Outlet />
                    <PreFooter />
                </main>
                <Footer />
            {load && <LoadWrapper />}
            </>
)}