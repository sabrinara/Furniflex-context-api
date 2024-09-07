import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";


const Root = () => {
    return (
        <div className="bg-white">
            <NavBar />
            <Outlet className="min-h-screen "/>
            <Footer />
        </div>
    );
};

export default Root;