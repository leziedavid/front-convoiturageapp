// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }


// utils.ts ou utils.js
import clsx from 'clsx'; // Si tu utilises clsx, importe-le ici

export const cn = (...classes: (string | false | undefined | null)[]) => {
  return clsx(...classes);
};
