interface StatementScreenProps {
  onBack: () => void;
}

export default function StatementScreen({ onBack }: StatementScreenProps) {
  const transactions = [
    {
      date: "31/07",
      type: "Withdrawal",
      amount: -200000,
      balance: 2500000,
    },
    {
      date: "30/07",
      type: "Deposit",
      amount: 500000,
      balance: 2700000,
    },
    {
      date: "29/07",
      type: "Transfer Out",
      amount: -150000,
      balance: 2200000,
    },
    {
      date: "28/07",
      type: "Transfer In",
      amount: 300000,
      balance: 2350000,
    },
    {
      date: "27/07",
      type: "Withdrawal",
      amount: -100000,
      balance: 2050000,
    },
  ];

  return (
    <div className="h-full bg-[#1a365d] text-white flex flex-col overflow-hidden">
      <div className="text-center py-3">
        <h2 className="text-lg font-bold mb-1">MINI STATEMENT</h2>
        <div className="text-yellow-300 text-xs">Last 5 Transactions</div>
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
            <div className="text-xs text-gray-400">STATEMENT</div>
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="text-lg">👈</span>
              <span className="text-xs ml-1">2</span>
            </div>
          </div>
          <div className="bg-gray-800 p-2 rounded-l-lg text-left border-r-4 border-gray-600 opacity-50 relative">
            <div className="font-bold text-xs">DETAILED</div>
            <div className="text-xs text-gray-400">HISTORY</div>
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="text-lg">👈</span>
              <span className="text-xs ml-1">3</span>
            </div>
          </div>
        </div>

        {/* Center display */}
        <div className="flex-1 flex items-center justify-center mx-3">
          <div className="bg-white text-black p-3 rounded-lg w-full max-w-64 h-64 overflow-hidden">
            <div className="text-center mb-2">
              <h3 className="text-xs font-bold">TRANSACTION HISTORY</h3>
              <p className="text-xs">Account: **** **** **** 1234</p>
              <p className="text-xs">Date: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-1 h-40 overflow-hidden">
              {transactions.map((tx, index) => (
                <div
                  key={index}
                  className="border-b border-dashed border-gray-400 pb-1"
                >
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <p className="font-bold text-xs">{tx.type}</p>
                      <p className="text-gray-600 text-xs">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold text-xs ${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {tx.amount > 0 ? "+" : ""}
                        {Math.abs(tx.amount).toLocaleString()}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {tx.balance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-2 text-xs text-gray-600">
              <p>End of Mini Statement</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between w-24">
          <div className="bg-gray-800 p-2 rounded-r-lg text-right border-l-4 border-gray-600 opacity-50 relative">
            <div className="font-bold text-xs">FULL</div>
            <div className="text-xs text-gray-400">STATEMENT</div>
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-gray-500">
              <span className="text-lg">👉</span>
              <span className="text-xs mr-1">4</span>
            </div>
          </div>
          <div className="bg-gray-800 p-2 rounded-r-lg text-right border-l-4 border-gray-600 opacity-50 relative">
            <div className="font-bold text-xs">EMAIL</div>
            <div className="text-xs text-gray-400">STATEMENT</div>
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
