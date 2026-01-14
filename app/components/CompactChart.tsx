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
        <div className="bg-white rounded-lg shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-3 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <div
                    className="inline-block px-3 py-1 rounded text-[11px] font-semibold text-white"
                    style={{ backgroundColor: color }}
                >
                    {title}
                </div>
                <span className="text-[12px] text-gray-600 font-medium">{riverName}</span>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 8, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="0" stroke="#E8E8E8" vertical={false} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#369fff', fontSize: 11, fontWeight: 600 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 11 }}
                            domain={[0, maxValue]}
                            ticks={[200, 400]}
                            tickFormatter={(value) => `${value}`}
                            width={35}
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
