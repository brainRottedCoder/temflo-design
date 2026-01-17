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
import { getDashboardData, getDischargeStatistics } from '../services/dataService';

// Get data from the data service
const dashboardData = getDashboardData();
const statisticsData = getDischargeStatistics();

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
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#303030' }}>
                    {statisticsData.sectionTitle}
                </h2>
                <div className="grid grid-rows-3 gap-2 flex-1 overflow-hidden">
                    <StatisticsChart
                        title={statisticsData.charts.discharge.title}
                        data={statisticsData.charts.discharge.data}
                        maxValue={statisticsData.charts.discharge.maxValue}
                    />
                    <StatisticsChart
                        title={statisticsData.charts.velocity.title}
                        data={statisticsData.charts.velocity.data}
                        maxValue={statisticsData.charts.velocity.maxValue}
                    />
                    <StatisticsChart
                        title={statisticsData.charts.waterLevel.title}
                        data={statisticsData.charts.waterLevel.data}
                        maxValue={statisticsData.charts.waterLevel.maxValue}
                    />
                </div>
            </div>
        );
    };

    // Get metrics from data
    const metrics = dashboardData.metrics;
    const lastUpdated = dashboardData.lastUpdated;

    return (
        <div className="h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
            <Header activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="flex-1 px-4 py-2 overflow-hidden">
                <div className="h-full flex flex-col gap-2">
                    {/* Metrics Row */}
                    <div className="flex gap-2">
                        <div className="flex-1 grid grid-cols-5 gap-2">
                            {metrics.map((metric) => (
                                <MetricCard
                                    key={metric.id}
                                    title={metric.title}
                                    value={metric.value}
                                    isActive={activeMetric === metric.id}
                                    onClick={metric.clickable ? () => setActiveTab(metric.id as TabType) : undefined}
                                />
                            ))}
                        </div>

                        <div
                            className="rounded-xl px-3 py-2 min-w-[160px]"
                            style={{ backgroundColor: '#f7f7f7' }}
                        >
                            <div className="text-base font-semibold mb-1" style={{ color: '#369fff' }}>
                                Last Updated
                            </div>
                            <div className="flex items-start gap-2">
                                <Image
                                    src="/icons/calendar.svg"
                                    alt="Calendar"
                                    width={18}
                                    height={18}
                                    className="mt-0.5"
                                />
                                <div>
                                    <div className="text-base font-semibold" style={{ color: '#369fff' }}>
                                        {lastUpdated.date}
                                    </div>
                                    <div className="text-base font-semibold" style={{ color: '#369fff' }}>
                                        {lastUpdated.time}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="flex-1 grid grid-cols-[1fr_1px_1.1fr] gap-3 overflow-hidden min-h-0">
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