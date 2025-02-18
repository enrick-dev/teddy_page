import React from "react";

const IconPeople = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <path
      fill="#0F0F0F"
      className={className}
      d="M10 2.625a3.962 3.962 0 0 0-3.958 3.958c0 2.142 1.675 3.875 3.858 3.95a.675.675 0 0 1 .183 0H10.142a3.948 3.948 0 0 0 3.816-3.95A3.962 3.962 0 0 0 10 2.625ZM14.233 12.75c-2.325-1.55-6.116-1.55-8.458 0-1.058.708-1.642 1.667-1.642 2.692 0 1.025.584 1.975 1.634 2.675 1.166.783 2.7 1.175 4.233 1.175 1.533 0 3.067-.392 4.233-1.175 1.05-.709 1.634-1.659 1.634-2.692-.009-1.025-.584-1.975-1.634-2.675Z"
    />
  </svg>
);
export default IconPeople;
