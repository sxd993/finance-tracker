import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";

export const Auth = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen gap-10">
            <div>
                <h1 className="text-2xl font-bold">
                    <span className="text-orange-500">Habbit</span> Tracker
                </h1>
            </div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </div>
    );
};