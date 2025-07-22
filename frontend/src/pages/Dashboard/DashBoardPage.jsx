import { useContext, useEffect } from "react";
import { BalanceCard } from "./BalanceCard";
import { Expenses } from "./Expenses";
import { AuthContext } from "../../context/AuthContext";

export const DashBoardPage = () => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    console.log("User changed:", user);
  }, [user]); 
  return (
    <>
      <div className="flex flex-col  items-center justify-top h-screen !pt-5 gap-5">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold text-center">Главная</h1>
          <p className="text-sm text-center">Добро пожаловать, {user.name}</p>
        </div>
        <BalanceCard income={user.income} />
        <Expenses />
      </div>
    </>
  );
};
