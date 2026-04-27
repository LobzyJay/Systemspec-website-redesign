export type CityKind = 'bank' | 'mda' | 'psp';

export interface CityNode {
  city: string;
  lat: number;
  lng: number;
  kind: CityKind;
}

export const STSL_CITIES: CityNode[] = [
  { city: 'Lagos', lat: 6.5244, lng: 3.3792, kind: 'bank' },
  { city: 'Abuja', lat: 9.0765, lng: 7.3986, kind: 'mda' },
  { city: 'Port Harcourt', lat: 4.8156, lng: 7.0498, kind: 'bank' },
  { city: 'Kano', lat: 12.0022, lng: 8.5920, kind: 'bank' },
  { city: 'Ibadan', lat: 7.3775, lng: 3.9470, kind: 'psp' },
  { city: 'Enugu', lat: 6.5244, lng: 7.5106, kind: 'psp' },
];

export function latLngToVec3(
  lat: number,
  lng: number,
  radius: number,
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}
