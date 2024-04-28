import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const cityCodes = [
  { city: "ATHENS", code: "ATH" },
  { city: "ADDIS ABABA", code: "ADD" },
  { city: "RAMON", code: "RAM" },
  { city: "LARNACA", code: "LCA" },
  { city: "PAPHOS", code: "ATH" },
  { city: "BAKU", code: "GYD" },
  { city: "AMSTERDAM", code: "AMS" },
  { city: "TASHKENT", code: "TAS" },
  { city: "HERAKLION", code: "HER" },
  { city: "PRAGUE", code: "PRG" },
  { city: "BATUMI", code: "BUS" },
  { city: "ROME", code: "FCO" },
  { city: "DUBAI", code: "DXB" },
  { city: "MADRID", code: "MAD" },
  { city: "MOSCOW", code: "DME" },
  { city: "RHODES", code: "RHO" },
  { city: "KILIMANJARO", code: "RJO" },
  { city: "ZANZIBAR", code: "ZNZ" },
  { city: "BARCELONA", code: "BCN" },
  { city: "TBILISI", code: "TBS" },
  { city: "SAMARKAND VIA TASHKENT", code: "SKD" },
  { city: "SOCHI", code: "ATH" },
  { city: "MAHE SEYCHELLES VIA COLOMBO", code: "ATH" },
  { city: "SOCHI VIA S.PETERSBURG", code: "ATH" },
  { city: "BELGRADE", code: "BEG" },
  { city: "SOCHI VIA S.PETERSBURG", code: "ATH" },
  { city: "SAMARKAND via TASHKENT", code: "TAS" },
];

export const getAirPortByCityName = (city: string) => {
  const object = cityCodes.find((City) => city === City.city);
  if (!object) {
    return "???";
  }
  return object.code;
};
