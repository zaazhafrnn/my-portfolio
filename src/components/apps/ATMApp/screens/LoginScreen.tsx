import { useState } from "react";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [pin, setPin] = useState("");
  const [cardInserted, setCardInserted] = useState(false);

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const clearPin = () => setPin("");

  const handleLogin = () => {
    if (pin.length === 4) {
      onLogin();
    }
  };

  return (
    <div className="flex-1 bg-blue-900 text-white p-8 flex flex-col">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">WELCOME TO ATM</h1>
        <div className="text-yellow-300 text-lg">BANK OF INDONESIA</div>
      </div>

      {!cardInserted ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg mb-6 animate-pulse">
            <div className="w-64 h-4 bg-gray-600 rounded mb-2"></div>
            <div className="w-48 h-4 bg-gray-600 rounded"></div>
          </div>
          <p className="text-xl mb-4">Please insert your card</p>
          <button
            onClick={() => setCardInserted(true)}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-bold"
          >
            INSERT CARD
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg mb-8">
            <p className="text-xl mb-6 text-center">Enter your PIN</p>
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border-2 border-white"
                  >
                    {pin.length > i && (
                      <div className="w-full h-full bg-white rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePinInput(num.toString())}
                  className="bg-gray-600 hover:bg-gray-500 p-3 rounded font-bold text-lg"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={clearPin}
                className="bg-red-600 hover:bg-red-500 p-3 rounded font-bold"
              >
                CLEAR
              </button>
              <button
                onClick={() => handlePinInput("0")}
                className="bg-gray-600 hover:bg-gray-500 p-3 rounded font-bold text-lg"
              >
                0
              </button>
              <button
                onClick={handleLogin}
                className="bg-green-600 hover:bg-green-700 p-3 rounded font-bold"
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
