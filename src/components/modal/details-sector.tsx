import { Chip, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { SelectPure } from "../custom/custom-input";
import { updateCallPartial } from "../../services/requests/call";
import { useCustomContext } from "../../contexts/context";
import { Sector } from "../../types/problem";

interface ProblemDetailProps {
  title: string;
  icon: ReactNode;
  state: Sector;
  handleChange?: () => void;
}

export function ProblemDetailSector({ icon, title, ...rest }: ProblemDetailProps) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(rest['state']);
  const { state } = useCustomContext();

  const { modalDetails: { problem } } = state;

  const handleChange = async (e: SelectChangeEvent<unknown>) => {
    const selectedValue = e.target.value as Sector;
    if (Object.values(Sector).includes(selectedValue)) {
      setValue(selectedValue);
      await updateCallPartial({ 'sector': selectedValue }, problem?.id!);
    }
  };

  return (
    <Stack>
      <Typography variant="h6" sx={{ mb: .5 }}>{title}</Typography>
      {
        edit ? (
          <SelectPure label="Status" onBlur={() => setEdit(false)} onChange={handleChange} options={Sector} value={value} />
        ) : (
          <Chip onClick={() => setEdit(true)} label={
            <Stack flexDirection='row' alignItems='center'>
              {icon} {value}
            </Stack>
          } />
        )
      }
    </Stack>
  );
}
