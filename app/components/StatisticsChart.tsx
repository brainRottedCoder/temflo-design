'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StatisticsChartProps {
  title: string;
  data: { name: string; value: number }[];
  maxValue: number;
  labelColor?: string;
}

const labelColors: Record<string, string> = {
  'Discharge': '#8ac53e',
  'Velocity': '#ffd143',
  'Water Level': '#ff993a',
};

export default function StatisticsChart({ title, data, maxValue }: StatisticsChartProps) {
  const pillColor = labelColors[title] || '#8ac53e';

  return (
    <div className="bg-white rounded-lg shadow-[0_2px_24px_rgba(0,0,0,0.05)] p-3 h-full flex flex-col">
      <div
        className="inline-block px-3 py-1 rounded-md text-[11px] font-medium text-white mb-2 w-fit"
        style={{ backgroundColor: pillColor }}
      >
        {title}
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="0" stroke="#E8E8E8" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#369fff', fontSize: 12, fontWeight: 600, fontFamily: 'Manrope, sans-serif' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 11, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}
              domain={[0, maxValue]}
              ticks={[200, 300, 400, 500]}
              tickFormatter={(value) => `${value} m`}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value) => [`${value} m`, title]}
            />
            <Bar
              dataKey="value"
              fill="url(#purpleGradient)"
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
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