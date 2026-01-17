// Chart data types

export interface ChartDataPoint {
    name: string;
    value: number;
}

export interface StatisticsChartData {
    title: string;
    data: ChartDataPoint[];
    maxValue: number;
}

export interface StatisticsData {
    sectionTitle: string;
    charts: {
        discharge: StatisticsChartData;
        velocity: StatisticsChartData;
        waterLevel: StatisticsChartData;
    };
}

export interface WeatherMetricData {
    windSpeed: ChartDataPoint[];
    humidity: ChartDataPoint[];
    temperature: ChartDataPoint[];
}

export interface WeatherStatisticsData {
    sectionTitle: string;
    stations: {
        name: string;
        data: WeatherMetricData;
    }[];
    maxValue: number;
}
