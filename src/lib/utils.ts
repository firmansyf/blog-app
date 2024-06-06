import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Fetch api random image
export const getRandomImage = async (): Promise<string | null> => {
  try {
    const response = await axios.get("https://random.imagecdn.app/800/400");
    return response.request.responseURL; // Return the final URL
  } catch (error) {
    console.error("Error fetching random image:", error);
    return null;
  }
};
