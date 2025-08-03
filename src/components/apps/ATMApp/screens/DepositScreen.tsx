import { useState } from "react";

interface DepositScreenProps {
  onBack: () => void;
}

export default function DepositScreen({ onBack }: DepositScreenProps) {
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const amounts = [100000, 250000, 500000, 1000000, 2000000];

  const handleInsertCash = () => {
    if (selectedAmount) {
      setStep(2);
    }
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  if (confirmed) {
    return (
      <div className="h-full bg-[#1a365d] text-white flex flex-col overflow-hidden">
        <div className="text-center py-3">
          <h2 className="text-lg font-bold mb-1">DEPOSIT SUCCESSFUL</h2>
          <div className="text-yellow-300 text-xs">Transaction Complete</div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-green-400 text-5xl mb-3">✓</div>
            <p className="text-base mb-2">Deposit Completed</p>
            <p className="text-xl font-bold text-green-400 mb-2">
              Rp {selectedAmount?.toLocaleString()}
            </p>
            <p className="text-xs text-gray-300 mb-1">
              New Balance: Rp{" "}
              {(2500000 + (selectedAmount || 0)).toLocaleString()}
            </p>
            <p className="text-xs text-gray-300">Returning to main menu...</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="h-full bg-[#1a365d] text-white flex flex-col overflow-hidden">
        <div className="text-center py-3">
          <h2 className="text-lg font-bold mb-1">CASH DEPOSIT</h2>
          <div className="text-yellow-300 text-xs">Select Deposit Amount</div>
        </div>

        <div className="flex-1 flex justify-between px-3 py-2">
          <div className="flex flex-col justify-between w-24">
            <button
              id="deposit-100000"
              onClick={() => setSelectedAmount(amounts[0])}
              className={`p-2 rounded-l-lg text-left border-r-4 transition-colors relative ${
                selectedAmount === amounts[0]
                  ? "bg-green-700 border-green-400"
                  : "bg-gray-700 hover:bg-gray-600 border-green-500"
              }`}
            >
              <div className="font-bold text-xs">Rp 100K</div>
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-green-400">
                <span className="text-lg">👈</span>
                <span className="text-xs ml-1">1</span>
              </div>
            </button>
            <button
              id="deposit-250000"
              onClick={() => setSelectedAmount(amounts[1])}
              className={`p-2 rounded-l-lg text-left border-r-4 transition-colors relative ${
                selectedAmount === amounts[1]
                  ? "bg-green-700 border-green-400"
                  : "bg-gray-700 hover:bg-gray-600 border-green-500"
              }`}
            >
              <div className="font-bold text-xs">Rp 250K</div>
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-green-400">
                <span className="text-lg">👈</span>
                <span className="text-xs ml-1">2</span>
              </div>
            </button>
            <div className="bg-gray-800 p-2 rounded-l-lg text-left border-r-4 border-gray-600 opacity-50 relative">
              <div className="font-bold text-xs">CHECK</div>
              <div className="text-xs text-gray-400">DEPOSIT</div>
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-gray-500">
                <span className="text-lg">👈</span>
                <span className="text-xs ml-1">3</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center mx-3">
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <p className="text-xs mb-2">Select deposit amount</p>
              <div className="bg-gray-800 p-2 rounded text-xs mb-2">
                <p className="text-gray-300">Accepted denominations:</p>
                <p className="text-green-400">Rp 20K • Rp 50K • Rp 100K</p>
              </div>
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
                onClick={handleInsertCash}
                className="mt-3 bg-green-600 hover:bg-green-700 px-3 py-2 rounded font-bold text-xs transition-colors"
              >
                INSERT CASH
              </button>
            )}
          </div>

          <div className="flex flex-col justify-between w-24">
            <button
              id="deposit-500000"
              onClick={() => setSelectedAmount(amounts[2])}
              className={`p-2 rounded-r-lg text-right border-l-4 transition-colors relative ${
                selectedAmount === amounts[2]
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
              id="deposit-1000000"
              onClick={() => setSelectedAmount(amounts[3])}
              className={`p-2 rounded-r-lg text-right border-l-4 transition-colors relative ${
                selectedAmount === amounts[3]
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
            Select deposit amount using touchscreen or physical buttons
            (1,2,4,5,6)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#1a365d] text-white flex flex-col overflow-hidden">
      <div className="text-center py-3">
        <h2 className="text-lg font-bold mb-1">CASH DEPOSIT</h2>
        <div className="text-yellow-300 text-xs">Insert Cash Now</div>
      </div>

      <div className="flex-1 flex justify-between px-3 py-2">
        {/* Left side buttons */}
        <div className="flex flex-col justify-between w-24">
          <div className="bg-gray-800 p-2 rounded-l-lg text-left border-r-4 border-gray-600 opacity-50 relative">
            <div className="font-bold text-xs">COUNT</div>
            <div className="text-xs text-gray-400">BILLS</div>
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="text-lg">👈</span>
              <span className="text-xs ml-1">1</span>
            </div>
          </div>
          <button
            onClick={() => setStep(1)}
            className="bg-gray-600 hover:bg-gray-500 p-2 rounded-l-lg text-left border-r-4 border-gray-500 transition-colors relative"
          >
            <div className="font-bold text-xs">CHANGE</div>
            <div className="text-xs text-gray-300">AMOUNT</div>
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-gray-400">
              <span className="text-lg">👈</span>
              <span className="text-xs ml-1">2</span>
            </div>
          </button>
          <div className="bg-gray-800 p-2 rounded-l-lg text-left border-r-4 border-gray-600 opacity-50 relative">
            <div className="font-bold text-xs">HELP</div>
            <div className="text-xs text-gray-400">INFO</div>
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="text-lg">👈</span>
              <span className="text-xs ml-1">3</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center mx-3">
          <div className="text-center">
            <div className="text-3xl mb-2 animate-pulse">💵</div>
            <p className="text-base mb-2">Insert Cash Bills</p>
            <p className="text-xs text-gray-300 mb-2">
              Amount to deposit: Rp {selectedAmount?.toLocaleString()}
            </p>
            <div className="bg-gray-800 p-3 rounded animate-pulse">
              <p className="text-xs text-gray-400 mb-2">Cash Slot</p>
              <div className="bg-gray-900 h-6 w-32 rounded border-2 border-dashed border-gray-600"></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Insert bills one by one into the slot
            </p>
          </div>
          <button
            onClick={handleConfirm}
            className="mt-4 bg-green-600 hover:bg-green-700 px-3 py-2 rounded font-bold text-xs transition-colors"
          >
            CASH INSERTED - CONFIRM
          </button>
        </div>

        <div className="flex flex-col justify-between w-24">
          <div className="bg-gray-800 p-2 rounded-r-lg text-right border-l-4 border-gray-600 opacity-50 relative">
            <div className="font-bold text-xs">RECEIPT</div>
            <div className="text-xs text-gray-400">PRINT</div>
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="text-lg">👉</span>
              <span className="text-xs mr-1">4</span>
            </div>
          </div>
          <div className="bg-gray-800 p-2 rounded-r-lg text-right border-l-4 border-gray-600 opacity-50 relative">
            <div className="font-bold text-xs">ANOTHER</div>
            <div className="text-xs text-gray-400">DEPOSIT</div>
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="text-lg">👉</span>
              <span className="text-xs mr-1">5</span>
            </div>
          </div>
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
        <p>Insert cash bills into the deposit slot</p>
      </div>
    </div>
  );
}
