import React from 'react';
import CompactChart from '../CompactChart';
import { getWeatherStatistics } from '../../services/dataService';

// Get data from the data service
const weatherStats = getWeatherStatistics();

interface WeatherStatisticsProps {
    highlightedKeys?: string[];
    selectedTitles?: string[];
}

// Define chart configurations with colors
const chartConfigs = [
    { key: 'windSpeed', title: 'Wind Speed', color: '#8ac53e' },
    { key: 'windDirection', title: 'Wind Direction', color: '#3B82F6' },
    { key: 'temperature', title: 'Temperature', color: '#ff993a' },
    { key: 'relativeHumidity', title: 'Humidity', color: '#ffd143' },
    { key: 'airPressure', title: 'Air Pressure', color: '#6366F1' },
    { key: 'solarRadiation', title: 'Solar Radiation', color: '#F97316' },
    { key: 'rainfallHR', title: 'Rainfall HR', color: '#06B6D4' },
    { key: 'rainfallDay', title: 'Rainfall Day', color: '#14B8A6' },
    { key: 'rainfallTotal', title: 'Rainfall Total', color: '#8B5CF6' },
];

export default function WeatherStatistics({ highlightedKeys = [], selectedTitles = [] }: WeatherStatisticsProps) {
    return (
        <div className="flex flex-col min-h-0 h-full">
            <div className="flex items-center gap-2 2xl:gap-3 mb-2 2xl:mb-3 flex-wrap">
                <h2 className="text-xl 2xl:text-3xl font-bold" style={{ color: '#303030' }}>
                    {weatherStats.sectionTitle}
                </h2>
                {selectedTitles.map((title, index) => (
                    <span
                        key={index}
                        className="px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full text-xs 2xl:text-sm font-semibold"
                        style={{
                            backgroundColor: 'rgba(124, 58, 237, 0.15)',
                            color: '#7C3AED'
                        }}
                    >
                        {title}
                    </span>
                ))}
            </div>
            <div className="grid grid-cols-3 grid-rows-3 grid-flow-col gap-1.5 2xl:gap-2 flex-1 overflow-hidden">
                {chartConfigs.map((config) => {
                    const chartData = weatherStats.charts[config.key as keyof typeof weatherStats.charts];
                    return (
                        <CompactChart
                            key={config.key}
                            title={config.title}
                            riverName=""
                            data={chartData.data}
                            maxValue={weatherStats.maxValue}
                            highlightedKeys={highlightedKeys}
                            pillColor={config.color}
                        />
                    );
                })}
            </div>
        </div>
    );
}
