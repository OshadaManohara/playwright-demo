import * as React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size = "md", variant = "spinner", ...props }, ref) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-8 h-8",
      lg: "w-12 h-12",
    };

    if (variant === "spinner") {
      return (
        <div
          ref={ref}
          data-testid="loader-spinner"
          className={cn("flex items-center justify-center", className)}
          {...props}
        >
          <div
            className={cn(
              "animate-spin rounded-full border-2 border-muted border-t-primary",
              sizeClasses[size]
            )}
          />
        </div>
      );
    }

    if (variant === "dots") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-center space-x-1",
            className
          )}
          {...props}
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      );
    }

    if (variant === "pulse") {
      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center", className)}
          {...props}
        >
          <div
            className={cn(
              "bg-primary rounded-full animate-pulse",
              sizeClasses[size]
            )}
          />
        </div>
      );
    }

    return null;
  }
);
Loader.displayName = "Loader";

interface LoadingOverlayProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = "Loading...",
  size = "lg",
  variant = "spinner",
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 space-y-4"
      data-testid="loading-overlay"
    >
      <Loader size={size} variant={variant} />
      <p
        className="text-sm text-muted-foreground"
        data-testid="loading-message"
      >
        {message}
      </p>
    </div>
  );
};

const InlineLoader: React.FC<{ size?: "sm" | "md" | "lg" }> = ({
  size = "sm",
}) => {
  return <Loader size={size} className="inline-flex" />;
};

export { Loader, LoadingOverlay, InlineLoader };
