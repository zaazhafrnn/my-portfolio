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
      { label: "1", screen: "balance" },
      { label: "2", screen: "withdraw" },
      { label: "3", screen: "deposit" },
      {},
    ],
    right: [
      { label: "4", screen: "transfer" },
      { label: "5", screen: "mutation" },
      { label: "6", screen: "login" },
      {},
    ],
  },
  balance: {
    left: [{ label: "1", screen: "home" }, {}, {}, {}],
    right: [{}, {}, { label: "6", screen: "home" }, {}],
  },
  mutation: {
    left: [{ label: "1", screen: "home" }, {}, {}, {}],
    right: [{}, {}, { label: "6", screen: "home" }, {}],
  },
  withdraw: {
    left: [
      { label: "1", clickTargetId: "withdraw-50000" },
      { label: "2", clickTargetId: "withdraw-100000" },
      { label: "3", clickTargetId: "withdraw-250000" },
      {},
    ],
    right: [
      { label: "4", clickTargetId: "withdraw-500000" },
      { label: "5", clickTargetId: "withdraw-1000000" },
      { label: "6", screen: "home" },
      {},
    ],
  },
  transfer: {
    left: [
      { label: "1", clickTargetId: "transfer-option-1" },
      { label: "2", clickTargetId: "transfer-option-2" },
      {},
      {},
    ],
    right: [
      { label: "4", clickTargetId: "transfer-option-3" },
      {},
      { label: "6", screen: "home" },
      {},
    ],
  },
  deposit: {
    left: [
      { label: "1", clickTargetId: "deposit-100000" },
      { label: "2", clickTargetId: "deposit-250000" },
      {},
      {},
    ],
    right: [
      { label: "4", clickTargetId: "deposit-500000" },
      { label: "5", clickTargetId: "deposit-1000000" },
      { label: "6", screen: "home" },
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

  return (
    <div
      className={`flex flex-col justify-center space-y-12 mb-8 ${
        side === "left" ? "mr-2" : "ml-2"
      }`}
    >
      {[...buttons]
        .map((btn, idx) => ({ ...btn, _idx: idx }))
        .sort((a, b) => {
          if (!a.label && b.label) return -1;
          if (a.label && !b.label) return 1;
          return 0;
        })
        .map((btn) => (
          <button
            key={btn._idx}
            onClick={() => handleClick(btn)}
            disabled={!btn.label}
            className="bg-gray-600 w-12 h-16 rounded-sm border border-gray-500 shadow-inner opacity-100 active:shadow-inner transition-all"
          >
            {btn.label && (
              <span className="text-white text-xs font-bold">{btn.label}</span>
            )}
          </button>
        ))}
    </div>
  );
}
