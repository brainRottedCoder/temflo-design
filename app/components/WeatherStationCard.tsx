interface WeatherStationCardProps {
    title: string;
    windSpeed: string;
    windDirection: string;
    temperature: string;
    relativeHumidity: string;
    airPressure: string;
    solarRadiation: string;
    rainfallHR: string;
    rainfallDay: string;
    rainfallTotal: string;
    color?: 'blue' | 'green' | 'orange';
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
};

export default function WeatherStationCard({
    title,
    windSpeed = '03',
    windDirection = '03',
    temperature = '03',
    relativeHumidity = '03',
    airPressure = '03',
    solarRadiation = '03',
    rainfallHR = '03',
    rainfallDay = '03',
    rainfallTotal = '03',
    color = 'blue',
    isSelected = false,
    onClick,
}: WeatherStationCardProps) {
    const config = colorConfig[color];

    return (
        <div
            className={`rounded-[12px] 2xl:rounded-[18px] px-3 2xl:px-4 py-2 2xl:py-3 h-full flex flex-col transition-all cursor-pointer ${isSelected ? 'scale-[1.01]' : 'hover:scale-[1.005]'}`}
            style={{
                background: config.bg,
                boxShadow: isSelected
                    ? `0 8px 20px ${config.solid}50`
                    : `0 4px 12px ${config.solid}30`,
                border: isSelected ? `3px solid ${config.border}` : '3px solid transparent',
            }}
            onClick={onClick}
        >
            <div className="flex items-center gap-2 mb-2 2xl:mb-3 text-black bg-white justify-center align-center">
                <h3 className="text-base 2xl:text-xl px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-md 2xl:rounded-lg font-bold ">
                    {title}
                </h3>
            </div>

            <div className="grid grid-cols-3 gap-x-4 2xl:gap-x-6 gap-y-1 2xl:gap-y-2 flex-1 content-center">
                {/* Column 1 */}
                <div className="flex flex-col gap-1 2xl:gap-2">
                    <div className="flex items-baseline gap-2 2xl:gap-3">
                        <span className="text-xs 2xl:text-sm text-white/85">Wind Speed (m/s)</span>
                        <span className="text-2xl 2xl:text-4xl font-bold text-white">{windSpeed}</span>
                    </div>
                    <div className="flex items-baseline gap-2 2xl:gap-3">
                        <span className="text-xs 2xl:text-sm text-white/85">Wind Direction (N)</span>
                        <span className="text-2xl 2xl:text-4xl font-bold text-white">{windDirection}</span>
                    </div>
                    <div className="flex items-baseline gap-2 2xl:gap-3">
                        <span className="text-xs 2xl:text-sm text-white/85">Temperature (C)</span>
                        <span className="text-2xl 2xl:text-4xl font-bold text-white">{temperature}</span>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-1 2xl:gap-2">
                    <div className="flex items-baseline gap-2 2xl:gap-3">
                        <span className="text-xs 2xl:text-sm text-white/85">Relative Humidity (%RH)</span>
                        <span className="text-2xl 2xl:text-4xl font-bold text-white">{relativeHumidity}</span>
                    </div>
                    <div className="flex items-baseline gap-2 2xl:gap-3">
                        <span className="text-xs 2xl:text-sm text-white/85">Air Pressure (hPa)</span>
                        <span className="text-2xl 2xl:text-4xl font-bold text-white">{airPressure}</span>
                    </div>
                    <div className="flex items-baseline gap-2 2xl:gap-3">
                        <span className="text-xs 2xl:text-sm text-white/85">Solar Radiation (nm)</span>
                        <span className="text-2xl 2xl:text-4xl font-bold text-white">{solarRadiation}</span>
                    </div>
                </div>

                {/* Column 3 */}
                <div className="flex flex-col gap-1 2xl:gap-2">
                    <div className="flex items-baseline gap-2 2xl:gap-3">
                        <span className="text-xs 2xl:text-sm text-white/85">Rainfall - HR (mm)</span>
                        <span className="text-2xl 2xl:text-4xl font-bold text-white">{rainfallHR}</span>
                    </div>
                    <div className="flex items-baseline gap-2 2xl:gap-3">
                        <span className="text-xs 2xl:text-sm text-white/85">Rainfall - Day (mm)</span>
                        <span className="text-2xl 2xl:text-4xl font-bold text-white">{rainfallDay}</span>
                    </div>
                    <div className="flex items-baseline gap-2 2xl:gap-3">
                        <span className="text-xs 2xl:text-sm text-white/85">Rainfall - Total (mm)</span>
                        <span className="text-2xl 2xl:text-4xl font-bold text-white">{rainfallTotal}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
