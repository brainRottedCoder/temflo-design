import WeatherStationCard from '../WeatherStationCard';
import { getWeatherStations } from '../../services/dataService';

// Get data from the data service
const weatherData = getWeatherStations();

export default function AutomaticWeatherContent() {
    return (
        <div className="flex flex-col min-h-0">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#303030' }}>
                {weatherData.sectionTitle}
            </h2>
            <div className="flex flex-col gap-1.5 flex-1 justify-between">
                {weatherData.stations.map((station) => (
                    <WeatherStationCard
                        key={station.id}
                        title={station.title}
                        windSpeed={station.windSpeed}
                        windDirection={station.windDirection}
                        temperature={station.temperature}
                        relativeHumidity={station.relativeHumidity}
                        airPressure={station.airPressure}
                        solarRadiation={station.solarRadiation}
                        rainfallHR={station.rainfallHR}
                        rainfallDay={station.rainfallDay}
                        rainfallTotal={station.rainfallTotal}
                    />
                ))}
            </div>
        </div>
    );
}
