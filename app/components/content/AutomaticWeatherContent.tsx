'use client';

import { useEffect, useState } from 'react';
import WeatherStationCard from '../WeatherStationCard';
import { getWeatherStations } from '../../services/dataService';

// Get data from the data service
const weatherData = getWeatherStations();

interface AutomaticWeatherContentProps {
    onStationSelect?: (chartKey: string | null, title: string | null) => void;
    selectedChartKeys?: string[];
    onClearAll?: () => void;
    onParameterSelect?: (paramKey: string) => void;
    selectedParameters?: string[];
}

export default function AutomaticWeatherContent({
    onStationSelect,
    selectedChartKeys = [],
    onClearAll,
    onParameterSelect,
    selectedParameters = [],
}: AutomaticWeatherContentProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Sync local selection state with parent's selectedChartKeys
    useEffect(() => {
        if (selectedChartKeys.length === 0) {
            setSelectedIds([]);
        }
    }, [selectedChartKeys]);

    const handleCardClick = (id: string, chartKey: string, title: string) => {
        setSelectedIds(prev => {
            const isSelected = prev.includes(id);
            if (isSelected) {
                return prev.filter(selectedId => selectedId !== id);
            } else {
                return [...prev, id];
            }
        });
        onStationSelect?.(chartKey, title);
    };

    const handleClearAll = () => {
        setSelectedIds([]);
        onClearAll?.();
    };

    const handleParameterSelect = (paramKey: string) => {
        onParameterSelect?.(paramKey);
    };

    const hasSelections = selectedIds.length > 0 || selectedParameters.length > 0;

    return (
        <div className="flex flex-col min-h-0 h-full overflow-hidden">
            <div className="flex items-center justify-between mb-1.5 2xl:mb-2 flex-shrink-0">
                <h2 className="text-xl 2xl:text-2xl font-bold" style={{ color: '#303030' }}>
                    {weatherData.sectionTitle}
                </h2>
                {hasSelections && (
                    <button
                        onClick={handleClearAll}
                        className="px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-full text-xs 2xl:text-sm font-semibold transition-colors hover:bg-red-100"
                        style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: '#EF4444',
                            border: '1px solid rgba(239, 68, 68, 0.3)'
                        }}
                    >
                        Clear All
                    </button>
                )}
            </div>
            <div className="flex flex-col gap-1.5 2xl:gap-2 flex-1 justify-between">
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
                        color={station.color as 'blue' | 'green' | 'orange'}
                        isSelected={selectedIds.includes(station.id)}
                        selectedParameters={selectedParameters}
                        onClick={() => handleCardClick(station.id, station.chartKey, station.title)}
                        onParameterSelect={handleParameterSelect}
                    />
                ))}
            </div>
        </div>
    );
}
