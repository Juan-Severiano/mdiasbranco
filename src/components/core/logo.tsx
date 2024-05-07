
export interface LogoProps {
  height?: number;
  width?: number;
  theme?: 'light' | 'dark' 
}

export function Logo({ height, width, theme }: LogoProps) {
  let logo = '/logo.svg'
  if (theme === 'dark') {
    logo = '/logo-white.png'
  }
  return <img alt="M. Dias Branco" height={height ?? 'auto'} src={logo} width={width ?? '90%'} />;
}
