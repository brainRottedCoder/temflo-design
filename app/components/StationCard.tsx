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
    border: '#1D4ED8', // Darker blue for border
  },
  green: {
    bg: 'linear-gradient(135deg, #A3E635 0%, #84CC16 100%)',
    solid: '#84CC16',
    border: '#4D7C0F', // Darker green for border
  },
  orange: {
    bg: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)',
    solid: '#F97316',
    border: '#C2410C', // Darker orange for border
  },
  yellow: {
    bg: 'linear-gradient(135deg, #FDE047 0%, #FACC15 100%)',
    solid: '#FACC15',
    border: '#A16207', // Darker yellow/amber for border
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
      className={`rounded-2xl 2xl:rounded-3xl px-3 2xl:px-4 py-2 2xl:py-3 text-white h-full flex flex-col overflow-hidden transition-all cursor-pointer ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'
        }`}
      style={{
        background: config.bg,
        boxShadow: isSelected
          ? `0 8px 20px ${config.solid}50`
          : `0 4px 12px ${config.solid}30`,
        minHeight: 0,
        border: isSelected ? `3px solid ${config.border}` : '3px solid transparent',
      }}
      onClick={onClick}
    >
      {/* Title */}
      <div className="flex items-center justify-center mb-2 border-2 border-white bg-white rounded-lg 2xl:mb-3 ">
        <h3
          className="text-base 2xl:text-xl px-4 2xl:px-5 py-1 2xl:py-1.5 rounded-lg 2xl:rounded-xl font-bold text-gray-800 "
        >
          {title}
        </h3>
      </div>

      {/* Labels Row */}
      <div className="grid grid-cols-3 gap-1 2xl:gap-2 text-center flex-1">
        <div className="flex flex-col justify-center">
          <span className="text-md 2xl:text-lg font-semibold opacity-95">Discharge</span>
          <span className="text-xs 2xl:text-sm font-medium opacity-80">(m<sup>3</sup>/s)</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-md 2xl:text-lg font-semibold opacity-95">Velocity</span>
          <span className="text-xs 2xl:text-sm font-medium opacity-80">(m/s)</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-md 2xl:text-lg font-semibold opacity-95">Water Level</span>
          <span className="text-xs 2xl:text-sm font-medium opacity-80">(m)</span>
        </div>
      </div>

      {/* Values Row */}
      <div className="grid grid-cols-3 gap-1 2xl:gap-2 text-center mt-auto">
        <div className="text-2xl 2xl:text-4xl font-bold leading-none">{discharge}</div>
        <div className="text-2xl 2xl:text-4xl font-bold leading-none">{velocity}</div>
        <div className="text-2xl 2xl:text-4xl font-bold leading-none">{waterLevel}</div>
      </div>
    </div>
  );
}
