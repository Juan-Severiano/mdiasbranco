import { Collections } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Attachment } from "../../types/problem";
import { baseURL } from "../../config";

interface ProblemAnexosProps {
  anexos?: Attachment[]
}

export function ProblemAnexos({ anexos = [] }: ProblemAnexosProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const newAnexos = anexos.map(anexo => anexo.path.split(`\\`)[1]);
  console.log(anexos);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).slice(0, 3 - files.length); // Limit to 10 files
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
    }
  };

  return (
    <Stack>
      <Typography variant="h6" sx={{ mb: .5 }}>Anexos</Typography>
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ height: 30, justifyContent: 'flex-start', borderColor: 'transparent' }}
        startIcon={<Collections />}
      >
        Upload
        <input
          type="file"
          hidden
          onChange={handleFileChange}
          multiple
          accept="image/*"
        />
      </Button>
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
      </Box>
    </Stack>
  );
}
