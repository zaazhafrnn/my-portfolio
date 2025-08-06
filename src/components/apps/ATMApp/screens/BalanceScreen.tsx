interface BalanceScreenProps {
  onBack: () => void;
}

export default function BalanceScreen({ onBack }: BalanceScreenProps) {
  return (
    <div className="h-full bg-[#1a365d] text-white flex flex-col overflow-hidden">
      <div className="text-center py-3">
        <h2 className="text-lg font-bold mb-1">BALANCE INQUIRY</h2>
        <div className="text-yellow-300 text-xs">Account Information</div>
      </div>

      <div className="flex-1 flex justify-between items-stretch">
        <div className="flex flex-col justify-evenly text-left w-24" />

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="bg-white text-black p-4 rounded-lg w-full max-w-xs text-center">
            <h3 className="text-sm font-bold mb-2">ACCOUNT BALANCE</h3>

            <div className="border-b border-dashed border-gray-400 pb-2 mb-2">
              <p className="text-xs text-gray-600">Account Number:</p>
              <p className="font-mono text-xs">**** **** **** 1234</p>
            </div>

            <div className="border-b border-dashed border-gray-400 pb-2 mb-2">
              <p className="text-xs text-gray-600">Account Holder:</p>
              <p className="font-bold text-xs">JOHN DOE</p>
            </div>

            <div className="border-b border-dashed border-gray-400 pb-2 mb-2">
              <p className="text-xs text-gray-600">Available Balance:</p>
              <p className="text-base font-bold text-green-600">Rp 2,500,000</p>
            </div>

            <div className="text-xs text-gray-600">
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>
                Time:{" "}
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end text-right">
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
        Use touchscreen or side buttons for navigation
      </div>
    </div>
  );
}
