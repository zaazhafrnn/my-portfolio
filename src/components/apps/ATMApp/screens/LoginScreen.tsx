import { useState } from "react";
import PinEntry from "../components/PinEntry";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [cardInserted, setCardInserted] = useState(false);

  return (
    <div className="flex-1 bg-[#1a365d] text-white flex flex-col overflow-hidden">
      <div className="text-center py-4">
        <h1 className="text-xl font-bold mb-1">WELCOME TO ATM</h1>
        <div className="text-yellow-300 text-sm">BANK OF INDONESIA</div>
      </div>

      {!cardInserted ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4 pt-20">
          <div className="bg-gray-800 p-4 rounded-lg mb-4 w-64 h-16 flex items-center justify-center">
            <div className="animate-pulse text-center">
              <div className="w-48 h-2 bg-gray-600 rounded" />
            </div>
          </div>
          <p className="text-lg mb-4 text-center">Please insert your card</p>
          <button
            onClick={() => setCardInserted(true)}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-bold transition-colors"
          >
            INSERT CARD
          </button>
        </div>
      ) : (
        <PinEntry onSuccess={onLogin} />
      )}
    </div>
  );
}
