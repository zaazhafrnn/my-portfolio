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
      sub: "Leave",
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

      <div className="flex-1 flex justify-between items-stretch">
        <div className="flex flex-col justify-evenly text-left">
          {leftButtons.map((btn) => (
            <div key={btn.number} className="flex items-center space-x-2">
              <button
                onClick={() => onNavigate(btn.action as ScreenType)}
                className="flex p-2 rounded-md border border-green-500"
              >
                <div className="flex items-center pr-4">{`<<<`}</div>
                <div>
                  <div className="font-bold text-xs">{btn.label}</div>
                  <div className="text-xs text-gray-300">{btn.sub}</div>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="text-4xl mb-2">🏦</div>
            <p className="text-sm text-gray-300 mb-2">Choose a service</p>
            <div className="text-xs text-gray-400 mb-2">
              <p>Account: **** 1234</p>
            </div>
            <div className="mt-3 text-xs text-yellow-300">
              Touch screen OR use physical buttons
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-evenly text-right">
          {rightButtons.map((btn) => (
            <div
              key={btn.number}
              className="flex items-center space-x-2 justify-end"
            >
              <button
                onClick={() => onNavigate(btn.action as ScreenType)}
                className={`flex ${
                  btn.color === "red"
                    ? "border border-red-400"
                    : "border border-green-500"
                } p-2 rounded-md`}
              >
                <div>
                  <div className="font-bold text-xs">{btn.label}</div>
                  <div className="text-xs text-gray-300">{btn.sub}</div>
                </div>
                <div className="flex items-center pl-4">{`>>>`}</div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
