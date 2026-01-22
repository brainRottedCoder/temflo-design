'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Header, { type TabType } from '../components/Header';
import MetricCard from '../components/MetricCard';
import StatisticsChart from '../components/StatisticsChart';
import SkeletonCard from '../components/SkeletonCard';
import SkeletonChart from '../components/SkeletonChart';
import DischargeStationsContent from '../components/content/DischargeStationsContent';
import AutomaticWeatherContent from '../components/content/AutomaticWeatherContent';
import RainGaugeContent from '../components/content/RainGaugeContent';
import WeatherStatistics from '../components/content/WeatherStatistics';
import RainGaugeStatistics from '../components/content/RainGaugeStatistics';
import { fetchAllDashboardData, type AllDashboardData } from '../services/dataService';
import { useAutoLoop } from '../hooks/useAutoLoop';

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
    const [isLoading, setIsLoading] = useState(true);
    const [isTabLoading, setIsTabLoading] = useState(false);
    const [data, setData] = useState<AllDashboardData | null>(null);

    // Fetch all data on mount
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const allData = await fetchAllDashboardData();
                setData(allData);
            } catch (error) {
                console.error('Failed to load dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    // Handle tab change with callback - now includes loading state
    const handleTabChange = useCallback((tab: TabType | string) => {
        const newTab = tab as TabType;
        if (newTab !== activeTab) {
            setActiveTab(newTab);
            // Reset station selection when changing tabs
            setSelectedStations({ chartKeys: [], titles: [] });
            // Trigger loading for tab content
            setIsTabLoading(true);
            setTimeout(() => {
                setIsTabLoading(false);
            }, 2000);
        }
    }, [activeTab]);

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
        const showLoading = isLoading || isTabLoading;
        if (showLoading) {
            const cardType = activeTab === 'weather' ? 'weather' : activeTab === 'rain-gauge' ? 'rain-gauge' : 'discharge';
            const cardCount = activeTab === 'weather' ? 3 : activeTab === 'rain-gauge' ? 9 : 8;
            const cols = activeTab === 'rain-gauge' ? 3 : 2;

            return (
                <div className="flex flex-col min-h-0 h-full overflow-hidden">
                    <div className="h-6 2xl:h-8 w-48 bg-gray-300 rounded mb-2 2xl:mb-3 animate-pulse" />
                    <div className={`grid grid-cols-${cols} gap-1.5 2xl:gap-2 flex-1 overflow-hidden`}
                        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                        {Array.from({ length: cardCount }).map((_, i) => (
                            <SkeletonCard key={i} type={cardType} />
                        ))}
                    </div>
                </div>
            );
        }

        switch (activeTab) {
            case 'weather':
                return <AutomaticWeatherContent
                    onStationSelect={handleStationSelect}
                    selectedChartKeys={selectedStations.chartKeys}
                    onClearAll={() => setSelectedStations({ chartKeys: [], titles: [] })}
                />;
            case 'rain-gauge':
                return <RainGaugeContent
                    onStationSelect={handleStationSelect}
                    selectedChartKeys={selectedStations.chartKeys}
                    onClearAll={() => setSelectedStations({ chartKeys: [], titles: [] })}
                />;
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
        const showLoading = isLoading || isTabLoading;
        if (showLoading) {
            const chartCount = activeTab === 'weather' ? 9 : activeTab === 'rain-gauge' ? 2 : 3;
            const cols = activeTab === 'weather' ? 3 : 1;

            return (
                <div className="flex flex-col min-h-0 h-full">
                    <div className="h-6 2xl:h-8 w-32 bg-gray-300 rounded mb-2 2xl:mb-3 animate-pulse" />
                    <div className={`grid gap-2 2xl:gap-3 flex-1 overflow-hidden`}
                        style={{
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                            gridTemplateRows: `repeat(${Math.ceil(chartCount / cols)}, 1fr)`
                        }}>
                        {Array.from({ length: chartCount }).map((_, i) => (
                            <SkeletonChart key={i} compact={activeTab === 'weather'} />
                        ))}
                    </div>
                </div>
            );
        }

        if (!data) return null;

        if (activeTab === 'weather') {
            return <WeatherStatistics
                highlightedKeys={selectedStations.chartKeys}
                selectedTitles={selectedStations.titles}
            />;
        }

        if (activeTab === 'rain-gauge') {
            return <RainGaugeStatistics
                highlightedKeys={selectedStations.chartKeys}
                selectedTitles={selectedStations.titles}
            />;
        }

        const statisticsData = data.dischargeStatistics;

        return (
            <div className="flex flex-col min-h-0 h-full">
                <div className="flex items-center gap-2 2xl:gap-3 mb-2 2xl:mb-3 flex-wrap">
                    <h2 className="text-2xl 2xl:text-4xl font-bold" style={{ color: '#303030' }}>
                        {statisticsData.sectionTitle}
                    </h2>
                    {selectedStations.titles.map((title, index) => (
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
                <div className="grid grid-rows-3 gap-2 2xl:gap-3 flex-1 overflow-hidden border-none">
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

    // Get metrics from data or use loading placeholders
    const metrics = data?.dashboard.metrics ?? [
        { id: 'discharge', title: 'Discharge Stations', value: '--', clickable: true },
        { id: 'weather', title: 'Automatic Weather Stations', value: '--', clickable: true },
        { id: 'rain-gauge', title: 'Rain Gauge Stations', value: '--', clickable: true },
        { id: 'juddo-pond', title: 'Juddo Pond Level', value: '--', clickable: false },
        { id: 'juddo-forebay', title: 'Juddo Forebay Level', value: '--', clickable: false },
    ];
    const lastUpdated = data?.dashboard.lastUpdated ?? { date: '--', time: '--' };

    return (
        <div className="h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
            <Header activeTab={activeTab} onTabChange={handleTabChange} />

            <main className="flex-1 px-4 2xl:px-6 py-2 2xl:py-3 overflow-hidden">
                <div className="h-full flex flex-col gap-2 2xl:gap-3">
                    {/* Metrics Row */}
                    <div className="flex gap-2 2xl:gap-3">
                        <div className="flex-1 grid grid-cols-5 gap-2 2xl:gap-3">
                            {metrics.map((metric) => (
                                <MetricCard
                                    key={metric.id}
                                    title={metric.title}
                                    value={isLoading ? '--' : metric.value}
                                    isActive={activeMetric === metric.id}
                                    onClick={metric.clickable ? () => handleTabChange(metric.id as TabType) : undefined}
                                />
                            ))}
                        </div>
                        {/* Last Updated Card */}
                        <div
                            className="rounded-xl 2xl:rounded-2xl px-3 2xl:px-4 py-1.5 2xl:py-2 flex flex-col justify-center items-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                            style={{
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #E5E7EB',
                                minWidth: '100px'
                            }}
                        >
                            <span className="text-[10px] 2xl:text-xs font-semibold text-gray-500 mb-0.5">
                                Last Updated:
                            </span>
                            <div className="flex items-center gap-1 2xl:gap-1.5">
                                <Image src="/calendar.svg" alt="calendar" width={14} height={14} className="2xl:w-[18px] 2xl:h-[18px]" />
                                <span className={`text-[11px] 2xl:text-sm font-semibold ${isLoading ? 'animate-pulse' : ''}`} style={{ color: '#4B5563' }}>
                                    {lastUpdated.date}
                                </span>
                            </div>
                            <span className={`text-xs 2xl:text-base font-bold ${isLoading ? 'animate-pulse' : ''}`} style={{ color: '#6366F1' }}>
                                {lastUpdated.time}
                            </span>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 grid grid-cols-2 gap-3 2xl:gap-4 overflow-hidden">
                        {/* Left Panel - Station Cards */}
                        <div
                            className="rounded-xl 2xl:rounded-2xl p-3 2xl:p-4 overflow-hidden flex flex-col"
                            style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
                        >
                            {renderContent()}
                        </div>

                        {/* Right Panel - Statistics */}
                        <div
                            className="rounded-xl 2xl:rounded-2xl p-3 2xl:p-4 overflow-hidden flex flex-col"
                            style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
                        >
                            {renderStatistics()}
                        </div>
                    </div>
                </div>
            </main>

            {/* Auto-loop indicator for large screens */}
            {isLargeScreen && (
                <div className="fixed bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200">
                    {isLooping ? (
                        <>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-medium text-gray-600">
                                Auto-cycling: {TAB_LABELS[activeTab]}
                            </span>
                        </>
                    ) : (
                        <>
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <span className="text-xs font-medium text-gray-600">
                                Auto-cycle in {Math.ceil(timeUntilLoop / 1000)}s
                            </span>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}