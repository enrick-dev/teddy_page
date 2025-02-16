import React from 'react';
import { cn } from '../utils/cn';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `placeholder:text-[#AAAAAA] flex h-10 w-full rounded-sm border-2 border-border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:outline-0`,
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
