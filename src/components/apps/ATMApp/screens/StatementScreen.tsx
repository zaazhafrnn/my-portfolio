interface StatementScreenProps {
  onBack: () => void;
}

export default function StatementScreen({ onBack }: StatementScreenProps) {
  const transactions = [
    {
      date: "2025-07-31",
      type: "Withdrawal",
      amount: -200000,
      balance: 2500000,
    },
    { date: "2025-07-30", type: "Deposit", amount: 500000, balance: 2700000 },
    {
      date: "2025-07-29",
      type: "Transfer Out",
      amount: -150000,
      balance: 2200000,
    },
    {
      date: "2025-07-28",
      type: "Transfer In",
      amount: 300000,
      balance: 2350000,
    },
    {
      date: "2025-07-27",
      type: "Withdrawal",
      amount: -100000,
      balance: 2050000,
    },
  ];

  return (
    <div className="flex-1 bg-blue-900 text-white p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">MINI STATEMENT</h2>
        <div className="text-yellow-300">Last 5 Transactions</div>
      </div>

      <div className="flex justify-center">
        <div className="bg-white text-black p-6 rounded-lg w-full max-w-2xl">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold">TRANSACTION HISTORY</h3>
            <p className="text-sm">Account: **** **** **** 1234</p>
            <p className="text-sm">
              Statement Date: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <div
                key={index}
                className="border-b border-dashed border-gray-400 pb-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">{tx.type}</p>
                    <p className="text-sm text-gray-600">{tx.date}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {tx.amount > 0 ? "+" : ""}Rp{" "}
                      {Math.abs(tx.amount).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Bal: Rp {tx.balance.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 text-xs text-gray-600">
            <p>For detailed statement, visit our branch or internet banking</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onBack}
          className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded font-bold text-lg"
        >
          BACK TO MAIN MENU
        </button>
      </div>
    </div>
  );
}
