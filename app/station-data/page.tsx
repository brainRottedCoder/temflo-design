'use client';

import { useState } from 'react';
import Image from 'next/image';
import ReportCard from '../components/ReportCard';

// Extended sample data for the table
const generateSampleData = () => {
    const data = [];
    const baseDate = new Date('2026-01-13');

    for (let i = 0; i < 25; i++) {
        const startDate = new Date(baseDate.getTime() + i * 60000);
        const endDate = new Date(startDate.getTime() + 7000);

        data.push({
            id: i,
            startTime: startDate.toLocaleString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }),
            endTime: endDate.toLocaleString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }),
            userCall: 0,
            recordCall: 'Recorded by Time',
            humidity: (39 + Math.random() * 2).toFixed(2),
            pressure: (868 + Math.random() * 2).toFixed(2),
            rainfallDay: 0,
            rainfallHr: 0,
            rainfallTotal: (78 + Math.random() * 1).toFixed(2),
            rainfallTotal2: (156 + Math.random() * 2).toFixed(2)
        });
    }
    return data;
};

const tabs = ['Minute', 'Hour', 'Day', 'Week', 'Month', 'Year', 'All'];

export default function StationDataPage() {
    const [activeTab, setActiveTab] = useState('Minute');
    const [selectedRow, setSelectedRow] = useState<number | null>(0);
    const [sampleData] = useState(generateSampleData());

    const handleGenerateReport = (type: string, startTime: string, endTime: string) => {
        console.log(`Generating ${type} report from ${startTime} to ${endTime}`);
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#f0f0f0' }}>
            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Page Header */}
                <div className="px-6 py-3 flex items-center justify-between flex-shrink-0" style={{ backgroundColor: '#6b6b6b' }}>
                    <div className="flex-1 text-center">
                        <h1 className="text-2xl font-bold text-black leading-tight">
                            Lakhwar Sub-Station
                        </h1>
                        <h2 className="text-2xl font-bold text-black">
                            Reports
                        </h2>
                    </div>
                    <div className="bg-white rounded-lg p-2 flex items-center justify-center" style={{ width: '60px', height: '60px' }}>
                        <Image src="/logo.png" alt="TJVNL" width={50} height={50} />
                    </div>
                </div>

                {/* Metadata Bar */}
                <div className="px-6 py-1.5 text-xs text-white flex items-center gap-4 flex-shrink-0" style={{ backgroundColor: '#2d2d2d' }}>
                    <span>Start Time: 1/13/2026 12:00:00 AM</span>
                    <span>End Time: 1/14/2026 12:00:00 PM</span>
                    <span>Data Logger: data_logger</span>
                    <span>Start Logger: aws_REPORT</span>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-3 flex-1 overflow-hidden">
                    {/* Left: Data Table */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full bg-zinc-900" style={{ backgroundColor: '#1a1a1a' }}>
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
                        <div className="flex-1 overflow-auto" style={{ backgroundColor: '#1a1a1a' }}>
                            <table className="w-full text-xs border-collapse">
                                <thead style={{ backgroundColor: '#2d2d2d', position: 'sticky', top: 0, zIndex: 10 }}>
                                    <tr>
                                        <th className="px-1 overflow-hidden text-left font-semibold text-white border-r" style={{ borderColor: '#444' }}>Utc TimeCol</th>
                                        <th className="px-1 overflow-hidden text-left font-semibold text-white border-r" style={{ borderColor: '#444' }}>Timestamp</th>
                                        <th className="px-1 overflow-hidden text-center font-semibold text-white border-r" style={{ borderColor: '#444' }}>MillisecondsCol</th>
                                        <th className="px-1 overflow-hidden text-center font-semibold text-white border-r" style={{ borderColor: '#444' }}>UserCol</th>
                                        <th className="px-1 overflow-hidden text-center font-semibold text-white border-r" style={{ borderColor: '#444' }}>ReasonCol</th>
                                        <th className="px-1 overflow-hidden text-center font-semibold text-white border-r" style={{ borderColor: '#444' }}>Thatyur_Humidity</th>
                                        <th className="px-1 overflow-hidden text-center font-semibold text-white border-r" style={{ borderColor: '#444' }}>Thatyur_Pressure</th>
                                        <th className="px-1 overflow-hidden text-center font-semibold text-white border-r" style={{ borderColor: '#444' }}>Thatyur_Rainfall_Day</th>
                                        <th className="px-1 overflow-hidden text-center font-semibold text-white border-r" style={{ borderColor: '#444' }}>Thatyur_Rainfall_H...</th>
                                        <th className="px-1 overflow-hidden text-center font-semibold text-white border-r" style={{ borderColor: '#444' }}>Thatyur_Rainfall_to...</th>
                                        <th className="px-1 overflow-hidden text-center font-semibold text-white border-r" style={{ borderColor: '#444' }}>Thatyur_Solar_Radi...</th>
                                        <th className="px-1 overflow-hidden text-center font-semibold text-white" style={{ borderColor: '#444' }}>Thatyur_Tempe...</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sampleData.map((row, index) => (
                                        <tr
                                            key={row.id}
                                            onClick={() => setSelectedRow(index)}
                                            className="cursor-pointer transition-colors"
                                            style={{
                                                backgroundColor: selectedRow === index ? '#ff8c00' : (index % 2 === 0 ? '#2a2a2a' : '#1f1f1f'),
                                                color: selectedRow === index ? 'white' : '#ccc'
                                            }}
                                        >
                                            <td className="px-1 overflow-hidden border-r" style={{ borderColor: '#444' }}>{row.startTime}</td>
                                            <td className="px-1 overflow-hidden border-r" style={{ borderColor: '#444' }}>{row.endTime}</td>
                                            <td className="px-1 overflow-hidden text-center border-r" style={{ borderColor: '#444' }}>{row.userCall}</td>
                                            <td className="px-1 overflow-hidden text-center border-r" style={{ borderColor: '#444' }}>{row.userCall}</td>
                                            <td className="px-1 overflow-hidden text-center border-r" style={{ borderColor: '#444' }}>{row.recordCall}</td>
                                            <td className="px-1 overflow-hidden text-center border-r" style={{ borderColor: '#444' }}>{row.humidity}</td>
                                            <td className="px-1 overflow-hidden text-center border-r" style={{ borderColor: '#444' }}>{row.pressure}</td>
                                            <td className="px-1 overflow-hidden text-center border-r" style={{ borderColor: '#444' }}>{row.rainfallDay}</td>
                                            <td className="px-1 overflow-hidden text-center border-r" style={{ borderColor: '#444' }}>{row.rainfallHr}</td>
                                            <td className="px-1 overflow-hidden text-center border-r" style={{ borderColor: '#444' }}>{row.rainfallTotal}</td>
                                            <td className="px-1 overflow-hidden text-center border-r" style={{ borderColor: '#444' }}>{row.rainfallTotal2}</td>
                                            <td className="px-1 overflow-hidden text-center" style={{ borderColor: '#444' }}>{row.humidity}</td>
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
                    <div className="flex flex-col gap-2 h-full bg-zinc-300">
                        <div className="flex-1">
                            <ReportCard
                                title="Discharge Reports"
                                onGenerate={(start, end) => handleGenerateReport('Discharge', start, end)}
                            />
                        </div>
                        <div className="flex-1">
                            <ReportCard
                                title="AWS Reports"
                                onGenerate={(start, end) => handleGenerateReport('AWS', start, end)}
                            />
                        </div>
                        <div className="flex-1">
                            <ReportCard
                                title="Rain Gauge Reports"
                                onGenerate={(start, end) => handleGenerateReport('Rain Gauge', start, end)}
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Navigation */}
            <nav className="px-2 py-1 flex items-center justify-between flex-shrink-0 " style={{ backgroundColor: '#405aaeff' }}>
                <div className="flex">
                    {['Overview', 'Discharge Station', 'Weather Station', 'Rain Gauge', 'OMNI Siren', 'BY-D Siren', 'Trends', 'Alarms', 'Report'].map((item) => (
                        <button
                            key={item}
                            className="px-5 py-3 border-2 border-zinc-600 text-md font-medium transition-colors"
                            style={{
                                backgroundColor: '#4a4a4a',
                                color: 'white',
                                borderColor: '#666'
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <div className="flex items-center">
                    <span className="text-white text-lg font-medium border-2 border-white/40 px-5 py-2.5" style={{ backgroundColor: '#252424ff' }}>Tuesday, January 13, 2026</span>
                    <span className="flex ml-0.5 px-1 py-1.5 text-lg font-mono font-bold border-1 border-white/40 rounded-md bg-black">
                        <span className="border-1 px-4 py-1 rounded-md border-white/40 bg-white/80" style={{ borderColor: '#666' }}>
                            14:04:15
                        </span>
                    </span>
                </div>
            </nav>
        </div>
    );
}