'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header, { type TabType } from '../components/Header';
import MetricCard from '../components/MetricCard';
import StatisticsChart from '../components/StatisticsChart';
import DischargeStationsContent from '../components/content/DischargeStationsContent';
import AutomaticWeatherContent from '../components/content/AutomaticWeatherContent';
import RainGaugeContent from '../components/content/RainGaugeContent';
import WeatherStatistics from '../components/content/WeatherStatistics';

// Mock data for charts matching Figma design
const dischargeData = [
    { name: 'SCYR', value: 450 },
    { name: 'KYR', value: 480 },
    { name: '', value: 420 },
    { name: '', value: 490 },
    { name: '', value: 520 },
    { name: '', value: 480 },
    { name: '', value: 500 },
];

const velocityData = [
    { name: '', value: 420 },
    { name: '', value: 480 },
    { name: '', value: 460 },
    { name: '', value: 480 },
    { name: '', value: 440 },
    { name: '', value: 420 },
    { name: '', value: 400 },
];

const waterLevelData = [
    { name: '', value: 450 },
    { name: '', value: 480 },
    { name: '', value: 420 },
    { name: '', value: 480 },
    { name: '', value: 350 },
    { name: '', value: 420 },
    { name: '', value: 380 },
];

export default function Overview() {
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    // Determine which metric card should be active based on tab
    const getActiveMetric = () => {
        switch (activeTab) {
            case 'discharge':
                return 'discharge';
            case 'weather':
                return 'weather';
            case 'rain-gauge':
                return 'rain-gauge';
            default:
                return 'discharge'; // Overview shows discharge as primary
        }
    };

    const activeMetric = getActiveMetric();

    // Render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'weather':
                return <AutomaticWeatherContent />;
            case 'rain-gauge':
                return <RainGaugeContent />;
            case 'discharge':
            case 'overview':
            default:
                return <DischargeStationsContent />;
        }
    };

    // Render statistics based on active tab
    const renderStatistics = () => {
        if (activeTab === 'weather') {
            return <WeatherStatistics />;
        }

        return (
            <div className="flex flex-col min-h-0 h-full">
                <h2 className="text-xl font-bold mb-3" style={{ color: '#303030' }}>
                    Statistics
                </h2>
                <div className="grid grid-rows-3 gap-2 flex-1">
                    <StatisticsChart title="Discharge" data={dischargeData} maxValue={600} />
                    <StatisticsChart title="Velocity" data={velocityData} maxValue={600} />
                    <StatisticsChart title="Water Level" data={waterLevelData} maxValue={600} />
                </div>
            </div>
        );
    };

    return (
        <div className="h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
            <Header activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="flex-1 px-6 py-4 overflow-hidden">
                <div className="h-full flex flex-col gap-4">
                    {/* Metrics Row */}
                    <div className="flex gap-3">
                        <div className="flex-1 grid grid-cols-5 gap-3">
                            <MetricCard
                                title="Discharge Stations"
                                value="08"
                                isActive={activeMetric === 'discharge'}
                                onClick={() => setActiveTab('discharge')}
                            />
                            <MetricCard
                                title="Automatic Weather Stations"
                                value="03"
                                isActive={activeMetric === 'weather'}
                                onClick={() => setActiveTab('weather')}
                            />
                            <MetricCard
                                title="Rain Gauge Stations"
                                value="09"
                                isActive={activeMetric === 'rain-gauge'}
                                onClick={() => setActiveTab('rain-gauge')}
                            />
                            <MetricCard title="Juddo Pond Level" value="02" />
                            <MetricCard title="Juddo Forebay Level" value="02" />
                        </div>

                        <div
                            className="rounded-xl px-4 py-3 min-w-[180px]"
                            style={{ backgroundColor: '#f7f7f7' }}
                        >
                            <div className="text-sm font-semibold mb-2" style={{ color: '#369fff' }}>
                                Last Updated
                            </div>
                            <div className="flex items-start gap-2">
                                <Image
                                    src="/icons/calendar.svg"
                                    alt="Calendar"
                                    width={20}
                                    height={20}
                                    className="mt-0.5"
                                />
                                <div>
                                    <div className="text-sm font-semibold" style={{ color: '#369fff' }}>
                                        10 January 2026
                                    </div>
                                    <div className="text-sm font-semibold" style={{ color: '#369fff' }}>
                                        10:00 AM
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="flex-1 grid grid-cols-[1fr_1px_1.1fr] gap-5 overflow-hidden min-h-0">
                        {/* Dynamic Content Area */}
                        {renderContent()}

                        {/* Divider */}
                        <div className="bg-gray-200 my-2" />

                        {/* Dynamic Statistics */}
                        {renderStatistics()}
                    </div>
                </div>
            </main>
        </div>
    );
}