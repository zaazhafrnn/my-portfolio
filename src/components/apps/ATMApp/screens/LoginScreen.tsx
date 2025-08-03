import { useState } from "react";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [pin, setPin] = useState("");
  const [cardInserted, setCardInserted] = useState(false);

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) setPin(pin + digit);
  };

  const clearPin = () => setPin("");

  const handleLogin = () => {
    if (pin.length === 4) onLogin();
  };

  return (
    <div className="flex-1 bg-[#1a365d] text-white flex flex-col overflow-hidden">
      <div className="text-center py-4">
        <h1 className="text-xl font-bold mb-1">WELCOME TO ATM</h1>
        <div className="text-yellow-300 text-sm">BANK OF INDONESIA</div>
      </div>

      {!cardInserted ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-gray-800 p-4 rounded-lg mb-4 w-64 h-16 flex items-center justify-center">
            <div className="animate-pulse text-center">
              <div className="w-48 h-2 bg-gray-600 rounded mb-2" />
              <div className="w-32 h-2 bg-gray-600 rounded" />
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
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-gray-800 p-6 rounded-lg w-80">
            <p className="text-lg mb-4 text-center">Enter your PIN</p>

            <div className="flex justify-center mb-4 space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full border-2 border-white"
                >
                  {pin.length > i && (
                    <div className="w-full h-full bg-white rounded-full" />
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[...Array(9)].map((_, i) => {
                const digit = (i + 1).toString();
                return (
                  <button
                    key={digit}
                    onClick={() => handlePinInput(digit)}
                    className="bg-gray-600 hover:bg-gray-500 p-3 rounded font-bold text-lg transition-colors"
                  >
                    {digit}
                  </button>
                );
              })}
              <button
                onClick={clearPin}
                className="bg-red-600 hover:bg-red-500 p-3 rounded font-bold text-sm transition-colors"
              >
                CLEAR
              </button>
              <button
                onClick={() => handlePinInput("0")}
                className="bg-gray-600 hover:bg-gray-500 p-3 rounded font-bold text-lg transition-colors"
              >
                0
              </button>
              <button
                onClick={handleLogin}
                disabled={pin.length !== 4}
                className="bg-green-600 hover:bg-green-700 p-3 rounded font-bold text-sm transition-colors disabled:opacity-50"
              >
                ENTER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
