import { useState } from "react";

interface WithdrawScreenProps {
  onBack: () => void;
}

export default function WithdrawScreen({ onBack }: WithdrawScreenProps) {
  const [amount, setAmount] = useState("");
  const amounts = [50000, 100000, 250000, 500000, 1000000];

  return (
    <div className="flex-1 bg-blue-900 text-white p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">CASH WITHDRAWAL</h2>
        <div className="text-yellow-300">Select Amount</div>
      </div>

      <div className="flex justify-between h-80">
        <div className="flex flex-col justify-between">
          {amounts.slice(0, 3).map((amt, index) => (
            <button
              key={amt}
              onClick={() => setAmount(amt.toString())}
              className="bg-gray-700 hover:bg-gray-600 p-4 rounded-l-lg text-left w-48 border-r-4 border-green-500"
            >
              <div className="font-bold">Rp {amt.toLocaleString()}</div>
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">💵</div>
            <p className="text-lg">Current Balance: Rp 2,500,000</p>
            {amount && (
              <div className="mt-4 p-4 bg-gray-800 rounded">
                <p>Selected Amount:</p>
                <p className="text-xl font-bold text-green-400">
                  Rp {parseInt(amount).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          {amounts.slice(3).map((amt, index) => (
            <button
              key={amt}
              onClick={() => setAmount(amt.toString())}
              className="bg-gray-700 hover:bg-gray-600 p-4 rounded-r-lg text-right w-48 border-l-4 border-green-500"
            >
              <div className="font-bold">Rp {amt.toLocaleString()}</div>
            </button>
          ))}
          <button
            onClick={onBack}
            className="bg-red-700 hover:bg-red-600 p-4 rounded-r-lg text-right w-48 border-l-4 border-red-400"
          >
            <div className="font-bold">CANCEL</div>
          </button>
        </div>
      </div>

      {amount && (
        <div className="text-center mt-8">
          <button className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded font-bold text-lg mr-4">
            CONFIRM WITHDRAWAL
          </button>
        </div>
      )}
    </div>
  );
}
