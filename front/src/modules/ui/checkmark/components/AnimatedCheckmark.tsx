import { useTheme } from '@emotion/react';
import { motion } from 'framer-motion';

export type AnimatedCheckmarkProps = React.ComponentProps<
  typeof motion.path
> & {
  isAnimating?: boolean;
  color?: string;
  duration?: number;
  size?: number;
};

export const AnimatedCheckmark = ({
  isAnimating = false,
  color,
  duration = 0.5,
  size = 28,
  ...restProps
}: AnimatedCheckmarkProps) => {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      width={size}
      height={size}
    >
      <motion.path
        // eslint-disable-next-line twenty/no-spread-props
        {...restProps}
        fill="none"
        stroke={color ?? theme.grayScale.gray0}
        strokeWidth={4}
        d="M14 27l7.8 7.8L38 14"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={isAnimating ? '1' : '0'}
        animate={{ strokeDashoffset: isAnimating ? '0' : '1' }}
        transition={{ duration }}
      />
    </svg>
  );
};
