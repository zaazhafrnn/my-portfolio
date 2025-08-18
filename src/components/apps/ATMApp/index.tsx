"use client";
import { ScreenType } from "@/types";
import { Landmark } from "lucide-react";
import { useEffect, useState } from "react";
import ATMButtonPanel from "./components/ATMButtonPanel";
import BalanceScreen from "./screens/BalanceScreen";
import DepositScreen from "./screens/DepositScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import StatementScreen from "./screens/StatementScreen";
import TransferScreen from "./screens/TransferScreen";
import WithdrawScreen from "./screens/WithdrawScreen";

export default function ATMApp() {
  const [screen, setScreen] = useState<ScreenType>("login");
  const [time, setTime] = useState("");
  const [transferStep, setTransferStep] = useState<string | null>(null); // NEW

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (target: ScreenType) => {
    setScreen(target);
    if (target !== "transfer") {
      setTransferStep(null); // reset step when leaving transfer screen
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case "login":
        return <LoginScreen onLogin={() => handleNavigate("home")} />;
      case "home":
        return <HomeScreen onNavigate={handleNavigate} />;
      case "balance":
        return <BalanceScreen onBack={() => handleNavigate("home")} />;
      case "mutation":
        return <StatementScreen onBack={() => handleNavigate("home")} />;
      case "transfer":
        return (
          <TransferScreen
            onBack={() => handleNavigate("home")}
            setStep={setTransferStep} // NEW
          />
        );
      case "withdraw":
        return <WithdrawScreen onBack={() => handleNavigate("home")} />;
      case "deposit":
        return <DepositScreen onBack={() => handleNavigate("home")} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-800 text-sm font-mono overflow-hidden">
      <div className="bg-gray-900 text-white px-4 py-2 border-b-2 border-gray-600 flex justify-between text-xs">
        <span className="text-blue-400 font-bold flex items-center">
          <Landmark size={14} className="mr-2" /> BANK ATM SYSTEM
        </span>
        <span className="text-green-400">{time}</span>
      </div>

      <div className="flex-1 flex bg-gray-800 p-3 overflow-hidden">
        <ATMButtonPanel
          side="left"
          screen={screen}
          onNavigate={handleNavigate}
          transferStep={transferStep} // NEW
        />
        <div className="flex-1 bg-black border-4 border-gray-900 rounded-lg shadow-inner">
          <div className="bg-[#1a365d] h-full rounded-md overflow-hidden">
            {renderScreen()}
          </div>
        </div>
        <ATMButtonPanel
          side="right"
          screen={screen}
          onNavigate={handleNavigate}
          transferStep={transferStep} // NEW
        />
      </div>

      <div className="bg-gray-300 text-gray-700 px-4 py-1 border-t-2 border-gray-400 flex justify-between text-xs">
        <span>
          Written in Java/MySQL –{" "}
          <span
            onClick={() =>
              window.open("https://github.com/zaazhafrnn/ATM-System", "_blank")
            }
            className="hover:underline cursor-pointer hover:text-blue-600"
          >
            View GitHub ↗
          </span>
        </span>
        <p className="italic">*Static preview prototype</p>
      </div>
    </div>
  );
}
