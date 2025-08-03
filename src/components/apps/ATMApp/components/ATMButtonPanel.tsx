import { ScreenType } from "@/types";

interface ATMButtonPanelProps {
  side: "left" | "right";
  screen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

type ButtonConfig = {
  label?: string;
  screen?: ScreenType;
  clickTargetId?: string;
  color?: "blue" | "green" | "red";
  disabled?: boolean;
};

const buttonMap: Record<
  ScreenType,
  { left: ButtonConfig[]; right: ButtonConfig[] }
> = {
  login: {
    left: Array(4).fill({}),
    right: Array(4).fill({}),
  },
  home: {
    left: [
      { label: "1", screen: "balance", color: "blue" },
      { label: "2", screen: "withdraw", color: "blue" },
      { label: "3", screen: "deposit", color: "blue" },
      {},
    ],
    right: [
      { label: "4", screen: "transfer", color: "blue" },
      { label: "5", screen: "mutation", color: "blue" },
      { label: "6", screen: "login", color: "red" },
      {},
    ],
  },
  balance: {
    left: [{ label: "1", screen: "home", color: "green" }, {}, {}, {}],
    right: [{}, {}, { label: "6", screen: "home", color: "red" }, {}],
  },
  mutation: {
    left: [{ label: "1", screen: "home", color: "green" }, {}, {}, {}],
    right: [{}, {}, { label: "6", screen: "home", color: "red" }, {}],
  },
  withdraw: {
    left: [
      { label: "1", clickTargetId: "withdraw-50000", color: "green" },
      { label: "2", clickTargetId: "withdraw-100000", color: "green" },
      { label: "3", clickTargetId: "withdraw-250000", color: "green" },
      {},
    ],
    right: [
      { label: "4", clickTargetId: "withdraw-500000", color: "green" },
      { label: "5", clickTargetId: "withdraw-1000000", color: "green" },
      { label: "6", screen: "home", color: "red" },
      {},
    ],
  },
  transfer: {
    left: [
      { label: "1", clickTargetId: "transfer-option-1", color: "green" },
      { label: "2", clickTargetId: "transfer-option-2", color: "green" },
      {},
      {},
    ],
    right: [
      { label: "4", clickTargetId: "transfer-option-3", color: "green" },
      {},
      { label: "6", screen: "home", color: "red" },
      {},
    ],
  },
  deposit: {
    left: [
      { label: "1", clickTargetId: "deposit-100000", color: "green" },
      { label: "2", clickTargetId: "deposit-250000", color: "green" },
      {},
      {},
    ],
    right: [
      { label: "4", clickTargetId: "deposit-500000", color: "green" },
      { label: "5", clickTargetId: "deposit-1000000", color: "green" },
      { label: "6", screen: "home", color: "red" },
      {},
    ],
  },
};

export default function ATMButtonPanel({
  side,
  screen,
  onNavigate,
}: ATMButtonPanelProps) {
  const buttons = buttonMap[screen]?.[side] ?? [];

  const handleClick = (config: ButtonConfig) => {
    if (config.clickTargetId) {
      const el = document.getElementById(
        config.clickTargetId,
      ) as HTMLButtonElement;
      el?.click();
    } else if (config.screen) {
      onNavigate(config.screen);
    }
  };

  const getButtonClasses = (color: string = "gray") =>
    `w-12 h-8 rounded-sm border border-gray-400 shadow-md active:shadow-inner transition-all flex items-center justify-center ${
      color === "blue"
        ? "bg-blue-600 hover:bg-blue-500"
        : color === "green"
          ? "bg-green-600 hover:bg-green-500"
          : color === "red"
            ? "bg-red-600 hover:bg-red-500"
            : "bg-gray-600"
    }`;

  return (
    <div
      className={`flex flex-col justify-center space-y-2 ${side === "left" ? "mr-2" : "ml-2"}`}
    >
      {buttons.map((btn, idx) =>
        btn.label ? (
          <button
            key={idx}
            onClick={() => handleClick(btn)}
            className={getButtonClasses(btn.color)}
          >
            <span className="text-white text-xs font-bold">{btn.label}</span>
          </button>
        ) : (
          <div
            key={idx}
            className="bg-gray-600 w-12 h-8 rounded-sm border border-gray-500 shadow-inner opacity-50"
          ></div>
        ),
      )}
    </div>
  );
}
