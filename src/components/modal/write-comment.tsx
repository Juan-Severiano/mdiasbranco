import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import CustomOutlinedInput from "../../styles/theme/custom-outlined-input";
import { useState } from "react";
import { useCustomContext } from "../../contexts/context";
import { createComment, deleteComment } from "../../services/requests/call";
import { localClient } from "../../lib/local/client";
import { ArrowCircleDown, ArrowCircleUp, PaperPlaneTilt, Trash } from "@phosphor-icons/react";
import { Comments } from "../../types/problem";
import { baseURL } from "../../config";

interface WriteCommentProps {
  comments: Comments[];
  setComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  reload?: () => Promise<void>
}

export function WriteComment({ comments, setComments, reload }: WriteCommentProps) {
  const [message, setMessage] = useState('');
  const { dispatch, state } = useCustomContext();
  const { data } = localClient.getUser();
  const [showComments, setShowComments] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message === '') return;
    dispatch({ type: 'CHANGE-LOADING', payload: true });
    try {
      const res = await createComment({
        call: state.modalDetails.problem?.id!,
        message: message,
        problem: state.modalDetails.problem?.title!,
        user: data?.id!
      });
      setComments(prevComments => [...prevComments, {...res, user: data}]);
      setMessage('');
      if (reload) reload()
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      dispatch({ type: 'CHANGE-LOADING', payload: false });
    }
  }

  async function handleDelete(id: number) {
    try {
      dispatch({ type: 'CHANGE-LOADING', payload: true });
      await deleteComment(id);
      setComments(prevComments => prevComments.filter(comment => comment.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: 'CHANGE-LOADING', payload: false });
      if (reload) reload()
    }
  }

  return (
    <>
      <form onSubmit={e => onSubmit(e)}>
        <Stack flexDirection='row' width='100%' alignItems='center' sx={{ mt: 2 }}>
          <Avatar src={`${baseURL}/user/attachment/${data?.image_id?.path}`} sx={{ width: 30, height: 30, mr: 2 }} />
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
      <Box maxHeight={100} sx={{ overflow: 'auto' }}>
        {showComments && comments?.map((item, index) => (
          <Stack key={index} flexDirection='row' width='90%' alignItems='center' sx={{ mt: 2, ml: 6 }}>
            <Avatar src={`${baseURL}/user/attachment/${item.user?.image_id?.path}`} sx={{ width: 30, height: 30, mr: 2 }} />
            <Box>
              <Typography fontWeight={600}>{item.user.name}</Typography>
              <Typography>{item.message}</Typography>
            </Box>
            <IconButton sx={{ ml: 'auto' }} color='error' onClick={() => handleDelete(item.id!)}>
              <Trash />
            </IconButton>
          </Stack>
        ))}
      </Box>
      {
        comments?.length > 0 && <Typography
          sx={{ my: 2, ":hover": { cursor: 'pointer' } }}
          color='#174AE4' variant="body2"
          onClick={() => setShowComments(prev => !prev)}
        >
          <Stack flexDirection='row' spacing={1} alignItems='center' justifyContent='center'>
            {showComments ? 'Esconder comentários' : 'Mostrar comentários'}
            {showComments ? <ArrowCircleUp /> : <ArrowCircleDown />}
          </Stack>
        </Typography>
      }
    </>
  );
}
