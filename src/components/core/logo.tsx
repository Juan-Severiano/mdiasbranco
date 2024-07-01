import { motion } from 'framer-motion';

export interface LogoProps {
  height?: number;
  width?: number;
  theme?: 'light' | 'dark';
}

export function AnimatedLogo({ height, width, theme }: LogoProps) {
  let logo = '/logo.png';
  if (theme === 'dark') {
    logo = '/logo-white.png';
  }

  return (
    <motion.img
      alt="M. Dias Branco"
      height={height ?? 'auto'}
      src={logo}
      width={width ?? '90%'}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );
}

export function Logo({ height, width, theme }: LogoProps) {
  let logo = '/logo.png'
  if (theme === 'dark') {
    logo = '/logo-white.png'
  }
  return <img alt="M. Dias Branco" height={height ?? 'auto'} src={logo} width={width ?? '90%'} />;
}
