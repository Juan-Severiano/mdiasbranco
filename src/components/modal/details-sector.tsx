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
  const { state, dispatch } = useCustomContext();

  const { modalDetails: { problem } } = state;

  const handleChange = async (e: SelectChangeEvent<unknown>) => {
    dispatch({ payload: true, type: 'CHANGE-LOADING' })
    const selectedValue = e.target.value as Sector;
    if (Object.values(Sector).includes(selectedValue)) {
      setValue(selectedValue);
      await updateCallPartial({ 'sector': selectedValue }, problem?.id!);
    }
    dispatch({ payload: false, type: 'CHANGE-LOADING' })
  };

  return (
    <Stack>
      <Typography variant="h6" sx={{ mb: .5 }}>{title}</Typography>
      {
        edit ? (
          <SelectPure label="Status" onBlur={() => setEdit(false)} onChange={handleChange} options={Sector} value={value} />
        ) : (
          <Chip onClick={() => setEdit(true)} sx={{ height: 40, fontSize: 14 }} label={
            <Stack flexDirection='row' alignItems='center'>
              {icon}
              <Typography variant="body2" fontWeight={500}>{value}</Typography>
            </Stack>
          } />
        )
      }
    </Stack>
  );
}
