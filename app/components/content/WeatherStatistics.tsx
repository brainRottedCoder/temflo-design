import CompactChart from '../CompactChart';

// Rivers data for the 3 weather stations
const rivers = ['Syana Chatti', 'Yamuna River', 'River 3'];

// Mock data for each river and metric
const weatherStatsData = {
    'Syana Chatti': {
        windSpeed: [
            { name: 'AM', value: 320 },
            { name: 'PM', value: 380 },
            { name: 'EVE', value: 350 },
        ],
        humidity: [
            { name: 'AM', value: 450 },
            { name: 'PM', value: 420 },
            { name: 'EVE', value: 400 },
        ],
        temperature: [
            { name: 'AM', value: 280 },
            { name: 'PM', value: 420 },
            { name: 'EVE', value: 350 },
        ],
    },
    'Yamuna River': {
        windSpeed: [
            { name: 'AM', value: 390 },
            { name: 'PM', value: 420 },
            { name: 'EVE', value: 380 },
        ],
        humidity: [
            { name: 'AM', value: 400 },
            { name: 'PM', value: 480 },
            { name: 'EVE', value: 440 },
        ],
        temperature: [
            { name: 'AM', value: 300 },
            { name: 'PM', value: 450 },
            { name: 'EVE', value: 380 },
        ],
    },
    'River 3': {
        windSpeed: [
            { name: 'AM', value: 350 },
            { name: 'PM', value: 400 },
            { name: 'EVE', value: 320 },
        ],
        humidity: [
            { name: 'AM', value: 420 },
            { name: 'PM', value: 390 },
            { name: 'EVE', value: 410 },
        ],
        temperature: [
            { name: 'AM', value: 320 },
            { name: 'PM', value: 400 },
            { name: 'EVE', value: 360 },
        ],
    },
};

export default function WeatherStatistics() {
    return (
        <div className="flex flex-col min-h-0">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#303030' }}>
                Statistics
            </h2>
            <div className="grid grid-cols-3 grid-rows-3 gap-2 flex-1">
                {rivers.map((river) => (
                    <>
                        <CompactChart
                            key={`${river}-wind`}
                            title="Wind Speed"
                            riverName={river}
                            data={weatherStatsData[river as keyof typeof weatherStatsData].windSpeed}
                            maxValue={500}
                        />
                        <CompactChart
                            key={`${river}-humidity`}
                            title="Humidity"
                            riverName={river}
                            data={weatherStatsData[river as keyof typeof weatherStatsData].humidity}
                            maxValue={500}
                        />
                        <CompactChart
                            key={`${river}-temp`}
                            title="Temperature"
                            riverName={river}
                            data={weatherStatsData[river as keyof typeof weatherStatsData].temperature}
                            maxValue={500}
                        />
                    </>
                ))}
            </div>
        </div>
    );
}
