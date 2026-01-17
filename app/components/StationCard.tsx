interface StationCardProps {
  title: string;
  discharge: string;
  velocity: string;
  waterLevel: string;
  color: 'blue' | 'orange' | 'green' | 'yellow';
  isSelected?: boolean;
  onClick?: () => void;
}

const colorConfig = {
  blue: {
    bg: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
    solid: '#3B82F6',
  },
  green: {
    bg: 'linear-gradient(135deg, #A3E635 0%, #84CC16 100%)',
    solid: '#84CC16',
  },
  orange: {
    bg: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)',
    solid: '#F97316',
  },
  yellow: {
    bg: 'linear-gradient(135deg, #FDE047 0%, #FACC15 100%)',
    solid: '#FACC15',
  },
};

export default function StationCard({
  title,
  discharge,
  velocity,
  waterLevel,
  color,
  isSelected = false,
  onClick,
}: StationCardProps) {
  const config = colorConfig[color];

  return (
    <div
      className={`rounded-2xl px-3 py-2 text-white h-full flex flex-col overflow-hidden transition-all cursor-pointer ${isSelected ? 'ring-4 ring-purple-500 ring-offset-2 scale-[1.02]' : 'hover:scale-[1.01]'
        }`}
      style={{
        background: config.bg,
        boxShadow: isSelected
          ? `0 8px 20px ${config.solid}50`
          : `0 4px 12px ${config.solid}30`,
        minHeight: 0,
      }}
      onClick={onClick}
    >
      {/* Title */}
      <h3 className="text-base font-bold leading-tight mb-1">{title}</h3>

      {/* Labels Row */}
      <div className="grid grid-cols-3 gap-1 text-center flex-1">
        <div className="flex flex-col justify-center">
          <span className="text-md font-semibold opacity-95">Discharge</span>
          <span className="text-xs font-medium opacity-80">(m3/s)</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-md font-semibold opacity-95">Velocity</span>
          <span className="text-xs font-medium opacity-80">(m/s)</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-md font-semibold opacity-95">Water Level</span>
          <span className="text-xs font-medium opacity-80">(m)</span>
        </div>
      </div>

      {/* Values Row */}
      <div className="grid grid-cols-3 gap-1 text-center mt-auto">
        <div className="text-2xl font-bold leading-none">{discharge}</div>
        <div className="text-2xl font-bold leading-none">{velocity}</div>
        <div className="text-2xl font-bold leading-none">{waterLevel}</div>
      </div>
    </div>
  );
}
