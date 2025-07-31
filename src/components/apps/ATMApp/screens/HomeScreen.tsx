type ScreenType =
  | "login"
  | "home"
  | "balance"
  | "mutation"
  | "transfer"
  | "withdraw"
  | "deposit";

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="flex-1 bg-blue-900 text-white p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">MAIN MENU</h2>
        <div className="text-yellow-300">Select Transaction</div>
      </div>

      <div className="flex justify-between h-96">
        {/* Left side buttons */}
        <div className="flex flex-col justify-between">
          <button
            onClick={() => onNavigate("balance")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-l-lg text-left w-48 border-r-4 border-green-500"
          >
            <div className="font-bold">BALANCE INQUIRY</div>
            <div className="text-sm text-gray-300">Check your balance</div>
          </button>
          <button
            onClick={() => onNavigate("withdraw")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-l-lg text-left w-48 border-r-4 border-green-500"
          >
            <div className="font-bold">CASH WITHDRAWAL</div>
            <div className="text-sm text-gray-300">Withdraw money</div>
          </button>
          <button
            onClick={() => onNavigate("deposit")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-l-lg text-left w-48 border-r-4 border-green-500"
          >
            <div className="font-bold">DEPOSIT</div>
            <div className="text-sm text-gray-300">Deposit money</div>
          </button>
        </div>

        {/* Center display */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🏦</div>
            <p className="text-lg text-gray-300">Choose a service</p>
          </div>
        </div>

        {/* Right side buttons */}
        <div className="flex flex-col justify-between">
          <button
            onClick={() => onNavigate("transfer")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-r-lg text-right w-48 border-l-4 border-green-500"
          >
            <div className="font-bold">TRANSFER</div>
            <div className="text-sm text-gray-300">Transfer money</div>
          </button>
          <button
            onClick={() => onNavigate("mutation")}
            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-r-lg text-right w-48 border-l-4 border-green-500"
          >
            <div className="font-bold">MINI STATEMENT</div>
            <div className="text-sm text-gray-300">Transaction history</div>
          </button>
          <button
            onClick={() => onNavigate("login")}
            className="bg-red-700 hover:bg-red-600 p-4 rounded-r-lg text-right w-48 border-l-4 border-red-400"
          >
            <div className="font-bold">EXIT</div>
            <div className="text-sm text-gray-300">End session</div>
          </button>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-400">
        <p>Please select a transaction type</p>
      </div>
    </div>
  );
}
