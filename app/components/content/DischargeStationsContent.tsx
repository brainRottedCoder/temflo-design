import StationCard from '../StationCard';

// Station cards with correct color pattern
const stationData: Array<{ color: 'blue' | 'green' | 'orange' | 'yellow' }> = [
    { color: 'blue' },
    { color: 'orange' },
    { color: 'green' },
    { color: 'orange' },
    { color: 'blue' },
    { color: 'yellow' },
    { color: 'green' },
    { color: 'yellow' },
];

export default function DischargeStationsContent() {
    return (
        <div className="flex flex-col min-h-0 h-full overflow-hidden">
            <h2 className="text-xl font-bold mb-1.5 flex-shrink-0" style={{ color: '#303030' }}>
                Discharge Stations
            </h2>
            <div className="grid grid-cols-2 grid-rows-4 gap-1 flex-1 min-h-0 overflow-hidden">
                {stationData.map((station, index) => (
                    <StationCard
                        key={index}
                        title="Syana Chatti Yamuna River"
                        discharge="03"
                        velocity="03"
                        waterLevel="03"
                        color={station.color}
                    />
                ))}
            </div>
        </div>
    );
}
