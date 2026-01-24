'use client';

import { useState, useEffect } from 'react';

interface ReportCardProps {
    title: string;
    stations: { id: string; title: string }[];
    selectedStation: string;
    onStationChange: (stationId: string) => void;
    onGenerate?: (startTime: string, endTime: string) => void;
    isActive?: boolean;
}

export default function ReportCard({
    title,
    stations,
    selectedStation,
    onStationChange,
    onGenerate,
    isActive = false
}: ReportCardProps) {
    const [startTime, setStartTime] = useState('13/01/2026 02:02:54');
    const [endTime, setEndTime] = useState('13/01/2026 02:02:54');

    const handleGenerate = () => {
        onGenerate?.(startTime, endTime);
    };

    return (
        <div
            className="rounded-lg overflow-hidden border-2 h-full flex flex-col transition-all"
            style={{
                backgroundColor: isActive ? '#9a9a9a' : '#b8b8b8',
                borderColor: isActive ? '#2d7a2d' : '#888',
                borderWidth: isActive ? '3px' : '2px'
            }}
        >
            {/* Title Header */}
            <div
                className="text-center py-2 px-4 flex-shrink-0"
                style={{ backgroundColor: isActive ? '#707070' : '#a0a0a0' }}
            >
                <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>

            {/* Content */}
            <div className="p-3 space-y-2 flex-1 flex flex-col justify-center">
                {/* Station Selector */}
                <div className="mb-1">

                    <select
                        value={selectedStation}
                        onChange={(e) => onStationChange(e.target.value)}
                        className="w-full px-2 py-1.5 bg-black text-white text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
                    >
                        {stations.map((station) => (
                            <option key={station.id} value={station.id}>
                                {station.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Time Inputs Row */}
                <div className="grid grid-cols-2 gap-2">
                    {/* Starting Time */}
                    <div>
                        <label className="block text-center text-sm font-bold text-white mb-1.5 px-2 py-1 rounded" style={{ backgroundColor: '#808080' }}>
                            Starting Time
                        </label>
                        <input
                            type="text"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full px-2 py-1.5 bg-black text-white text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>

                    {/* End Time */}
                    <div>
                        <label className="block text-center text-sm font-bold text-white mb-1.5 px-2 py-1 rounded" style={{ backgroundColor: '#808080' }}>
                            End Time
                        </label>
                        <input
                            type="text"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full px-2 py-1.5 bg-black text-white text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                    </div>
                </div>

                {/* Generate Report Button */}
                <div className="flex justify-center pt-1">
                    <button
                        onClick={handleGenerate}
                        className="text-white font-bold py-2 px-6 rounded text-sm transition-colors hover:opacity-90"
                        style={{ backgroundColor: '#2d7a2d' }}
                    >
                        Generate Report
                    </button>
                </div>
            </div>
        </div>
    );
}
