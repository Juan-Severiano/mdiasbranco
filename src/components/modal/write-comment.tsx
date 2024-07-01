import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import CustomOutlinedInput from "../../styles/theme/custom-outlined-input";
import { useState } from "react";
import { useCustomContext } from "../../contexts/context";
import { createComment } from "../../services/requests/call";
import { localClient } from "../../lib/local/client";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { Comments } from "../../types/problem";

interface WriteCommentProps {
  comments: Comments[];
  setComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  reload?: () => Promise<void>
}

export function WriteComment({ comments, setComments, reload }: WriteCommentProps) {
  const [message, setMessage] = useState('');
  const { dispatch, state } = useCustomContext();
  const { data } = localClient.getUser();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message === '') return;
    dispatch({ type: 'CHANGE-LOADING', payload: true });
    try {
      const res = await createComment({
        call: state.modalDetails.problem?.id!,
        message: message,
        problem: state.modalDetails.problem?.title!,
        user: data.id
      });
      if (res && res.data && res.data.comment) {
        setComments(prevComments => [...prevComments, res.data.comment]);
      }
      setMessage('');
      if (reload) reload()
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      dispatch({ type: 'CHANGE-LOADING', payload: false });
    }
  }

  return (
    <>
      <form onSubmit={e => onSubmit(e)}>
        <Stack flexDirection='row' width='100%' alignItems='center' sx={{ mt: 2 }}>
          <Avatar sx={{ width: 30, height: 30, mr: 2 }} />
          <CustomOutlinedInput
            sx={{ height: 40 }}
            fullWidth
            placeholder="Adicione um comentário"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <IconButton type="submit" disabled={state.loading.loading} color="primary">
            <PaperPlaneTilt weight="fill" size={22} />
          </IconButton>
        </Stack>
      </form>
      {comments?.map((item, index) => (
        <Stack key={index} flexDirection='row' width='80%' alignItems='center' sx={{ mt: 2, ml: 3 }}>
          <Avatar sx={{ width: 30, height: 30, mr: 2 }} />
          <Box>
            <Typography fontWeight={600}>Dono do comentário</Typography>
            <Typography>{item.message}</Typography>
          </Box>
        </Stack>
      ))}
    </>
  );
}
