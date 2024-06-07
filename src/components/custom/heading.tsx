import { Typography, TypographyProps } from "@mui/material";
import { ReactNode } from "react";

interface HeadingProps extends TypographyProps {
  text: string
  icon: ReactNode
}

export function Heading({ icon, text, ...rest }: HeadingProps) {
  return (
    <Typography {...rest} variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
      {icon} {text}
    </Typography>
  )
}
