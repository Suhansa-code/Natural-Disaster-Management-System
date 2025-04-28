import React, { useState } from "react";

const SegmentedProgressBar = ({ segments, completed }) => {
  const [tooltip, setTooltip] = useState(null);

  const handleMouseEnter = (event, segment) => {
    const tooltipData = {
      label: segment.label, // Assuming each segment has a 'label'
      value: segment.value,
      position: {
        top: event.clientY + 10, // Slight offset for tooltip
        left: event.clientX,
      },
    };
    setTooltip(tooltipData);
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="relative w-full h-10 bg-gray-300 rounded-[3px] flex overflow-hidden mt-4">
      {segments.map((segment, index) => (
        <div
          key={index}
          className={`h-full transition-all duration-300 ${
            completed >= segment.value
              ? "bg-gradient-to-b from-green-400 to-green-600"
              : "bg-gradient-to-b from-gray-100 to-gray-200"
          }`}
          style={{ width: `${100 / segments.length}%` }}
          onMouseEnter={(e) => handleMouseEnter(e, segment)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
      {tooltip && <CustomTooltip tooltip={tooltip} />}
    </div>
  );
};

const CustomTooltip = ({ tooltip }) => {
  if (!tooltip) return null;

  return (
    <div
      className="absolute bg-white/10 backdrop-blur-md w-[120px] h-[60px] text-white px-3 py-2 rounded-xl shadow-lg border border-white/20 transition-all duration-100 transform scale-105 z-50"
      style={{
        top: tooltip.position.top,
        left: tooltip.position.left,
        transform: "translateX(-50%)", // To center the tooltip
      }}
    >
      <p className="text-xs uppercase tracking-wider text-text-primary">
        {tooltip.label}
      </p>
      <p className="text-[18px] font-semibold text-text-primary">
        {tooltip.value}
      </p>
    </div>
  );
};

export default SegmentedProgressBar;
