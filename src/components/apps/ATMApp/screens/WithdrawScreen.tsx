import { Check } from "lucide-react";
import { useState } from "react";
import PinEntry from "../components/PinEntry";

interface WithdrawScreenProps {
  onBack: () => void;
}

export default function WithdrawScreen({ onBack }: WithdrawScreenProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [step, setStep] = useState<"select" | "pin" | "success">("select");

  const amounts = [50000, 100000, 250000, 500000, 1000000];

  const handleConfirm = () => {
    if (selectedAmount) {
      setStep("pin");
    }
  };

  const handlePinSuccess = () => {
    setStep("success");
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  if (step === "success" && selectedAmount) {
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
            <div className="flex justify-center text-green-400 mb-3">
              <Check size={64} />
            </div>
            <p className="text-base mb-2">Cash Dispensed</p>
            <p className="text-xl font-bold text-green-400 mb-3">
              Rp {selectedAmount.toLocaleString()}
            </p>
            <p className="text-xs text-gray-300">Returning to main menu...</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === "pin" && selectedAmount) {
    return (
      <div className="mt-16">
        <PinEntry
          onSuccess={handlePinSuccess}
          title="Confirm Withdrawal"
          subtitle={`Withdraw Rp ${selectedAmount.toLocaleString()}`}
        />
      </div>
    );
  }

  return (
    <div className="h-full bg-[#1a365d] text-white flex flex-col overflow-hidden">
      <div className="text-center py-3">
        <h2 className="text-lg font-bold mb-1">CASH WITHDRAWAL</h2>
        <div className="text-yellow-300 text-xs">Select Amount</div>
      </div>

      <div className="flex-1 flex justify-between items-stretch -mb-11">
        <div className="flex flex-col justify-evenly text-left">
          {amounts.slice(0, 3).map((amt) => (
            <div key={amt} className="flex items-center space-x-2">
              <button
                id={`withdraw-${amt}`}
                onClick={() => setSelectedAmount(amt)}
                className={`flex p-2 rounded-md border ${
                  selectedAmount === amt
                    ? "border-green-400 bg-green-700"
                    : "border-green-500"
                }`}
              >
                <div className="flex items-center pr-4">{`<<<`}</div>
                <div>
                  <div className="font-bold text-xs">
                    Rp {(amt / 1000).toLocaleString()}K
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center mb-3">
            <div className="text-4xl mb-2">💵</div>
            <p className="text-xs text-gray-300 mb-2">
              Current Balance: Rp 2,500,000
            </p>
            {selectedAmount && (
              <div className="mt-2 p-2 bg-gray-800 border border-green-500 rounded">
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

        <div className="flex flex-col justify-evenly text-right">
          {amounts.slice(3).map((amt) => (
            <div key={amt} className="flex items-center space-x-2 justify-end">
              <button
                id={`withdraw-${amt}`}
                onClick={() => setSelectedAmount(amt)}
                className={`flex p-2 rounded-md border ${
                  selectedAmount === amt
                    ? "border-green-400 bg-green-700"
                    : "border-green-500"
                }`}
              >
                <div>
                  <div className="font-bold text-xs">
                    Rp {(amt / 1000).toLocaleString()}K
                  </div>
                </div>
                <div className="flex items-center pl-4">{`>>>`}</div>
              </button>
            </div>
          ))}

          <div className="flex items-center space-x-2 justify-end">
            <button
              onClick={onBack}
              className="flex p-2 rounded-md border border-red-400"
            >
              <div>
                <div className="font-bold text-xs">CANCEL</div>
                <div className="text-xs text-gray-300">EXIT</div>
              </div>
              <div className="flex items-center pl-4">{`>>>`}</div>
            </button>
          </div>
        </div>
      </div>

      <div className="text-center py-2 text-xs text-gray-400">
        Select withdrawal amount using touchscreen or physical buttons (1-6)
      </div>
    </div>
  );
}
