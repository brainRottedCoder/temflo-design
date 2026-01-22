/**
 * Data Service
 * 
 * This service provides functions to fetch data from JSON files.
 * In production, these functions can be easily replaced with API calls.
 */

import type {
    DashboardData,
    DischargeStationsData,
    WeatherStationsData,
    RainGaugeStationsData,
    StatisticsData,
    WeatherStatisticsData,
    RainGaugeStatisticsData,
} from '../types';

// Import JSON data
import dashboardData from '../data/dashboard.json';
import dischargeStationsData from '../data/dischargeStations.json';
import weatherStationsData from '../data/weatherStations.json';
import rainGaugeStationsData from '../data/rainGaugeStations.json';
import statisticsData from '../data/statistics.json';

// Default delay for simulating API calls (2 seconds)
const API_DELAY = 2000;

/**
 * Helper function to simulate API delay
 */
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ===== SYNCHRONOUS FUNCTIONS (for backwards compatibility) =====

export function getDashboardData(): DashboardData {
    return dashboardData as DashboardData;
}

export function getDischargeStations(): DischargeStationsData {
    return dischargeStationsData as DischargeStationsData;
}

export function getWeatherStations(): WeatherStationsData {
    return weatherStationsData as WeatherStationsData;
}

export function getRainGaugeStations(): RainGaugeStationsData {
    return rainGaugeStationsData as RainGaugeStationsData;
}

export function getDischargeStatistics(): StatisticsData {
    return statisticsData.discharge as StatisticsData;
}

export function getWeatherStatistics(): WeatherStatisticsData {
    return statisticsData.weather as WeatherStatisticsData;
}

export function getRainGaugeStatistics(): RainGaugeStatisticsData {
    return statisticsData.rainGauge as RainGaugeStatisticsData;
}

// ===== ASYNC FUNCTIONS (with simulated API delay) =====

export async function fetchDashboardData(): Promise<DashboardData> {
    await delay(API_DELAY);
    return dashboardData as DashboardData;
}

export async function fetchDischargeStations(): Promise<DischargeStationsData> {
    await delay(API_DELAY);
    return dischargeStationsData as DischargeStationsData;
}

export async function fetchWeatherStations(): Promise<WeatherStationsData> {
    await delay(API_DELAY);
    return weatherStationsData as WeatherStationsData;
}

export async function fetchRainGaugeStations(): Promise<RainGaugeStationsData> {
    await delay(API_DELAY);
    return rainGaugeStationsData as RainGaugeStationsData;
}

export async function fetchDischargeStatistics(): Promise<StatisticsData> {
    await delay(API_DELAY);
    return statisticsData.discharge as StatisticsData;
}

export async function fetchWeatherStatistics(): Promise<WeatherStatisticsData> {
    await delay(API_DELAY);
    return statisticsData.weather as WeatherStatisticsData;
}

export async function fetchRainGaugeStatistics(): Promise<RainGaugeStatisticsData> {
    await delay(API_DELAY);
    return statisticsData.rainGauge as RainGaugeStatisticsData;
}

// ===== ALL DATA FETCH (single call for initial load) =====

export interface AllDashboardData {
    dashboard: DashboardData;
    dischargeStations: DischargeStationsData;
    weatherStations: WeatherStationsData;
    rainGaugeStations: RainGaugeStationsData;
    dischargeStatistics: StatisticsData;
    weatherStatistics: WeatherStatisticsData;
    rainGaugeStatistics: RainGaugeStatisticsData;
}

export async function fetchAllDashboardData(): Promise<AllDashboardData> {
    await delay(API_DELAY);
    return {
        dashboard: dashboardData as DashboardData,
        dischargeStations: dischargeStationsData as DischargeStationsData,
        weatherStations: weatherStationsData as WeatherStationsData,
        rainGaugeStations: rainGaugeStationsData as RainGaugeStationsData,
        dischargeStatistics: statisticsData.discharge as StatisticsData,
        weatherStatistics: statisticsData.weather as WeatherStatisticsData,
        rainGaugeStatistics: statisticsData.rainGauge as RainGaugeStatisticsData,
    };
}
