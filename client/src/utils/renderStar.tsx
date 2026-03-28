import { Star } from "lucide-react";

export const renderStars = (rating: number) => {
  return [...Array(5)].map((_, i) => (
    <Star
      key={i}
      size={18}
      className={`${
        i < Math.floor(rating)
          ? "fill-emerald-400 text-emerald-400"
          : "text-gray-300"
      }`}
    />
  ));
};
