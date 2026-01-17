import React from 'react';
import CompactChart from '../CompactChart';
import { getWeatherStatistics } from '../../services/dataService';

// Get data from the data service
const weatherStats = getWeatherStatistics();

export default function WeatherStatistics() {
    return (
        <div className="flex flex-col min-h-0">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#303030' }}>
                {weatherStats.sectionTitle}
            </h2>
            <div className="grid grid-cols-3 grid-rows-3 gap-2 flex-1">
                {weatherStats.stations.map((station, index) => (
                    <React.Fragment key={`station-${index}`}>
                        <CompactChart
                            title="Wind Speed"
                            riverName={station.name}
                            data={station.data.windSpeed}
                            maxValue={weatherStats.maxValue}
                        />
                        <CompactChart
                            title="Humidity"
                            riverName={station.name}
                            data={station.data.humidity}
                            maxValue={weatherStats.maxValue}
                        />
                        <CompactChart
                            title="Temperature"
                            riverName={station.name}
                            data={station.data.temperature}
                            maxValue={weatherStats.maxValue}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
