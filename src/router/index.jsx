
import { BrowserRouter, Routes, Route } from "react-router";
import Nav from "../components/nav";
import Index from "../pages";
import ProtectedRouteLogin from "../components/protectedRoute/protectedRouteLogin";
import User from "../pages/user";
import Sign_in from "../pages/sign-in";
import Footer from "../components/footer";
import ProtectedRouteLogout from "../components/protectedRoute/protectedRouteLogout";

export default function Router() {
    return (
        <BrowserRouter>
            <Nav />

            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sign-in" element={
                    <ProtectedRouteLogout to={"/user"}>
                        <Sign_in />
                    </ProtectedRouteLogout>
                } />
                <Route path="/user" element={
                    <ProtectedRouteLogin to={"/"}>
                        <User />
                    </ProtectedRouteLogin>
                } />
                <Route path="*" element={<>error</>} />
            </Routes>

            <Footer />
        </BrowserRouter>
    )
}