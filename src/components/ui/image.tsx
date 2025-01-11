import React from "react";
import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      src,
      alt,
      fallback = "https://via.placeholder.com/400x300",
      ...props
    },
    ref,
  ) => {
    const [error, setError] = React.useState(false);

    return (
      <img
        ref={ref}
        src={error ? fallback : src}
        alt={alt}
        className={cn("object-cover", className)}
        loading="lazy"
        onError={() => setError(true)}
        {...props}
      />
    );
  },
);

Image.displayName = "Image";

export { Image };
