'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StatisticsChartProps {
  title: string;
  data: { name: string; value: number }[];
  maxValue: number;
  labelColor?: string;
}

export default function StatisticsChart({ title, data, maxValue }: StatisticsChartProps) {
  // Generate unique gradient ID based on title to prevent conflicts
  const gradientId = `purpleGradient-${title.replace(/\s+/g, '')}`;
  const shadowId = `barShadow-${title.replace(/\s+/g, '')}`;

  return (
    <div className="bg-white rounded-2xl h-full flex flex-col relative overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      {/* Pill label positioned in top-left corner */}
      <div
        className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold w-fit m-2 mb-0"
        style={{
          backgroundColor: 'rgba(240, 220, 230, 0.95)',
          color: '#7C3AED',
        }}
      >
        {title}
      </div>

      {/* Chart container */}
      <div className="flex-1 min-h-0 px-1" style={{ minHeight: '80px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 15, left: 0, bottom: 5 }}
            barCategoryGap="35%"
          >
            <defs>
              {/* Purple gradient for bars */}
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#6D28D9" />
              </linearGradient>
              {/* Shadow filter for bars */}
              <filter id={shadowId} x="-100%" y="-50%" width="300%" height="200%">
                <feDropShadow dx="3" dy="0" stdDeviation="2" floodColor="rgba(109, 40, 217, 0.4)" />
              </filter>
            </defs>

            <CartesianGrid
              strokeDasharray="0"
              stroke="#F3F4F6"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}
              dy={5}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 400, fontFamily: 'Inter, sans-serif' }}
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
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => [`${value} m`, title]}
              cursor={{ fill: 'rgba(168, 85, 247, 0.05)' }}
            />

            <Bar
              dataKey="value"
              fill={`url(#${gradientId})`}
              radius={[3, 3, 0, 0]}
              barSize={9}
              style={{ filter: `url(#${shadowId})` }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}