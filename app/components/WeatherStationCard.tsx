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
}

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
}: WeatherStationCardProps) {
    return (
        <div
            className="rounded-[12px] 2xl:rounded-[18px] px-3 2xl:px-4 py-2 2xl:py-3 h-full flex flex-col"
            style={{
                backgroundColor: '#3b82f6',
                boxShadow: '0 6px 16px rgba(59,130,246,0.3)',
                borderLeft: '5px solid #1d4ed8'
            }}
        >
            <h3 className="text-lg 2xl:text-2xl font-bold mb-2 2xl:mb-3 text-white">{title}</h3>

            <div className="grid grid-cols-3 gap-x-4 2xl:gap-x-6 gap-y-1 2xl:gap-y-2 flex-1 content-center">
                {/* Column 1 */}
                <div className="flex flex-col gap-1 2xl:gap-2">
                    <div className="flex items-baseline gap-2 2xl:gap-3">
                        <span className="text-xs 2xl:text-sm text-white/85">Wind Speed (m3/s)</span>
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
