interface BalanceScreenProps {
  onBack: () => void;
}

export default function BalanceScreen({ onBack }: BalanceScreenProps) {
  return (
    <div className="flex-1 bg-blue-900 text-white p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">BALANCE INQUIRY</h2>
        <div className="text-yellow-300">Account Information</div>
      </div>

      <div className="flex justify-center">
        <div className="bg-white text-black p-8 rounded-lg w-96">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-4">ACCOUNT BALANCE</h3>
            <div className="border-b-2 border-dashed border-gray-400 pb-4 mb-4">
              <p className="text-sm">Account Number:</p>
              <p className="font-mono text-lg">**** **** **** 1234</p>
            </div>
            <div className="border-b-2 border-dashed border-gray-400 pb-4 mb-4">
              <p className="text-sm">Account Holder:</p>
              <p className="font-bold">JOHN DOE</p>
            </div>
            <div className="border-b-2 border-dashed border-gray-400 pb-4 mb-4">
              <p className="text-sm">Available Balance:</p>
              <p className="text-2xl font-bold text-green-600">Rp 2,500,000</p>
            </div>
            <div className="text-xs text-gray-600">
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Time: {new Date().toLocaleTimeString()}</p>
            </div>
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
