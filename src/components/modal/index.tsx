import { useCustomContext } from '../../contexts/context';
import { useEffect, useState } from 'react';
import { Modal, Grid, Card, CardHeader, CardContent, CardActions, Button, Stack, IconButton, Chip, Box } from '@mui/material';
import { Sync, Close, SaveOutlined, Keyboard, CrisisAlert } from '@mui/icons-material';
import { updateCallPartial } from '../../services/requests/call';
import { IconAlignJustified } from '@tabler/icons-react';
import { ListBullets } from '@phosphor-icons/react';
import { Heading } from '../custom/heading';
import { ProblemDetail } from './details';
import { ProblemDetailSector } from './details-sector';
import MarkDownEditor from './markdown-editor';
import { WriteComment } from './write-comment';
import { ProblemAnexos } from './anexos';
import { SolutionDetails } from './solution';
import CustomOutlinedInput from '../../styles/theme/custom-outlined-input';

function ModalProblem() {
  const { dispatch, state } = useCustomContext();
  const { modalDetails: { problem } } = state;
  const [editTitle, setEditTitle] = useState(false)
  const [markdownContent, setMarkdownContent] = useState<string>(state.modalDetails.problem?.description!);
  const [title, setTitle] = useState<string>(state.modalDetails.problem?.title!);
  const [comments, setComments] = useState(state.modalDetails.problem?.comments!);

  useEffect(() => {
    setComments(state.modalDetails.problem?.comments!)
    setTitle(state.modalDetails.problem?.title!)
  }, [state.modalDetails.problem])

  // async function getProblem() {
  //   const res = await getCallByID(problem!.id!);
  //   setProblem(res);
  // }

  useEffect(() => {
    setMarkdownContent(state.modalDetails.problem?.description!!);
  }, [state.modalDetails.problem?.description!]);

  // useEffect(() => {
  //   getProblem();
  // }, [getProblem]);

  const handleEditorChange = async ({ text }: { text: string }) => {
    setMarkdownContent(text);
  };

  const handleBlur = async () => {
    dispatch({ payload: true, type: 'CHANGE-LOADING' });
    await updateCallPartial({ 'description': markdownContent }, problem?.id!);
    dispatch({ payload: false, type: 'CHANGE-LOADING' });
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE-MODAL-DETAILS' });
  };

  const handleFinally = () => {
    dispatch({ payload: true, type: 'CHANGE-LOADING' });
    setTimeout(() => {
      dispatch({ type: 'CLOSE-MODAL-DETAILS' });
      dispatch({ payload: false, type: 'CHANGE-LOADING' });
    }, 800);
  };

  async function handleEditTitle() {
    if (editTitle) {
      dispatch({ payload: true, type: 'CHANGE-LOADING' });
      await updateCallPartial({ 'title': title }, problem?.id!);
      dispatch({ payload: false, type: 'CHANGE-LOADING' });
    }
    setEditTitle(prev => !prev)
  }

  return (
    <Modal
      open={state.modalDetails.modal}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        overflow: 'auto', py: 2
      }}
    >
      <Grid container justifyContent='center' alignItems='center' >
        <Grid item xs={11} md={9}>
          <Card sx={{ position: 'relative', mt: 2 }}>
            <CardHeader
              sx={{ position: 'absolute', right: 0 }}
              action={
                <Stack flexDirection='row' alignItems='center'>
                  <Sync />
                  <IconButton sx={{ ml: 2 }} onClick={state.loading.loading ? () => null : handleClose} aria-label="Fechar">
                    <Close />
                  </IconButton>
                </Stack>
              } />
            <CardContent>
              <Grid container>
                <Grid item container xs={12} md={8} spacing={3}>
                  <Grid item xs={12}>
                    {
                      !editTitle ? (
                        <Heading
                          color='primary'
                          fontWeight={600}
                          text={title}
                          icon={<Keyboard fontSize='medium' style={{ marginRight: 20 }} />}
                          onClick={handleEditTitle}
                        />
                      ) : (
                        <CustomOutlinedInput
                          type='text'
                          label='Titulo'
                          placeholder='Titulo'
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          startAdornment={<Keyboard fontSize='medium' style={{ marginRight: 20 }} />}
                          onBlur={handleEditTitle}
                          fullWidth
                          sx={{ height: 40, fontSize: 24, fontWeight: 600, color: '#0b2b70' }}
                        />
                      )
                    }
                  </Grid>
                  <Grid item xs={12} container spacing={2}>
                    <Grid item xs={4}>
                      <ProblemDetail
                        title="Status"
                        state={problem?.status! ?? 'Pendente'}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <ProblemDetailSector
                        icon={<CrisisAlert color="action" fontSize='small' sx={{ mr: .5 }} />}
                        title="Setor"
                        state={problem?.sector! ?? ''}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Heading text='Descrição' icon={<IconAlignJustified style={{ marginRight: 20 }} />} />
                    <MarkDownEditor
                      handleBlur={handleBlur}
                      handleEditorChange={handleEditorChange}
                      content={markdownContent}
                    />
                    <Stack>
                      <Chip
                        sx={{ ml: 'auto' }}
                        onClick={handleBlur}
                        label={
                          <Box
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {state.loading.loading ? <><SaveOutlined color='action' /> Salvando ...</> : <><SaveOutlined color='action' /> Salvar</>}
                          </Box>
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Heading text='Atividades' icon={<ListBullets color='action' style={{ marginRight: 20 }} />} />
                    <WriteComment comments={comments} setComments={setComments} />
                  </Grid>
                </Grid>
                <Grid item container sx={{ mt: 3 }} xs={12} md={4} spacing={3}>
                  <Grid item xs={12}>
                    <ProblemAnexos anexos={problem?.attachments!} />
                  </Grid>
                  <Grid item xs={12}>
                    <SolutionDetails />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button fullWidth sx={{ height: 60 }} onClick={handleFinally} variant='contained' disabled={state.loading.loading}>
                {state.loading.loading ? 'Salvando ...' : 'Finalizar'}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default ModalProblem;
