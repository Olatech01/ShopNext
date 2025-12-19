"use client"
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

const AppWrapper = ({ children }) => {
    const pathname = usePathname();

    const isAdminRoute = pathname.startsWith("/admin");

    return (
        <>
            {!isAdminRoute && <Navbar />}
            {children}
            {!isAdminRoute && <Footer />}
        </>
    );
};

export default AppWrapper;
