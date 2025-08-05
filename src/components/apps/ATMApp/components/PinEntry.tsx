import { useState } from "react";

interface PinEntryProps {
  onSuccess: () => void;
  title?: string;
  subtitle?: string;
}

export default function PinEntry({
  onSuccess,
  title = "Enter your PIN",
  subtitle,
}: PinEntryProps) {
  const [pin, setPin] = useState("");

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) setPin(pin + digit);
  };

  const clearPin = () => setPin("");

  const handleSubmit = () => {
    if (pin.length === 4) {
      onSuccess();
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 bg-[#1a365d] text-white">
      <div className="bg-gray-800 p-6 rounded-lg w-80">
        <p className="text-lg mb-1 text-center font-bold">{title}</p>
        {subtitle && (
          <p className="text-sm mb-3 text-center text-gray-300">{subtitle}</p>
        )}

        <div className="flex justify-center mb-4 space-x-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full border-2 border-white">
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
            onClick={handleSubmit}
            disabled={pin.length !== 4}
            className="bg-green-600 hover:bg-green-700 p-3 rounded font-bold text-sm transition-colors disabled:opacity-50"
          >
            ENTER
          </button>
        </div>
      </div>
    </div>
  );
}
