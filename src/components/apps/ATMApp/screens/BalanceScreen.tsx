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

      <div className="flex-1 flex justify-between px-3 py-2">
        <div className="flex flex-col justify-between w-24">
          <button
            onClick={onBack}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-l-lg text-left border-r-4 border-green-500 transition-colors relative"
          >
            <div className="font-bold text-xs">MAIN</div>
            <div className="text-xs text-gray-300">MENU</div>
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-green-400">
              <span className="text-lg">👈</span>
              <span className="text-xs ml-1">1</span>
            </div>
          </button>
          <div className="bg-gray-800 p-2 rounded-l-lg text-left border-r-4 border-gray-600 opacity-50 relative">
            <div className="font-bold text-xs">PRINT</div>
            <div className="text-xs text-gray-400">RECEIPT</div>
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="text-lg">👈</span>
              <span className="text-xs ml-1">2</span>
            </div>
          </div>
          <div className="bg-gray-800 p-2 rounded-l-lg text-left border-r-4 border-gray-600 opacity-50 relative">
            <div className="font-bold text-xs">ANOTHER</div>
            <div className="text-xs text-gray-400">INQUIRY</div>
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="text-lg">👈</span>
              <span className="text-xs ml-1">3</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center mx-3">
          <div className="bg-white text-black p-3 rounded-lg w-full max-w-56 text-center">
            <h3 className="text-sm font-bold mb-2">ACCOUNT BALANCE</h3>
            <div className="border-b border-dashed border-gray-400 pb-2 mb-2">
              <p className="text-xs">Account Number:</p>
              <p className="font-mono text-xs">**** **** **** 1234</p>
            </div>
            <div className="border-b border-dashed border-gray-400 pb-2 mb-2">
              <p className="text-xs">Account Holder:</p>
              <p className="font-bold text-xs">JOHN DOE</p>
            </div>
            <div className="border-b border-dashed border-gray-400 pb-2 mb-2">
              <p className="text-xs">Available Balance:</p>
              <p className="text-base font-bold text-green-600">Rp 2,500,000</p>
            </div>
            <div className="text-xs text-gray-600">
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Time: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between w-24">
          <div className="bg-gray-800 p-2 rounded-r-lg text-right border-l-4 border-gray-600 opacity-50 relative">
            <div className="font-bold text-xs">ACCOUNT</div>
            <div className="text-xs text-gray-400">DETAILS</div>
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="text-lg">👉</span>
              <span className="text-xs mr-1">4</span>
            </div>
          </div>
          <div className="bg-gray-800 p-2 rounded-r-lg text-right border-l-4 border-gray-600 opacity-50 relative">
            <div className="font-bold text-xs">SAVINGS</div>
            <div className="text-xs text-gray-400">ACCOUNT</div>
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
        <p>Use touchscreen or physical buttons (1,6) for navigation</p>
      </div>
    </div>
  );
}
