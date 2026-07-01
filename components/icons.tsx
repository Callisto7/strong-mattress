import type { Icon } from '@tabler/icons-react';

/** Матрас: скруглённый «слэб» со швом-пиллоутопом и стёжкой. */
export const IconMattress: Icon = ({
  size = 24,
  stroke = 2,
  color = 'currentColor',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="7.5" width="20" height="9" rx="3" />
    <path d="M2 11.5h20" />
    <path d="M6.5 9v1.2M12 9v1.2M17.5 9v1.2" />
  </svg>
);
