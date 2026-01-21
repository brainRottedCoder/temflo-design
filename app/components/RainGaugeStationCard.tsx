interface RainGaugeStationCardProps {
    title: string;
    rainfallHR: string;
    rainfallTotal: string;
    color?: 'blue' | 'green' | 'orange' | 'yellow';
    isSelected?: boolean;
    onClick?: () => void;
}

const colorConfig = {
    blue: {
        bg: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
        solid: '#3B82F6',
        border: '#1D4ED8',
    },
    green: {
        bg: 'linear-gradient(135deg, #A3E635 0%, #84CC16 100%)',
        solid: '#84CC16',
        border: '#4D7C0F',
    },
    orange: {
        bg: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)',
        solid: '#F97316',
        border: '#C2410C',
    },
    yellow: {
        bg: 'linear-gradient(135deg, #FDE047 0%, #FACC15 100%)',
        solid: '#FACC15',
        border: '#A16207',
    },
};

export default function RainGaugeStationCard({
    title,
    rainfallHR = '00',
    rainfallTotal = '00',
    color = 'blue',
    isSelected = false,
    onClick,
}: RainGaugeStationCardProps) {
    const config = colorConfig[color];

    return (
        <div
            className={`rounded-2xl 2xl:rounded-3xl px-3 2xl:px-4 py-2 2xl:py-3 text-white h-full flex flex-col overflow-hidden transition-all cursor-pointer ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
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
            <h3 className="text-base 2xl:text-xl font-bold leading-tight mb-1 2xl:mb-2">{title}</h3>

            {/* Labels Row */}
            <div className="grid grid-cols-2 gap-1 2xl:gap-2 text-center flex-1">
                <div className="flex flex-col justify-center">
                    <span className="text-md 2xl:text-lg font-semibold opacity-95">Rainfall - HR</span>
                    <span className="text-xs 2xl:text-sm font-medium opacity-80">(mm)</span>
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-md 2xl:text-lg font-semibold opacity-95">Rainfall - Total</span>
                    <span className="text-xs 2xl:text-sm font-medium opacity-80">(mm)</span>
                </div>
            </div>

            {/* Values Row */}
            <div className="grid grid-cols-2 gap-1 2xl:gap-2 text-center mt-auto">
                <div className="text-2xl 2xl:text-4xl font-bold leading-none">{rainfallHR}</div>
                <div className="text-2xl 2xl:text-4xl font-bold leading-none">{rainfallTotal}</div>
            </div>
        </div>
    );
}
