import { useState } from "react";

interface TransferScreenProps {
  onBack: () => void;
}

export default function TransferScreen({ onBack }: TransferScreenProps) {
  const [step, setStep] = useState(1);
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="flex-1 bg-blue-900 text-white p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">FUND TRANSFER</h2>
        <div className="text-yellow-300">Step {step} of 3</div>
      </div>

      <div className="flex justify-center">
        <div className="bg-gray-800 p-8 rounded-lg w-96">
          {step === 1 && (
            <div>
              <h3 className="text-xl mb-6 text-center">
                Enter Destination Account
              </h3>
              <input
                type="text"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                placeholder="Account Number"
                className="w-full p-3 rounded bg-gray-700 text-white text-center text-lg font-mono mb-6"
                maxLength={16}
              />
              <div className="flex justify-between">
                <button
                  onClick={onBack}
                  className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded"
                >
                  CANCEL
                </button>
                <button
                  onClick={() => toAccount.length >= 10 && setStep(2)}
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded disabled:bg-gray-600"
                  disabled={toAccount.length < 10}
                >
                  NEXT
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-xl mb-6 text-center">Enter Amount</h3>
              <div className="text-center mb-4">
                <p className="text-sm">To: {toAccount}</p>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount (Rp)"
                className="w-full p-3 rounded bg-gray-700 text-white text-center text-lg mb-6"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded"
                >
                  BACK
                </button>
                <button
                  onClick={() => amount && setStep(3)}
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded disabled:bg-gray-600"
                  disabled={!amount}
                >
                  NEXT
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-xl mb-6 text-center">Confirm Transfer</h3>
              <div className="text-sm space-y-2 mb-6">
                <p>
                  To Account: <span className="font-mono">{toAccount}</span>
                </p>
                <p>
                  Amount:{" "}
                  <span className="text-green-400 font-bold">
                    Rp {parseInt(amount).toLocaleString()}
                  </span>
                </p>
                <p>
                  Fee: <span className="text-yellow-400">Rp 2,500</span>
                </p>
                <hr className="border-gray-600" />
                <p>
                  Total:{" "}
                  <span className="font-bold">
                    Rp {(parseInt(amount) + 2500).toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded"
                >
                  BACK
                </button>
                <button
                  onClick={onBack}
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
                >
                  CONFIRM
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
