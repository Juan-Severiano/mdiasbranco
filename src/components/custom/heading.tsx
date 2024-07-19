import { Typography, TypographyProps } from "@mui/material";
import { ReactNode } from "react";

interface HeadingProps extends TypographyProps {
  text: string
  icon: ReactNode
}

export function Heading({ icon, text, variant, ...rest }: HeadingProps) {
  return (
    <Typography {...rest} variant={variant ?? 'h5'} sx={{ display: 'flex', alignItems: 'center' }}>
      {icon} {text}
    </Typography>
  )
}
