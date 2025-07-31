import { useState } from "react";

interface DepositScreenProps {
  onBack: () => void;
}

export default function DepositScreen({ onBack }: DepositScreenProps) {
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1);

  return (
    <div className="flex-1 bg-blue-900 text-white p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">CASH DEPOSIT</h2>
        <div className="text-yellow-300">Insert Cash</div>
      </div>

      <div className="flex justify-center">
        <div className="bg-gray-800 p-8 rounded-lg w-96">
          {step === 1 && (
            <div className="text-center">
              <div className="text-6xl mb-6">💰</div>
              <p className="text-xl mb-6">Insert cash into the deposit slot</p>
              <div className="bg-gray-700 p-4 rounded mb-6">
                <p className="text-sm">Accepted denominations:</p>
                <p>Rp 20,000 • Rp 50,000 • Rp 100,000</p>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount (for demo)"
                className="w-full p-3 rounded bg-gray-700 text-white text-center text-lg mb-6"
              />
              <div className="flex justify-between">
                <button
                  onClick={onBack}
                  className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded"
                >
                  CANCEL
                </button>
                <button
                  onClick={() => amount && setStep(2)}
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded disabled:bg-gray-600"
                  disabled={!amount}
                >
                  PROCESS
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <div className="text-green-400 text-6xl mb-6">✓</div>
              <h3 className="text-xl mb-4">Deposit Successful</h3>
              <div className="bg-white text-black p-4 rounded mb-6">
                <p className="text-sm">Deposited Amount:</p>
                <p className="text-2xl font-bold text-green-600">
                  Rp {parseInt(amount).toLocaleString()}
                </p>
                <p className="text-xs mt-2">
                  New Balance: Rp{" "}
                  {(2500000 + parseInt(amount)).toLocaleString()}
                </p>
              </div>
              <button
                onClick={onBack}
                className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded font-bold"
              >
                BACK TO MAIN MENU
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
