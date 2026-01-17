/**
 * Data Service
 * 
 * This service provides functions to fetch data from JSON files.
 * In production, these functions can be easily replaced with API calls.
 * 
 * Example API replacement:
 * ```typescript
 * export async function getDashboardData(): Promise<DashboardData> {
 *   const response = await fetch('/api/dashboard');
 *   return response.json();
 * }
 * ```
 */

import type {
    DashboardData,
    DischargeStationsData,
    WeatherStationsData,
    StatisticsData,
    WeatherStatisticsData,
} from '../types';

// Import JSON data
import dashboardData from '../data/dashboard.json';
import dischargeStationsData from '../data/dischargeStations.json';
import weatherStationsData from '../data/weatherStations.json';
import statisticsData from '../data/statistics.json';

/**
 * Get dashboard data including metrics and last updated info
 */
export function getDashboardData(): DashboardData {
    return dashboardData as DashboardData;
}

/**
 * Get all discharge stations data
 */
export function getDischargeStations(): DischargeStationsData {
    return dischargeStationsData as DischargeStationsData;
}

/**
 * Get all weather stations data
 */
export function getWeatherStations(): WeatherStationsData {
    return weatherStationsData as WeatherStationsData;
}

/**
 * Get statistics data for discharge view
 */
export function getDischargeStatistics(): StatisticsData {
    return statisticsData.discharge as StatisticsData;
}

/**
 * Get weather statistics data
 */
export function getWeatherStatistics(): WeatherStatisticsData {
    return statisticsData.weather as WeatherStatisticsData;
}
