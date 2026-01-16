import WeatherStationCard from '../WeatherStationCard';

export default function AutomaticWeatherContent() {
    return (
        <div className="flex flex-col min-h-0">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#303030' }}>
                Automatic Weather Stations
            </h2>
            <div className="flex flex-col gap-1.5 flex-1 justify-between">
                <WeatherStationCard
                    title="Syana Chatti Yamuna River"
                    windSpeed="03"
                    windDirection="03"
                    temperature="03"
                    relativeHumidity="03"
                    airPressure="03"
                    solarRadiation="03"
                    rainfallHR="03"
                    rainfallDay="03"
                    rainfallTotal="03"
                />
                <WeatherStationCard
                    title="Syana Chatti Yamuna River"
                    windSpeed="03"
                    windDirection="03"
                    temperature="03"
                    relativeHumidity="03"
                    airPressure="03"
                    solarRadiation="03"
                    rainfallHR="03"
                    rainfallDay="03"
                    rainfallTotal="03"
                />
                <WeatherStationCard
                    title="Syana Chatti Yamuna River"
                    windSpeed="03"
                    windDirection="03"
                    temperature="03"
                    relativeHumidity="03"
                    airPressure="03"
                    solarRadiation="03"
                    rainfallHR="03"
                    rainfallDay="03"
                    rainfallTotal="03"
                />
            </div>
        </div>
    );
}
