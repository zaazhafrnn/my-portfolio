import { ScreenType } from "@/types";

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const leftButtons = [
    { label: "BALANCE", sub: "INQUIRY", number: 1, action: "balance" },
    { label: "CASH", sub: "WITHDRAWAL", number: 2, action: "withdraw" },
    { label: "CASH", sub: "DEPOSIT", number: 3, action: "deposit" },
  ];

  const rightButtons = [
    { label: "FUND", sub: "TRANSFER", number: 4, action: "transfer" },
    { label: "MINI", sub: "STATEMENT", number: 5, action: "mutation" },
    {
      label: "EXIT",
      sub: "END SESSION",
      number: 6,
      action: "login",
      color: "red",
    },
  ];

  return (
    <div className="h-full bg-[#1a365d] text-white flex flex-col overflow-hidden">
      <div className="text-center py-3">
        <h2 className="text-lg font-bold mb-1">MAIN MENU</h2>
        <div className="text-yellow-300 text-xs">Select Transaction</div>
      </div>

      <div className="flex-1 flex justify-between px-3 py-2">
        <div className="flex flex-col justify-between w-24">
          {leftButtons.map((btn) => (
            <button
              key={btn.number}
              onClick={() => onNavigate(btn.action as ScreenType)}
              className="bg-gray-700 hover:bg-gray-600 p-2 rounded-l-lg text-left border-r-4 border-green-500 relative"
            >
              <div className="font-bold text-xs">{btn.label}</div>
              <div className="text-xs text-gray-300">{btn.sub}</div>
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-green-400">
                👈 <span className="text-xs ml-1">{btn.number}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex-1 flex items-center justify-center mx-3">
          <div className="text-center">
            <div className="text-4xl mb-2">🏦</div>
            <p className="text-sm text-gray-300 mb-2">Choose a service</p>
            <div className="text-xs text-gray-400">
              <p>Account: **** **** **** 1234</p>
              <p>Available Balance: Rp 2,500,000</p>
            </div>
            <div className="mt-3 text-xs text-yellow-300">
              Touch screen OR use physical buttons
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between w-24">
          {rightButtons.map((btn) => (
            <button
              key={btn.number}
              onClick={() => onNavigate(btn.action as ScreenType)}
              className={`${
                btn.color === "red"
                  ? "bg-red-700 hover:bg-red-600 border-l-4 border-red-400"
                  : "bg-gray-700 hover:bg-gray-600 border-l-4 border-green-500"
              } p-2 rounded-r-lg text-right relative`}
            >
              <div className="font-bold text-xs">{btn.label}</div>
              <div className="text-xs text-gray-300">{btn.sub}</div>
              <div
                className={`absolute -right-6 top-1/2 transform -translate-y-1/2 ${
                  btn.color === "red" ? "text-red-400" : "text-green-400"
                }`}
              >
                👉 <span className="text-xs mr-1">{btn.number}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
