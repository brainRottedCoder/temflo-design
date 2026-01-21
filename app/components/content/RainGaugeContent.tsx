'use client';

import { useEffect, useState } from 'react';
import RainGaugeStationCard from '../RainGaugeStationCard';
import { getRainGaugeStations } from '../../services/dataService';

// Get data from the data service
const rainGaugeData = getRainGaugeStations();

interface RainGaugeContentProps {
    onStationSelect?: (chartKey: string | null, title: string | null) => void;
    selectedChartKeys?: string[];
    onClearAll?: () => void;
}

export default function RainGaugeContent({
    onStationSelect,
    selectedChartKeys = [],
    onClearAll
}: RainGaugeContentProps) {
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

    return (
        <div className="flex flex-col min-h-0 h-full overflow-hidden">
            <div className="flex items-center justify-between mb-1.5 2xl:mb-2 flex-shrink-0">
                <h2 className="text-xl 2xl:text-2xl font-bold" style={{ color: '#303030' }}>
                    {rainGaugeData.sectionTitle}
                </h2>
                {selectedIds.length > 0 && (
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
            <div className="grid grid-cols-3 grid-rows-3 gap-1.5 2xl:gap-2 flex-1 overflow-hidden">
                {rainGaugeData.stations.map((station) => (
                    <RainGaugeStationCard
                        key={station.id}
                        title={station.title}
                        rainfallHR={station.rainfallHR}
                        rainfallTotal={station.rainfallTotal}
                        color={station.color as 'blue' | 'green' | 'orange' | 'yellow'}
                        isSelected={selectedIds.includes(station.id)}
                        onClick={() => handleCardClick(station.id, station.chartKey, station.title)}
                    />
                ))}
            </div>
        </div>
    );
}
