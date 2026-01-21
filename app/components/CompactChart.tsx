'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CompactChartProps {
    title: string;
    riverName: string;
    data: { name: string; value: number }[];
    maxValue: number;
    pillColor?: string;
    highlightedKeys?: string[];
}

const defaultPillColors: Record<string, string> = {
    'Wind Speed': '#8ac53e',
    'Humidity': '#ffd143',
    'Temperature': '#ff993a',
};

export default function CompactChart({ title, riverName, data, maxValue, pillColor, highlightedKeys = [] }: CompactChartProps) {
    const color = pillColor || defaultPillColors[title] || '#8ac53e';
    const hasSelection = highlightedKeys.length > 0;
    const safeId = `compact-${title.replace(/\s+/g, '')}-${riverName.replace(/\s+/g, '')}`;

    // Track window width for responsive chart sizing
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 1536);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <div className="bg-white rounded-lg 2xl:rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-2 2xl:p-3 h-full flex flex-col">
            <div className="flex items-center gap-2 2xl:gap-3 mb-1 2xl:mb-2">
                <div
                    className="inline-block px-2.5 2xl:px-3.5 py-0.5 2xl:py-1 rounded 2xl:rounded-md text-xs 2xl:text-sm font-semibold text-white"
                    style={{ backgroundColor: color }}
                >
                    {title}
                </div>
                {riverName && <span className="text-sm 2xl:text-base text-gray-600 font-medium">{riverName}</span>}
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 3, right: 5, left: -15, bottom: 3 }}>
                        <defs>
                            <linearGradient id={`purpleGradient-${safeId}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#7C3AED" />
                                <stop offset="100%" stopColor="#6366F1" />
                            </linearGradient>
                            <linearGradient id={`dimmedGradient-${safeId}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#D1D5DB" />
                                <stop offset="100%" stopColor="#E5E7EB" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="0" stroke="#E8E8E8" vertical={false} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#369fff', fontSize: isLargeScreen ? 16 : 12, fontWeight: 600 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: isLargeScreen ? 14 : 11 }}
                            domain={[0, maxValue]}
                            ticks={[200, 400]}
                            tickFormatter={(value) => `${value}`}
                            width={isLargeScreen ? 40 : 30}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #E5E7EB',
                                borderRadius: '6px',
                                fontSize: isLargeScreen ? '14px' : '11px',
                                padding: isLargeScreen ? '8px 12px' : '6px 10px'
                            }}
                            formatter={(value) => [`${value}`, title]}
                        />
                        <Bar
                            dataKey="value"
                            radius={[4, 4, 0, 0]}
                            barSize={isLargeScreen ? 18 : 14}
                        >
                            {data.map((entry, index) => {
                                const isHighlighted = !hasSelection || highlightedKeys.includes(entry.name);
                                return (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={isHighlighted ? `url(#purpleGradient-${safeId})` : `url(#dimmedGradient-${safeId})`}
                                        opacity={isHighlighted ? 1 : 0.5}
                                    />
                                );
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
