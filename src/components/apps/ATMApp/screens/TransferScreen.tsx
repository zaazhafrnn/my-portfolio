import { Check } from "lucide-react";
import { useState } from "react";
import PinEntry from "../components/PinEntry";

interface TransferScreenProps {
  onBack: () => void;
  setStep: (step: string) => void;
}

export default function TransferScreen({
  onBack,
  setStep,
}: TransferScreenProps) {
  const [step, setLocalStep] = useState<
    "type" | "input" | "amount" | "pin" | "success"
  >("type");

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const types = [
    "SAME BANK",
    "OTHER BANK",
    "VIRTUAL ACCOUNT",
    "ELECTRIC BILLS",
    "ASSURANCE",
  ];
  const amounts = [50000, 100000, 250000, 500000, 1000000];

  const updateStep = (newStep: typeof step) => {
    setLocalStep(newStep);
    setStep(newStep);
  };

  const handleNextFromType = (type: string) => {
    setSelectedType(type);
    updateStep("input");
  };

  const handleConfirmInput = () => {
    if (inputValue.trim()) {
      updateStep("amount");
    }
  };

  const handleAmountConfirm = () => {
    if (selectedAmount) {
      updateStep("pin");
    }
  };

  const handlePinSuccess = () => {
    updateStep("success");
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const handleNumberInput = (digit: string) => {
    const isTokenInput =
      selectedType === "ELECTRIC BILLS" || selectedType === "ASSURANCE";
    const maxLength = isTokenInput ? 8 : 6;

    if (inputValue.length < maxLength) {
      setInputValue(inputValue + digit);
    }
  };

  const clearInput = () => setInputValue("");

  // --- Step: SUCCESS
  if (step === "success" && selectedAmount) {
    return (
      <div className="h-full bg-[#1a365d] text-white flex flex-col overflow-hidden">
        <div className="text-center py-3">
          <h2 className="text-lg font-bold mb-1">TRANSFER SUCCESSFUL</h2>
          <div className="text-yellow-300 text-xs">Transfer Complete</div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center text-green-400 mb-3">
              <Check size={64} />
            </div>
            <p className="text-base mb-2">To: {selectedType}</p>
            <p className="text-xl font-bold text-green-400 mb-3">
              Rp {selectedAmount.toLocaleString()}
            </p>
            <p className="text-xs text-gray-300">Returning to main menu...</p>
          </div>
        </div>
      </div>
    );
  }

  // --- Step: PIN ENTRY
  if (step === "pin" && selectedAmount) {
    return (
      <div className="mt-16">
        <PinEntry
          onSuccess={handlePinSuccess}
          title="Confirm Transfer"
          subtitle={`Transfer Rp ${selectedAmount.toLocaleString()}`}
        />
      </div>
    );
  }

  // --- Step: TRANSFER TYPE
  if (step === "type") {
    return (
      <div className="h-full bg-[#1a365d] text-white flex flex-col overflow-hidden">
        <div className="text-center py-3">
          <h2 className="text-lg font-bold mb-1">TRANSFER DESTINATION</h2>
          <div className="text-yellow-300 text-xs">
            Choose where to transfer
          </div>
        </div>

        <div className="flex-1 flex justify-between items-stretch -mb-11">
          <div className="flex flex-col justify-evenly text-left">
            {types.slice(0, 3).map((type, index) => (
              <button
                key={type}
                id={`transfer-type-${index + 1}`}
                onClick={() => handleNextFromType(type)}
                className="flex w-fit p-2 rounded-md border border-green-500"
              >
                <div className="flex items-center pr-4">{`<<<`}</div>
                <div className="text-xs font-bold">{type}</div>
              </button>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-center text-center px-4">
            <div>
              <div className="text-4xl mb-2">📤</div>
              <p className="text-xs text-gray-300">
                Please select destination for this transfer.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-evenly items-end text-right">
            {types.slice(3).map((type, index) => (
              <button
                key={type}
                id={`transfer-type-${index + 4}`}
                onClick={() => handleNextFromType(type)}
                className="flex p-2 w-fit rounded-md border border-green-500"
              >
                <div className="text-xs font-bold">{type}</div>
                <div className="flex items-center pl-4">{`>>>`}</div>
              </button>
            ))}
            <button
              id="transfer-cancel"
              onClick={onBack}
              className="flex p-2 rounded-md border w-fit border-red-400"
            >
              <div className="text-xs font-bold">CANCEL</div>
              <div className="flex items-center pl-4">{`>>>`}</div>
            </button>
          </div>
        </div>

        <div className="text-center py-2 text-xs text-gray-400">
          Use touchscreen or physical buttons to choose transfer type (1-6)
        </div>
      </div>
    );
  }

  // --- Step: ACCOUNT / TOKEN INPUT
  if (step === "input") {
    const isTokenInput =
      selectedType === "ELECTRIC BILLS" || selectedType === "ASSURANCE";
    const maxLength = isTokenInput ? 8 : 6;

    return (
      <div className="h-full bg-[#1a365d] text-white flex flex-col overflow-hidden">
        <div className="text-center py-3">
          <h2 className="text-lg font-bold mb-1">
            {isTokenInput ? "ENTER TOKEN" : "ACCOUNT NUMBER"}
          </h2>
          <div className="text-yellow-300 text-xs">For: {selectedType}</div>
        </div>

        <div className="flex-1 flex justify-center items-center flex-col px-4">
          <div className="bg-gray-800 p-6 rounded-lg w-80">
            <div className="text-center mb-4">
              <div className="bg-gray-700 border border-green-500 text-center text-white px-4 py-3 rounded text-sm min-h-[3rem] flex items-center justify-center">
                {inputValue ||
                  (isTokenInput ? "Enter Token" : "Enter Account Number")}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {inputValue.length}/{maxLength} characters
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[...Array(9)].map((_, i) => {
                const digit = (i + 1).toString();
                return (
                  <button
                    key={digit}
                    id={`input-digit-${digit}`}
                    onClick={() => handleNumberInput(digit)}
                    className="bg-gray-600 hover:bg-gray-500 p-3 rounded font-bold text-lg transition-colors"
                  >
                    {digit}
                  </button>
                );
              })}
              <button
                id="input-clear"
                onClick={clearInput}
                className="bg-red-600 hover:bg-red-500 p-3 rounded font-bold text-sm transition-colors"
              >
                CLEAR
              </button>
              <button
                id="input-digit-0"
                onClick={() => handleNumberInput("0")}
                className="bg-gray-600 hover:bg-gray-500 p-3 rounded font-bold text-lg transition-colors"
              >
                0
              </button>
              <button
                id="input-confirm"
                onClick={handleConfirmInput}
                disabled={!inputValue.trim()}
                className="bg-green-600 hover:bg-green-700 p-3 rounded font-bold text-sm transition-colors disabled:opacity-50"
              >
                ENTER
              </button>
            </div>
          </div>
        </div>

        <div className="text-center py-2 text-xs text-gray-400">
          Use keypad to input and confirm
        </div>
      </div>
    );
  }

  // --- Step: SELECT AMOUNT
  return (
    <div className="h-full bg-[#1a365d] text-white flex flex-col overflow-hidden">
      <div className="text-center py-3">
        <h2 className="text-lg font-bold mb-1">TRANSFER AMOUNT</h2>
        <div className="text-yellow-300 text-xs">To: {selectedType}</div>
      </div>

      <div className="flex-1 flex justify-between items-stretch -mb-11">
        <div className="flex flex-col justify-evenly text-left">
          {amounts.slice(0, 3).map((amt, index) => (
            <button
              key={amt}
              id={`transfer-amount-${index + 1}`}
              onClick={() => setSelectedAmount(amt)}
              className={`flex p-2 rounded-md border ${
                selectedAmount === amt
                  ? "border-green-400 bg-green-700"
                  : "border-green-500"
              }`}
            >
              <div className="flex items-center pr-4">{`<<<`}</div>
              <div className="text-xs font-bold">
                Rp {(amt / 1000).toLocaleString()}K
              </div>
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div className="text-4xl mb-2">💸</div>
          <p className="text-xs text-gray-300 mb-2">
            Selected: {selectedType} <br />
            Account/Token: <span className="text-green-400">{inputValue}</span>
          </p>
          {selectedAmount && (
            <div className="mt-2 p-2 bg-gray-800 border border-green-500 rounded">
              <p className="text-xs">Selected Amount:</p>
              <p className="text-base font-bold text-green-400">
                Rp {selectedAmount.toLocaleString()}
              </p>
            </div>
          )}
          {selectedAmount && (
            <button
              id="transfer-confirm"
              onClick={handleAmountConfirm}
              className="mt-4 bg-green-600 hover:bg-green-700 px-3 py-2 rounded font-bold text-xs transition-colors"
            >
              CONFIRM TRANSFER
            </button>
          )}
        </div>

        <div className="flex flex-col justify-evenly text-right">
          {amounts.slice(3).map((amt, index) => (
            <button
              key={amt}
              id={`transfer-amount-${index + 4}`}
              onClick={() => setSelectedAmount(amt)}
              className={`flex p-2 rounded-md border ${
                selectedAmount === amt
                  ? "border-green-400 bg-green-700"
                  : "border-green-500"
              }`}
            >
              <div className="text-xs font-bold">
                Rp {(amt / 1000).toLocaleString()}K
              </div>
              <div className="flex items-center pl-4">{`>>>`}</div>
            </button>
          ))}
          <button
            id="transfer-cancel"
            onClick={onBack}
            className="flex p-2 rounded-md border border-red-400"
          >
            <div className="text-xs font-bold">CANCEL</div>
            <div className="flex items-center pl-4">{`>>>`}</div>
          </button>
        </div>
      </div>

      <div className="text-center py-2 text-xs text-gray-400">
        Use touchscreen or physical buttons to select amount (1-6)
      </div>
    </div>
  );
}
