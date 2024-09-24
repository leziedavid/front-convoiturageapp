// utils/calculateDistance.ts

/**
 * Calculate the distance between two geographic points using the Haversine formula.
 * @param point1 - The first point with latitude and longitude.
 * @param point2 - The second point with latitude and longitude.
 * @returns The distance between the two points in kilometers.
 */
export const calculateDistance = (point1: { lat: number; lon: number }, point2: { lat: number; lon: number }): number => {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const lat1 = toRadians(point1.lat);
    const lon1 = toRadians(point1.lon);
    const lat2 = toRadians(point2.lat);
    const lon2 = toRadians(point2.lon);

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
};



/**
 * Calculate the estimated time to travel a given distance at a specific average speed.
 * @param distance - The distance in kilometers.
 * @param averageSpeed - The average speed in kilometers per hour.
 * @returns The estimated time as a string in hours and minutes.
 */
export const calculateEstimatedTime = (distance: number, averageSpeed: number): string => {
    if (averageSpeed <= 0) {
        throw new Error('Average speed must be greater than zero');
    }

    const estimatedHours = distance / averageSpeed;
    const hours = Math.floor(estimatedHours);
    const minutes = Math.round((estimatedHours - hours) * 60);

    return `${hours}h ${minutes} min`;
};