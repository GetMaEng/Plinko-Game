import React from 'react'

type ToggleSwitchProps = {
  enabled: boolean;
  onToggle: () => void;
};


function ToggleSwitch({enabled, onToggle,}: ToggleSwitchProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative w-11 h-6 rounded-full transition-colors duration-300
        ${enabled ? "bg-[#39FE2B]" : "bg-[#94A3B8]"}
      `}
    >
      <span
        className={`
          absolute top-0.5 left-0.5
          w-5 h-5 bg-black rounded-full
          transition-transform duration-300
          ${enabled ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  )
}

export default ToggleSwitch