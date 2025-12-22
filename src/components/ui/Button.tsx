import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "icon";
}

export const Button = ({
    children,
    className = "",
    variant = "primary",
    size = "md",
    ...props
}: ButtonProps) => {
    const baseStyles = cn(
        "inline-flex items-center justify-center rounded-lg font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
        className
    );

    const variants = {
        primary: "bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground shadow-lg hover:shadow-secondary/25 hover:-translate-y-0.5 hover:bg-secondary/90",
        outline: "border-2 border-primary text-primary hover:bg-primary/5",
        ghost: "text-foreground hover:bg-accent/10 hover:text-accent",
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        icon: "h-10 w-10 p-0",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
};
