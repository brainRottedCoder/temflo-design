'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Header, { type TabType } from '../components/Header';
import MetricCard from '../components/MetricCard';
import StatisticsChart from '../components/StatisticsChart';
import DischargeStationsContent from '../components/content/DischargeStationsContent';
import AutomaticWeatherContent from '../components/content/AutomaticWeatherContent';
import RainGaugeContent from '../components/content/RainGaugeContent';
import WeatherStatistics from '../components/content/WeatherStatistics';
import { getDashboardData, getDischargeStatistics } from '../services/dataService';
import { useAutoLoop } from '../hooks/useAutoLoop';

// Get data from the data service
const dashboardData = getDashboardData();
const statisticsData = getDischargeStatistics();

// Tab configuration for auto-loop (only loops through main content tabs)
const LOOP_TABS: TabType[] = ['discharge', 'weather', 'rain-gauge'];
const TAB_LABELS: Record<TabType, string> = {
    'overview': 'Overview',
    'discharge': 'Discharge Stations',
    'weather': 'Automatic Weather Stations',
    'rain-gauge': 'Rain Gauge Stations',
};

export default function Overview() {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [selectedStations, setSelectedStations] = useState<{ chartKeys: string[]; titles: string[] }>({
        chartKeys: [],
        titles: []
    });

    // Handle tab change with callback
    const handleTabChange = useCallback((tab: TabType | string) => {
        setActiveTab(tab as TabType);
        // Reset station selection when changing tabs
        setSelectedStations({ chartKeys: [], titles: [] });
    }, []);

    // Auto-loop hook for large screens
    const { isLooping, isLargeScreen, timeUntilLoop } = useAutoLoop({
        inactivityTimeout: 30000, // 30 seconds inactivity
        tabDuration: 30000, // 30 seconds per tab
        minScreenWidth: 2500, // ~55" screens
        tabs: LOOP_TABS,
        onTabChange: handleTabChange,
        currentTab: activeTab,
    });

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

    // Handle station selection (toggle for multi-select)
    const handleStationSelect = (chartKey: string | null, title: string | null) => {
        if (!chartKey || !title) {
            // Clear all selections if null passed
            setSelectedStations({ chartKeys: [], titles: [] });
            return;
        }

        setSelectedStations(prev => {
            const keyIndex = prev.chartKeys.indexOf(chartKey);
            if (keyIndex > -1) {
                // Remove if already selected
                return {
                    chartKeys: prev.chartKeys.filter(k => k !== chartKey),
                    titles: prev.titles.filter((_, i) => i !== keyIndex)
                };
            } else {
                // Add to selection
                return {
                    chartKeys: [...prev.chartKeys, chartKey],
                    titles: [...prev.titles, title]
                };
            }
        });
    };

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
                return <DischargeStationsContent
                    onStationSelect={handleStationSelect}
                    selectedChartKeys={selectedStations.chartKeys}
                    onClearAll={() => setSelectedStations({ chartKeys: [], titles: [] })}
                />;
        }
    };

    // Render statistics based on active tab
    const renderStatistics = () => {
        if (activeTab === 'weather') {
            return <WeatherStatistics />;
        }

        return (
            <div className="flex flex-col min-h-0 h-full">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h2 className="text-2xl font-bold" style={{ color: '#303030' }}>
                        {statisticsData.sectionTitle}
                    </h2>
                    {selectedStations.titles.map((title, index) => (
                        <span
                            key={index}
                            className="px-2 py-0.5 rounded-full text-xs font-semibold"
                            style={{
                                backgroundColor: 'rgba(124, 58, 237, 0.15)',
                                color: '#7C3AED'
                            }}
                        >
                            {title}
                        </span>
                    ))}
                </div>
                <div className="grid grid-rows-3 gap-2 flex-1 overflow-hidden">
                    <StatisticsChart
                        title={statisticsData.charts.discharge.title}
                        data={statisticsData.charts.discharge.data}
                        maxValue={statisticsData.charts.discharge.maxValue}
                        highlightedKeys={selectedStations.chartKeys}
                    />
                    <StatisticsChart
                        title={statisticsData.charts.velocity.title}
                        data={statisticsData.charts.velocity.data}
                        maxValue={statisticsData.charts.velocity.maxValue}
                        highlightedKeys={selectedStations.chartKeys}
                    />
                    <StatisticsChart
                        title={statisticsData.charts.waterLevel.title}
                        data={statisticsData.charts.waterLevel.data}
                        maxValue={statisticsData.charts.waterLevel.maxValue}
                        highlightedKeys={selectedStations.chartKeys}
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
            <Header activeTab={activeTab} onTabChange={handleTabChange} />

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
                                    onClick={metric.clickable ? () => handleTabChange(metric.id as TabType) : undefined}
                                />
                            ))}
                        </div>

                        <div
                            className="rounded-xl px-5 py-3 min-w-[20%]"
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

            {/* Auto-Loop Indicator for Large Screens */}
            {isLargeScreen && (
                <div
                    className="fixed bottom-4 right-4 px-4 py-2 rounded-xl shadow-lg flex items-center gap-3"
                    style={{
                        backgroundColor: isLooping ? 'rgba(124, 58, 237, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                        color: isLooping ? '#ffffff' : '#374151',
                    }}
                >
                    {isLooping ? (
                        <>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                                <span className="font-semibold">Auto-Loop Active</span>
                            </div>
                            <span className="text-sm opacity-90">
                                Viewing: {TAB_LABELS[activeTab]}
                            </span>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="font-medium">55&quot; Display Mode</span>
                            </div>
                            <span className="text-sm text-gray-500">
                                Auto-loop in {Math.ceil(timeUntilLoop / 1000)}s
                            </span>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}