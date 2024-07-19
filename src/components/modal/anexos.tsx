import { Collections } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import { Attachment } from "../../types/problem";
import { baseURL } from "../../config";
import { updateCallImages } from "../../services/requests/call";
import { useCustomContext } from "../../contexts/context";
import { Heading } from "../custom/heading";
import { CameraPlus } from "@phosphor-icons/react";

interface ProblemAnexosProps {
  anexos?: Attachment[]
}

export function ProblemAnexos({ anexos = [] }: ProblemAnexosProps) {
  const { dispatch, state } = useCustomContext();
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const newAnexos = anexos.map(anexo => anexo.path);
  console.log(anexos);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).slice(0, 6 - files.length); // Limit to 6 files
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

      const readerPromises = selectedFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerPromises).then((newPreviews) => {
        setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
      });

      try {
        dispatch({ type: 'CHANGE-LOADING', payload: true });
        await updateCallImages(selectedFiles, state.modalDetails?.problem?.id!);
        dispatch({ type: 'CHANGE-LOADING', payload: false });
      } catch (err) {
        console.error(err);
        dispatch({ type: 'CHANGE-LOADING', payload: false });
      }
    }
  };

  return (
    <Stack>
      <Heading text='Anexos' variant="h6" icon={<Collections fontSize="small" sx={{ mr: 2 }} />} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', mt: 2 }}>
        {newAnexos.map((preview, index) => (
          <Box key={index} sx={{ width: '50px', height: '50px' }}>
            <img src={`${baseURL}/call/attachment/${preview}`} alt="" style={{ width: '50px', height: '50px' }} />
          </Box>
        ))}
        {imagePreviews.map((preview, index) => (
          <Box key={index} sx={{ width: '50px', height: '50px' }}>
            <img src={preview} alt="" style={{ width: '50px', height: '50px' }} />
          </Box>
        ))}
        <IconButton color='primary' component="label" sx={{ height: 50, width: 50, borderColor: 'transparent' }}>
          <CameraPlus />
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            multiple
            accept="image/*"
          />
        </IconButton>
      </Box>
    </Stack>
  );
}
