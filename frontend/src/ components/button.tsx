import * as React from 'react';
import { LineMdLoadingLoop } from '../assets/LineMdLoadingLoop';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isLoading, ...props }, ref) => {
    const isDisabled = isLoading ? { disabled: true } : {};
    return (
      <button
        className={cn(
          `bg-primary cursor-pointer  text-primary-foreground hover:bg-primary/90 px-4 py-2 transition-all inline-flex items-center justify-center whitespace-nowrap rounded-sm  focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50`,
          className,
        )}
        ref={ref}
        {...props}
        {...isDisabled}
      >
        {!isLoading ? children : <LineMdLoadingLoop />}
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button };
