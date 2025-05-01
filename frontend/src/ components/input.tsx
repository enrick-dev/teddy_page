import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { cn } from "../utils/cn";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  if (type !== "password") {
    return (
      <input
        type={type}
        className={cn(
          `border-border flex h-10 w-full rounded-sm border-2 px-3 py-2 transition-all placeholder:text-[#AAAAAA] focus:outline-0 disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  }

  return (
    <div className="relative flex w-full items-center">
      <input
        type={inputType}
        className={cn(
          `border-border flex h-10 w-full rounded-sm border-2 px-3 py-2 transition-all placeholder:text-[#AAAAAA] focus:outline-0 disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 focus:outline-none"
      >
        {showPassword ? <Eye /> : <EyeOff />}
      </button>
    </div>
  );
});

Input.displayName = "Input";

export { Input };
