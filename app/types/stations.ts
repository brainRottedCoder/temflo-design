// Station data types

export type StationColor = 'blue' | 'green' | 'orange' | 'yellow';

export interface DischargeStation {
    id: string;
    title: string;
    chartKey: string;
    discharge: string;
    velocity: string;
    waterLevel: string;
    color: StationColor;
}

export interface WeatherStation {
    id: string;
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
}

export interface DischargeStationsData {
    sectionTitle: string;
    stations: DischargeStation[];
}

export interface WeatherStationsData {
    sectionTitle: string;
    stations: WeatherStation[];
}
