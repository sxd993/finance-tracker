import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";

export const Layout = () => {
    return (
        <div className="min-h-screen">
            <main className="bg-neutral-50 pb-20">
                <Outlet />
            </main>
            <Navigation />
        </div>
    );
};