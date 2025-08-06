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
        <div className="text-yellow-300 text-xs">Last 5 Transactions History</div>
      </div>

      <div className="flex-1 flex justify-between items-stretch">
        <div className="flex flex-col justify-evenly text-left w-24" />

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="bg-white text-black p-4 rounded-lg w-full max-w-xs h-full overflow-hidden text-xs">
            <div className="text-center mb-2">
              <p className="text-xs">Date: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-1 h-fit overflow-hidden">
              {transactions.map((tx, index) => (
                <div
                  key={index}
                  className="border-b border-dashed border-gray-400 pb-1"
                >
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <p className="font-bold">{tx.type}</p>
                      <p className="text-gray-600">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          tx.amount > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {tx.amount > 0 ? "+" : ""}
                        {Math.abs(tx.amount).toLocaleString()}
                      </p>
                      <p className="text-gray-600">
                        {tx.balance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-2 text-gray-600">
              End of Mini Statement
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
