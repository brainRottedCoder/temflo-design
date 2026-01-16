'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CompactChartProps {
    title: string;
    riverName: string;
    data: { name: string; value: number }[];
    maxValue: number;
    pillColor?: string;
}

const defaultPillColors: Record<string, string> = {
    'Wind Speed': '#8ac53e',
    'Humidity': '#ffd143',
    'Temperature': '#ff993a',
};

export default function CompactChart({ title, riverName, data, maxValue, pillColor }: CompactChartProps) {
    const color = pillColor || defaultPillColors[title] || '#8ac53e';

    return (
        <div className="bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-2 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-1">
                <div
                    className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold text-white"
                    style={{ backgroundColor: color }}
                >
                    {title}
                </div>
                <span className="text-sm text-gray-600 font-medium">{riverName}</span>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 3, right: 5, left: -15, bottom: 3 }}>
                        <CartesianGrid strokeDasharray="0" stroke="#E8E8E8" vertical={false} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#369fff', fontSize: 12, fontWeight: 600 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 11 }}
                            domain={[0, maxValue]}
                            ticks={[200, 400]}
                            tickFormatter={(value) => `${value}`}
                            width={30}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #E5E7EB',
                                borderRadius: '6px',
                                fontSize: '11px',
                                padding: '6px 10px'
                            }}
                            formatter={(value) => [`${value}`, title]}
                        />
                        <Bar
                            dataKey="value"
                            fill="url(#compactPurpleGradient)"
                            radius={[4, 4, 0, 0]}
                            barSize={14}
                        />
                        <defs>
                            <linearGradient id="compactPurpleGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#7C3AED" />
                                <stop offset="100%" stopColor="#6366F1" />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
