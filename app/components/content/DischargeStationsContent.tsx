import StationCard from '../StationCard';
import { getDischargeStations } from '../../services/dataService';

// Get data from the data service
const stationsData = getDischargeStations();

export default function DischargeStationsContent() {
    return (
        <div className="flex flex-col min-h-0 h-full overflow-hidden">
            <h2 className="text-xl font-bold mb-1.5 flex-shrink-0" style={{ color: '#303030' }}>
                {stationsData.sectionTitle}
            </h2>
            <div className="grid grid-cols-2 grid-rows-4 gap-1 flex-1 min-h-0 overflow-hidden">
                {stationsData.stations.map((station) => (
                    <StationCard
                        key={station.id}
                        title={station.title}
                        discharge={station.discharge}
                        velocity={station.velocity}
                        waterLevel={station.waterLevel}
                        color={station.color}
                    />
                ))}
            </div>
        </div>
    );
}
