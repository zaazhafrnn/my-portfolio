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
      <div className="bg-gray-800 p-4 rounded-lg w-64">
        <p className="text-base mb-1 text-center font-bold">{title}</p>
        {subtitle && (
          <p className="text-xs mb-2 text-center text-gray-300">{subtitle}</p>
        )}
        <div className="flex justify-center mb-3 space-x-1.5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full border-2 border-white"
            >
              {pin.length > i && (
                <div className="w-full h-full bg-white rounded-full" />
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {[...Array(9)].map((_, i) => {
            const digit = (i + 1).toString();
            return (
              <button
                key={digit}
                onClick={() => handlePinInput(digit)}
                className="bg-gray-600 hover:bg-gray-500 p-2 rounded font-bold text-base transition-colors"
              >
                {digit}
              </button>
            );
          })}
          <button
            onClick={clearPin}
            className="bg-red-600 hover:bg-red-500 p-2 rounded font-bold text-xs transition-colors"
          >
            CLEAR
          </button>
          <button
            onClick={() => handlePinInput("0")}
            className="bg-gray-600 hover:bg-gray-500 p-2 rounded font-bold text-base transition-colors"
          >
            0
          </button>
          <button
            onClick={handleSubmit}
            disabled={pin.length !== 4}
            className="bg-green-600 hover:bg-green-700 p-2 rounded font-bold text-xs transition-colors disabled:opacity-50"
          >
            ENTER
          </button>
        </div>
      </div>
    </div>
  );
}
