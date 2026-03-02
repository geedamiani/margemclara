'use client';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { MonthlyData } from '@/lib/demo-data';

interface MarginChartProps {
  data: MonthlyData[];
  height?: number;
}

export function MarginChart({ data, height = 240 }: MarginChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: '#a1a1aa' }}
          dy={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: '#a1a1aa' }}
          tickFormatter={(v) => `${v}%`}
          dx={-4}
          width={42}
        />
        <Tooltip
          contentStyle={{
            background: '#18181b',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '12px',
            color: '#fff',
          }}
          formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Margem']}
          labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
        />
        <Line
          type="monotone"
          dataKey="margem"
          stroke="#18181b"
          strokeWidth={2}
          dot={{ fill: '#18181b', r: 3, strokeWidth: 0 }}
          activeDot={{ fill: '#18181b', r: 5, strokeWidth: 2, stroke: '#fff' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface SmallTrendChartProps {
  data: number[];
  negative?: boolean;
  height?: number;
}

export function SmallTrendChart({ data, negative, height = 48 }: SmallTrendChartProps) {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  const chartData = data.map((v, i) => ({ month: months[i], value: v }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={negative ? '#d97706' : '#18181b'}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
