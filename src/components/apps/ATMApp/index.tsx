"use client";
import { useState } from "react";
import BalanceScreen from "./screens/BalanceScreen";
import DepositScreen from "./screens/DepositScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import StatementScreen from "./screens/StatementScreen";
import TransferScreen from "./screens/TransferScreen";
import WithdrawScreen from "./screens/WithdrawScreen";

export type ScreenType =
  | "login"
  | "home"
  | "balance"
  | "mutation"
  | "transfer"
  | "withdraw"
  | "deposit";

export default function ATMApp() {
  const [screen, setScreen] = useState<ScreenType>("login");

  return (
    <div className="h-full flex flex-col bg-[#f4f4f4] text-sm font-mono">
      {screen === "login" && <LoginScreen onLogin={() => setScreen("home")} />}
      {screen === "home" && (
        <HomeScreen
          onNavigate={(screenName) => setScreen(screenName as ScreenType)}
        />
      )}
      {screen === "balance" && (
        <BalanceScreen onBack={() => setScreen("home")} />
      )}
      {screen === "mutation" && (
        <StatementScreen onBack={() => setScreen("home")} />
      )}
      {screen === "transfer" && (
        <TransferScreen onBack={() => setScreen("home")} />
      )}
      {screen === "withdraw" && (
        <WithdrawScreen onBack={() => setScreen("home")} />
      )}
      {screen === "deposit" && (
        <DepositScreen onBack={() => setScreen("home")} />
      )}

      <div className="bg-[#ddd] text-gray-700 px-4 py-1 border-b border-gray-300 flex justify-between text-xs italic">
        <a
          href="https://github.com/your-username/my-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Open in GitHub ↗
        </a>
        <p>*This is only a static preview of the project</p>
      </div>
    </div>
  );
}
