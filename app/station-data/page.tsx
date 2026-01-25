'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReportCard from '../components/ReportCard';
import {
    ReportType,
    TimeTab,
    getStationsByType,
    getColumnsByType,
    generateStationData,
    getReportTypeName,
    TableColumn,
    TableRow
} from '../services/stationDataGenerator';

const tabs: TimeTab[] = ['Minute', 'Hour', 'Day', 'Week', 'Month', 'Year', 'All'];

// Format date for display
function formatDateForDisplay(date: Date): string {
    return date.toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}

export default function StationDataPage() {
    // Active report type and station selections
    const [activeReportType, setActiveReportType] = useState<ReportType>('aws');
    const [selectedStations, setSelectedStations] = useState<Record<ReportType, string>>({
        'discharge': 'ds-001',
        'aws': 'ws-001',
        'rain-gauge': 'rg-001'
    });

    // Time range state
    const [timeRange, setTimeRange] = useState<{ start: Date; end: Date }>(() => {
        const end = new Date();
        const start = new Date(end.getTime() - 3600000); // 1 hour ago
        return { start, end };
    });

    // Table state
    const [activeTab, setActiveTab] = useState<TimeTab>('Minute');
    const [selectedRow, setSelectedRow] = useState<number | null>(0);
    const [tableData, setTableData] = useState<TableRow[]>([]);
    const [columns, setColumns] = useState<TableColumn[]>([]);

    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    // Get stations for each report type
    const dischargeStations = getStationsByType('discharge');
    const awsStations = getStationsByType('aws');
    const rainGaugeStations = getStationsByType('rain-gauge');

    // Get current station name
    const getCurrentStationName = () => {
        const stations = getStationsByType(activeReportType);
        const station = stations.find(s => s.id === selectedStations[activeReportType]);
        return station?.title || 'Unknown Station';
    };

    // Update data when selections change
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);

            // Simulate API delay for realistic loading experience
            await new Promise(resolve => setTimeout(resolve, 500));

            const stationId = selectedStations[activeReportType];
            const stations = getStationsByType(activeReportType);
            const station = stations.find(s => s.id === stationId);

            if (station) {
                const newColumns = getColumnsByType(activeReportType, station.title);
                const newData = generateStationData(
                    activeReportType,
                    stationId,
                    activeTab,
                    timeRange.start,
                    timeRange.end
                );
                setColumns(newColumns);
                setTableData(newData);
                setSelectedRow(0);
            }

            setIsLoading(false);
        };

        loadData();
    }, [activeReportType, selectedStations, activeTab, timeRange]);

    // Handle station change
    const handleStationChange = (type: ReportType, stationId: string) => {
        setSelectedStations(prev => ({
            ...prev,
            [type]: stationId
        }));
        // Switch to this report type when station is changed
        setActiveReportType(type);
    };

    // Handle generate report
    const handleGenerateReport = (type: ReportType, startTime: Date, endTime: Date) => {
        setActiveReportType(type);
        setTimeRange({ start: startTime, end: endTime });
        console.log(`Generating ${type} report from ${startTime.toISOString()} to ${endTime.toISOString()}`);
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#f0f0f0' }}>
            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Page Header */}
                <div className="px-6 py-3 flex items-center justify-between flex-shrink-0" style={{ backgroundColor: '#6b6b6b' }}>
                    <div className="flex-1 text-center">
                        <h1 className="text-2xl font-bold text-black leading-tight">
                            {getCurrentStationName()}
                        </h1>
                        <h2 className="text-2xl font-bold text-black">
                            {getReportTypeName(activeReportType)} Reports
                        </h2>
                    </div>
                    <div className="bg-white rounded-lg p-2 flex items-center justify-center" style={{ width: '60px', height: '60px' }}>
                        <Image src="/logo.png" alt="TJVNL" width={50} height={50} />
                    </div>
                </div>

                {/* Metadata Bar */}
                <div className="px-6 py-1.5 text-xs text-white flex items-center gap-4 flex-shrink-0" style={{ backgroundColor: '#2d2d2d' }}>
                    <span>Start Time: {formatDateForDisplay(timeRange.start)}</span>
                    <span>End Time: {formatDateForDisplay(timeRange.end)}</span>
                    <span>Data Logger: data_logger</span>
                    <span>Report Type: {getReportTypeName(activeReportType)}</span>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] flex-1 overflow-hidden">
                    {/* Left: Data Table */}
                    <div className="bg-white  shadow-lg overflow-hidden flex flex-col h-full bg-zinc-900" style={{ backgroundColor: '#1a1a1a' }}>
                        {/* Tab Navigation */}
                        <div className="flex flex-shrink-0" style={{ backgroundColor: '#2d2d2d' }}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className="flex-1 py-1.5 px-3 text-xs font-semibold transition-colors text-white"
                                    style={{
                                        backgroundColor: activeTab === tab ? '#4a4a4a' : 'transparent'
                                    }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Table - Scrollable */}
                        <div className="flex-1 overflow-auto relative" style={{ backgroundColor: '#1a1a1a' }}>
                            {/* Loading Overlay */}
                            {isLoading && (
                                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span className="text-white text-sm font-medium">Loading data...</span>
                                    </div>
                                </div>
                            )}
                            <table className="w-full text-xs border-collapse">
                                <thead style={{ backgroundColor: '#2d2d2d', position: 'sticky', top: 0, zIndex: 10 }}>
                                    <tr>
                                        {columns.map((col, idx) => (
                                            <th
                                                key={col.key}
                                                className={`px-1 overflow-hidden font-semibold text-white border-r text-${col.align}`}
                                                style={{ borderColor: '#444' }}
                                            >
                                                {col.label.length > 18 ? col.label.substring(0, 15) + '...' : col.label}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, index) => (
                                        <tr
                                            key={row.id}
                                            onClick={() => setSelectedRow(index)}
                                            className="cursor-pointer transition-colors"
                                            style={{
                                                backgroundColor: selectedRow === index ? '#ff8c00' : (index % 2 === 0 ? '#2a2a2a' : '#1f1f1f'),
                                                color: selectedRow === index ? 'white' : '#ccc'
                                            }}
                                        >
                                            {columns.map((col) => (
                                                <td
                                                    key={col.key}
                                                    className={`px-1 overflow-hidden border-r text-${col.align}`}
                                                    style={{ borderColor: '#444' }}
                                                >
                                                    {row[col.key]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer Controls */}
                        <div className="px-4 py-2.5 flex items-center justify-between flex-shrink-0" style={{ backgroundColor: '#2d2d2d' }}>
                            <button className="text-white text-xs hover:text-gray-300">Refresh</button>
                            <div className="flex gap-4">
                                <button className="text-white text-xs hover:text-gray-300">Export Data</button>
                                <button className="text-white text-xs hover:text-gray-300">Csv</button>
                                <button className="text-white text-xs hover:text-gray-300">Multiline</button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Report Cards */}
                    <div className="flex mr-1 flex-col h-full bg-zinc-300">
                        <div className="flex-1">
                            <ReportCard
                                title="Discharge Reports"
                                stations={dischargeStations}
                                selectedStation={selectedStations['discharge']}
                                onStationChange={(id) => handleStationChange('discharge', id)}
                                onGenerate={(start, end) => handleGenerateReport('discharge', start, end)}
                                isActive={activeReportType === 'discharge'}
                            />
                        </div>
                        <div className="flex-1">
                            <ReportCard
                                title="AWS Reports"
                                stations={awsStations}
                                selectedStation={selectedStations['aws']}
                                onStationChange={(id) => handleStationChange('aws', id)}
                                onGenerate={(start, end) => handleGenerateReport('aws', start, end)}
                                isActive={activeReportType === 'aws'}
                            />
                        </div>
                        <div className="flex-1">
                            <ReportCard
                                title="Rain Gauge Reports"
                                stations={rainGaugeStations}
                                selectedStation={selectedStations['rain-gauge']}
                                onStationChange={(id) => handleStationChange('rain-gauge', id)}
                                onGenerate={(start, end) => handleGenerateReport('rain-gauge', start, end)}
                                isActive={activeReportType === 'rain-gauge'}
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Navigation */}
            <nav className="px-2 py-1 flex items-center justify-between flex-shrink-0 " style={{ backgroundColor: '#405aaeff' }}>
                <div className="flex">
                    {[
                        { label: 'Overview', path: '/overview' },
                        { label: 'Discharge Station', path: '/overview' },
                        { label: 'Weather Station', path: '/overview' },
                        { label: 'Rain Gauge', path: '/overview' },
                        { label: 'OMNI Siren', path: '/station-data' },
                        { label: 'BY-D Siren', path: '/station-data' },
                        { label: 'Trends', path: '/station-data' },
                        { label: 'Alarms', path: '/station-data' },
                        { label: 'Report', path: '/station-data' }
                    ].map((item) => (
                        <button
                            key={item.label}
                            onClick={() => window.location.href = item.path}
                            className="px-5 py-3 border-2 border-zinc-600 text-md font-medium transition-colors hover:bg-zinc-600"
                            style={{
                                backgroundColor: '#4a4a4a',
                                color: 'white',
                                borderColor: '#666'
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
                <BottomClock />
            </nav>
        </div>
    );
}

// Live clock component
function BottomClock() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    };

    return (
        <div className="flex items-center">
            <span className="text-white text-lg font-medium border-2 border-white/40 px-5 py-2.5" style={{ backgroundColor: '#252424ff' }}>
                {formatDate(currentTime)}
            </span>
            <span className="flex ml-0.5 px-1 py-1.5 text-lg font-mono font-bold border-1 border-white/40 rounded-md bg-black">
                <span className="border-1 px-4 py-1 rounded-md border-white/40 bg-white/80" style={{ borderColor: '#666' }}>
                    {formatTime(currentTime)}
                </span>
            </span>
        </div>
    );
}