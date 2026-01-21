import StatisticsChart from '../StatisticsChart';
import { getRainGaugeStatistics } from '../../services/dataService';

// Get data from the data service
const rainGaugeStats = getRainGaugeStatistics();

interface RainGaugeStatisticsProps {
    highlightedKeys?: string[];
    selectedTitles?: string[];
}

export default function RainGaugeStatistics({ highlightedKeys = [], selectedTitles = [] }: RainGaugeStatisticsProps) {
    return (
        <div className="flex flex-col min-h-0 h-full">
            <div className="flex items-center gap-2 2xl:gap-3 mb-2 2xl:mb-3 flex-wrap">
                <h2 className="text-xl 2xl:text-3xl font-bold" style={{ color: '#303030' }}>
                    {rainGaugeStats.sectionTitle}
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
            <div className="grid grid-rows-2 gap-2 2xl:gap-3 flex-1 overflow-hidden">
                <StatisticsChart
                    title={rainGaugeStats.charts.rainfallHR.title}
                    data={rainGaugeStats.charts.rainfallHR.data}
                    maxValue={rainGaugeStats.maxValue}
                    highlightedKeys={highlightedKeys}
                />
                <StatisticsChart
                    title={rainGaugeStats.charts.rainfallTotal.title}
                    data={rainGaugeStats.charts.rainfallTotal.data}
                    maxValue={rainGaugeStats.maxValue}
                    highlightedKeys={highlightedKeys}
                />
            </div>
        </div>
    );
}
