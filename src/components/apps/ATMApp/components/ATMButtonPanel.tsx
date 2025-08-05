import { ScreenType } from "@/types";

interface ATMButtonPanelProps {
  side: "left" | "right";
  screen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  transferStep?: string | null; // NEW
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
    left: [{}, {}, {}, {}],
    right: [{}, {}, { label: "6", screen: "home" }, {}],
  },
  mutation: {
    left: [{}, {}, {}, {}],
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
  deposit: {
    left: [
      {},
      { label: "1", clickTargetId: "deposit-50000" },
      { label: "2", clickTargetId: "deposit-100000" },
      { label: "3", clickTargetId: "deposit-250000" },
    ],
    right: [
      { label: "4", clickTargetId: "deposit-500000" },
      { label: "5", clickTargetId: "deposit-1000000" },
      { label: "6", screen: "home" },
      {},
    ],
  },
  transfer: { left: [], right: [] }, // handled dynamically
};

// NEW – dynamic buttons based on transfer step
const getTransferButtonMap = (
  side: "left" | "right",
  step: string | null,
): ButtonConfig[] => {
  if (step === "type" || !step) {
    return side === "left"
      ? [
          { label: "1", clickTargetId: "transfer-type-1" },
          { label: "2", clickTargetId: "transfer-type-2" },
          { label: "3", clickTargetId: "transfer-type-3" },
          {},
        ]
      : [
          { label: "4", clickTargetId: "transfer-type-4" },
          { label: "5", clickTargetId: "transfer-type-5" },
          { label: "6", clickTargetId: "transfer-cancel" },
          {},
        ];
  }

  if (step === "amount") {
    return side === "left"
      ? [
          { label: "1", clickTargetId: "transfer-amount-1" },
          { label: "2", clickTargetId: "transfer-amount-2" },
          { label: "3", clickTargetId: "transfer-amount-3" },
          {},
        ]
      : [
          { label: "4", clickTargetId: "transfer-amount-4" },
          { label: "5", clickTargetId: "transfer-amount-5" },
          { label: "6", clickTargetId: "transfer-cancel" },
          {},
        ];
  }

  return Array(4).fill({});
};

export default function ATMButtonPanel({
  side,
  screen,
  onNavigate,
  transferStep,
}: ATMButtonPanelProps) {
  const buttons =
    screen === "transfer"
      ? getTransferButtonMap(side, transferStep as string)
      : (buttonMap[screen]?.[side] ?? []);

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
          />
        ))}
    </div>
  );
}
