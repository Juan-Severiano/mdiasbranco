import { Chip, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface ProblemDetailProps {
  title: string
  icon: ReactNode
  value: string
}

export function ProblemDetail({ icon, title, value }: ProblemDetailProps) {
  return (
    <Stack>
      <Typography variant="h6" sx={{ mb: .5 }}>{title}</Typography>
      <Chip label={
        <Stack flexDirection='row' alignItems='center'>
          {icon} {value}
        </Stack>
      } />
    </Stack>
  )
}
