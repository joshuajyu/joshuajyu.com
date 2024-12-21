import { Doto } from "next/font/google";

const typeface = Doto({
  weight: ["900"],
  subsets: ["latin"],
});

export const doto = typeface.className;