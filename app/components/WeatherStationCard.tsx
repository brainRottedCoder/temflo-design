'use client';

import { useState } from 'react';

interface WeatherStationCardProps {
    title: string;
    windSpeed: string;
    windDirection: string;
    temperature: string;
    relativeHumidity: string;
    airPressure: string;
    solarRadiation: string;
    rainfallHR: string;
    rainfallDay: string;
    rainfallTotal: string;
    color?: 'blue' | 'green' | 'orange';
    isSelected?: boolean;
    selectedParameters?: string[];
    onClick?: () => void;
    onParameterSelect?: (paramKey: string) => void;
}

const colorConfig = {
    blue: {
        bg: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
        solid: '#3B82F6',
        border: '#1D4ED8',
    },
    green: {
        bg: 'linear-gradient(135deg, #A3E635 0%, #84CC16 100%)',
        solid: '#84CC16',
        border: '#4D7C0F',
    },
    orange: {
        bg: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)',
        solid: '#F97316',
        border: '#C2410C',
    },
};

// Parameter configuration for clickable labels
const parameterConfig = [
    { key: 'windSpeed', label: 'Wind Speed', unit: '(m/s)' },
    { key: 'windDirection', label: 'Wind Direction', unit: '(N)' },
    { key: 'temperature', label: 'Temperature', unit: '(C)' },
    { key: 'relativeHumidity', label: 'Relative Humidity', unit: '(%RH)' },
    { key: 'airPressure', label: 'Air Pressure', unit: '(hPa)' },
    { key: 'solarRadiation', label: 'Solar Radiation', unit: '(nm)' },
    { key: 'rainfallHR', label: 'Rainfall - HR', unit: '(mm)' },
    { key: 'rainfallDay', label: 'Rainfall - Day', unit: '(mm)' },
    { key: 'rainfallTotal', label: 'Rainfall - Total', unit: '(mm)' },
];

export default function WeatherStationCard({
    title,
    windSpeed = '03',
    windDirection = '03',
    temperature = '03',
    relativeHumidity = '03',
    airPressure = '03',
    solarRadiation = '03',
    rainfallHR = '03',
    rainfallDay = '03',
    rainfallTotal = '03',
    color = 'blue',
    isSelected = false,
    selectedParameters = [],
    onClick,
    onParameterSelect,
}: WeatherStationCardProps) {
    const config = colorConfig[color];

    const values: Record<string, string> = {
        windSpeed,
        windDirection,
        temperature,
        relativeHumidity,
        airPressure,
        solarRadiation,
        rainfallHR,
        rainfallDay,
        rainfallTotal,
    };

    const handleParameterClick = (e: React.MouseEvent, paramKey: string) => {
        e.stopPropagation(); // Prevent card click
        onParameterSelect?.(paramKey);
    };

    const renderParameter = (paramKey: string, label: string, unit: string) => {
        const isParamSelected = selectedParameters.includes(paramKey);
        const hasAnySelected = selectedParameters.length > 0;
        const isDimmed = hasAnySelected && !isParamSelected;

        return (
            <div
                className={`flex items-baseline gap-2 2xl:gap-3 cursor-pointer transition-all rounded-md px-1 -mx-1 ${isParamSelected
                        ? 'bg-white/20 ring-1 ring-white/50'
                        : 'hover:bg-white/10'
                    } ${isDimmed ? 'opacity-40' : ''}`}
                onClick={(e) => handleParameterClick(e, paramKey)}
            >
                <span className="text-sm 2xl:text-sm text-white/85">{label} {unit}</span>
                <span className="text-2xl 2xl:text-4xl font-bold text-white">{values[paramKey]}</span>
            </div>
        );
    };

    return (
        <div
            className={`rounded-[12px] 2xl:rounded-[18px] px-3 2xl:px-4 py-2 mx-3 2xl:py-3 h-full flex flex-col transition-all cursor-pointer ${isSelected ? 'scale-[1.01]' : 'hover:scale-[1.005]'}`}
            style={{
                background: config.bg,
                boxShadow: isSelected
                    ? `0 8px 20px ${config.solid}50`
                    : `0 4px 12px ${config.solid}30`,
                border: isSelected ? `3px solid ${config.border}` : '3px solid transparent',
            }}
            onClick={onClick}
        >
            <div className="flex items-center gap-2 mb-2 2xl:mb-3 text-black bg-white justify-center align-center">
                <h3 className="text-base 2xl:text-xl px-2 2xl:px-3 py-0.5 2xl:py-1 rounded-md 2xl:rounded-lg font-bold ">
                    {title}
                </h3>
            </div>

            <div className="grid grid-cols-3 gap-x-4 2xl:gap-x-6 gap-y-1 2xl:gap-y-2 flex-1 content-center">
                {/* Column 1 */}
                <div className="flex flex-col gap-1 2xl:gap-2">
                    {renderParameter('windSpeed', 'Wind Speed', '(m/s)')}
                    {renderParameter('windDirection', 'Wind Direction', '(N)')}
                    {renderParameter('temperature', 'Temperature', '(C)')}
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-1 2xl:gap-2">
                    {renderParameter('relativeHumidity', 'Relative Humidity', '(%RH)')}
                    {renderParameter('airPressure', 'Air Pressure', '(hPa)')}
                    {renderParameter('solarRadiation', 'Solar Radiation', '(nm)')}
                </div>

                {/* Column 3 */}
                <div className="flex flex-col gap-1 2xl:gap-2">
                    {renderParameter('rainfallHR', 'Rainfall - HR', '(mm)')}
                    {renderParameter('rainfallDay', 'Rainfall - Day', '(mm)')}
                    {renderParameter('rainfallTotal', 'Rainfall - Total', '(mm)')}
                </div>
            </div>
        </div>
    );
}
