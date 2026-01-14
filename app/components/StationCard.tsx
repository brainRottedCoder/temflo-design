interface StationCardProps {
  title: string;
  discharge: string;
  velocity: string;
  waterLevel: string;
  color: 'blue' | 'orange' | 'green' | 'yellow';
}

const colorConfig = {
  blue: {
    bg: '#3b82f6',
    shadow: '0 6px 16px rgba(59,130,246,0.3)',
  },
  green: {
    bg: '#8ac53e',
    shadow: '0 6px 16px rgba(138,197,62,0.3)',
  },
  orange: {
    bg: '#ff993a',
    shadow: '0 6px 16px rgba(255,153,58,0.3)',
  },
  yellow: {
    bg: '#ffd143',
    shadow: '0 6px 16px rgba(255,209,67,0.3)',
  },
};

export default function StationCard({
  title,
  discharge,
  velocity,
  waterLevel,
  color,
}: StationCardProps) {
  const config = colorConfig[color];

  return (
    <div
      className="rounded-[12px] px-3 py-2 text-white h-full flex flex-col"
      style={{ backgroundColor: config.bg, boxShadow: config.shadow }}
    >
      <h3 className="text-sm font-bold mb-1.5 leading-tight">{title}</h3>
      <div className="grid grid-cols-3 gap-1 text-center">
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold opacity-95">Discharge</span>
          <span className="text-[9px] font-medium opacity-80">(m3/s)</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold opacity-95">Velocity</span>
          <span className="text-[9px] font-medium opacity-80">(m/s)</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold opacity-95">Water Level</span>
          <span className="text-[9px] font-medium opacity-80">(m)</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 text-center mt-1">
        <div className="text-xl font-bold leading-none">{discharge}</div>
        <div className="text-xl font-bold leading-none">{velocity}</div>
        <div className="text-xl font-bold leading-none">{waterLevel}</div>
      </div>
    </div>
  );
}