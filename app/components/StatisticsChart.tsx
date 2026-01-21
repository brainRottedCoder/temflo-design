'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StatisticsChartProps {
  title: string;
  data: { name: string; value: number }[];
  maxValue: number;
  highlightedKeys?: string[];
  labelColor?: string;
}

const labelColors: Record<string, string> = {
  'Discharge': '#8ac53e',
  'Velocity': '#ffd143',
  'Water Level': '#ff993a',
  'Rainfall - HR (mm)': '#06B6D4',
  'Rainfall - Total (mm)': '#8B5CF6',
};

export default function StatisticsChart({ title, data, maxValue, highlightedKeys = [] }: StatisticsChartProps) {
  const pillColor = labelColors[title] || '#8ac53e';
  const hasSelection = highlightedKeys.length > 0;
  // Remove all non-alphanumeric characters for valid SVG gradient ID
  const safeId = title.replace(/[^a-zA-Z0-9]/g, '');

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
    <div className="bg-white rounded-lg 2xl:rounded-xl shadow-[0_2px_24px_rgba(0,0,0,0.05)] p-3 2xl:p-4 h-full flex flex-col border-none">
      <div
        className="inline-block px-3 2xl:px-4 py-1 2xl:py-1.5 border-none rounded-md 2xl:rounded-lg text-sm 2xl:text-sm font-medium text-white mb-2 2xl:mb-3 w-fit"
        style={{ backgroundColor: pillColor }}
      >
        {title}
      </div>
      <div className="flex-1 min-h-0 ">
        <ResponsiveContainer style={{ border: 'none' }} width="100%" height="100%">
          <BarChart className="border-none" data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
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
              tick={{ fill: '#369fff', fontSize: isLargeScreen ? 16 : 12, fontWeight: 600, fontFamily: 'Manrope, sans-serif' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: isLargeScreen ? 14 : 11, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
              domain={[0, maxValue]}
              ticks={[200, 300, 400, 500]}
              tickFormatter={(value) => `${value} m`}
              width={isLargeScreen ? 65 : 50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: isLargeScreen ? '14px' : '12px'
              }}
              formatter={(value) => [`${value} m`, title]}
            />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              barSize={isLargeScreen ? 14 : 10}
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
