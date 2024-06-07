import { Avatar, Stack } from "@mui/material";
import CustomOutlinedInput from "../../styles/theme/custom-outlined-input";

export function WriteComment() {
  return (
    <Stack flexDirection='row' width='100%' alignItems='center' sx={{ mt: 2 }}>
      <Avatar sx={{ width: 30, height: 30, mr: 2 }} />
      <CustomOutlinedInput sx={{ height: 40 }} fullWidth placeholder="Adicione um comentário" />
    </Stack>
  )
}
