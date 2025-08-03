import { useState } from "react";

interface WithdrawScreenProps {
  onBack: () => void;
}

export default function WithdrawScreen({ onBack }: WithdrawScreenProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const amounts = [50000, 100000, 250000, 500000, 1000000];

  const handleConfirm = () => {
    if (selectedAmount) {
      setConfirmed(true);
      setTimeout(() => {
        onBack();
      }, 2000);
    }
  };

  if (confirmed) {
    return (
      <div className="h-full bg-[#1a365d] text-white flex flex-col overflow-hidden">
        <div className="text-center py-3">
          <h2 className="text-lg font-bold mb-1">TRANSACTION SUCCESSFUL</h2>
          <div className="text-yellow-300 text-xs">
            Please collect your cash
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-green-400 text-5xl mb-3">✓</div>
            <p className="text-base mb-2">Cash Dispensed</p>
            <p className="text-xl font-bold text-green-400 mb-3">
              Rp {selectedAmount?.toLocaleString()}
            </p>
            <p className="text-xs text-gray-300">Returning to main menu...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#1a365d] text-white flex flex-col overflow-hidden">
      <div className="text-center py-3">
        <h2 className="text-lg font-bold mb-1">CASH WITHDRAWAL</h2>
        <div className="text-yellow-300 text-xs">Select Amount</div>
      </div>

      <div className="flex-1 flex justify-between px-3 py-2">
        <div className="flex flex-col justify-between w-24">
          <button
            id="withdraw-50000"
            onClick={() => setSelectedAmount(amounts[0])}
            className={`p-2 rounded-l-lg text-left border-r-4 transition-colors relative ${
              selectedAmount === amounts[0]
                ? "bg-green-700 border-green-400"
                : "bg-gray-700 hover:bg-gray-600 border-green-500"
            }`}
          >
            <div className="font-bold text-xs">Rp 50K</div>
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-green-400">
              <span className="text-lg">👈</span>
              <span className="text-xs ml-1">1</span>
            </div>
          </button>
          <button
            id="withdraw-100000"
            onClick={() => setSelectedAmount(amounts[1])}
            className={`p-2 rounded-l-lg text-left border-r-4 transition-colors relative ${
              selectedAmount === amounts[1]
                ? "bg-green-700 border-green-400"
                : "bg-gray-700 hover:bg-gray-600 border-green-500"
            }`}
          >
            <div className="font-bold text-xs">Rp 100K</div>
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-green-400">
              <span className="text-lg">👈</span>
              <span className="text-xs ml-1">2</span>
            </div>
          </button>
          <button
            id="withdraw-250000"
            onClick={() => setSelectedAmount(amounts[2])}
            className={`p-2 rounded-l-lg text-left border-r-4 transition-colors relative ${
              selectedAmount === amounts[2]
                ? "bg-green-700 border-green-400"
                : "bg-gray-700 hover:bg-gray-600 border-green-500"
            }`}
          >
            <div className="font-bold text-xs">Rp 250K</div>
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-green-400">
              <span className="text-lg">👈</span>
              <span className="text-xs ml-1">3</span>
            </div>
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center mx-3">
          <div className="text-center mb-3">
            <div className="text-3xl mb-2">💵</div>
            <p className="text-xs mb-2">Current Balance: Rp 2,500,000</p>
            {selectedAmount && (
              <div className="mt-2 p-2 bg-gray-800 rounded">
                <p className="text-xs">Selected Amount:</p>
                <p className="text-base font-bold text-green-400">
                  Rp {selectedAmount.toLocaleString()}
                </p>
              </div>
            )}
          </div>
          {selectedAmount && (
            <button
              onClick={handleConfirm}
              className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded font-bold text-xs transition-colors"
            >
              CONFIRM WITHDRAWAL
            </button>
          )}
        </div>

        <div className="flex flex-col justify-between w-24">
          <button
            id="withdraw-500000"
            onClick={() => setSelectedAmount(amounts[3])}
            className={`p-2 rounded-r-lg text-right border-l-4 transition-colors relative ${
              selectedAmount === amounts[3]
                ? "bg-green-700 border-green-400"
                : "bg-gray-700 hover:bg-gray-600 border-green-500"
            }`}
          >
            <div className="font-bold text-xs">Rp 500K</div>
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-green-400">
              <span className="text-lg">👉</span>
              <span className="text-xs mr-1">4</span>
            </div>
          </button>
          <button
            id="withdraw-1000000"
            onClick={() => setSelectedAmount(amounts[4])}
            className={`p-2 rounded-r-lg text-right border-l-4 transition-colors relative ${
              selectedAmount === amounts[4]
                ? "bg-green-700 border-green-400"
                : "bg-gray-700 hover:bg-gray-600 border-green-500"
            }`}
          >
            <div className="font-bold text-xs">Rp 1M</div>
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-green-400">
              <span className="text-lg">👉</span>
              <span className="text-xs mr-1">5</span>
            </div>
          </button>
          <button
            onClick={onBack}
            className="bg-red-700 hover:bg-red-600 p-2 rounded-r-lg text-right border-l-4 border-red-400 transition-colors relative"
          >
            <div className="font-bold text-xs">CANCEL</div>
            <div className="text-xs text-gray-300">EXIT</div>
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-red-400">
              <span className="text-lg">👉</span>
              <span className="text-xs mr-1">6</span>
            </div>
          </button>
        </div>
      </div>

      <div className="text-center py-2 text-xs text-gray-400">
        <p>
          Select withdrawal amount using touchscreen or physical buttons (1-6)
        </p>
      </div>
    </div>
  );
}
