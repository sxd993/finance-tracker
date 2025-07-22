import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";

export const Layout = () => {
    return (
    <div>
        <Navigation />
        <main className="bg-neutral-50">
            <Outlet />
        </main>
    </div>
    );
}