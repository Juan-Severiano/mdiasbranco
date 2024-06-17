import { Card, CardHeader, IconButton, Modal, CardContent, CardActions, Button, Grid, Stack, Typography, Chip, Box } from '@mui/material';
import { Close, CrisisAlert, SaveOutlined } from '@mui/icons-material'
import { useCustomContext } from '../../contexts/context';
import { Logo } from '../core/logo';
import { useEffect, useState } from 'react';
import { MarkDownEditor } from './markdown-editor';
import ReactMarkdown from 'react-markdown';
import { Heading } from '../custom/heading';
import { IconAlignJustified } from '@tabler/icons-react';
import { Keyboard, ListBullets, Pencil } from '@phosphor-icons/react';
import { WriteComment } from './write-comment';
import { ProblemDetail } from './details';
import { ProblemAnexos } from './anexos';
import { SolutionDetails } from './solution';
import { updateCallPartial } from '../../services/requests/call';
import { ProblemDetailSector } from './details-sector';
import { Sync } from '../core/sync';

function ModalProblem() {
  const { dispatch, state } = useCustomContext()

  const { modalDetails: { problem } } = state

  const [isEditing, setIsEditing] = useState(false);
  const [markdownContent, setMarkdownContent] = useState<string>(problem?.description!);

  useEffect(() => {
    setMarkdownContent(problem?.description!)
  }, [problem?.description])

  const handleEditorChange = async ({ text }: { text: string }) => {
    setMarkdownContent(text);
  };

  const handleEditorClick = () => {
    setIsEditing(true);
  };

  const handleBlur = async () => {
    dispatch({ payload: true, type: 'CHANGE-LOADING' })
    await updateCallPartial({ 'description': markdownContent }, problem?.id!)
    setIsEditing(false);
    dispatch({ payload: false, type: 'CHANGE-LOADING' })
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE-MODAL-DETAILS' })
  };

  const handleFinally = () => {
    dispatch({ payload: true, type: 'CHANGE-LOADING' })
    setTimeout(() => {
      dispatch({ type: 'CLOSE-MODAL-DETAILS' })
      dispatch({ payload: false, type: 'CHANGE-LOADING' })
    }, 800)
  };

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
        overflow: 'auto', pb: 2
      }}
    >
      <Grid container justifyContent='center' alignItems='center' >
        <Grid item xs={11} md={9}>
          <Card>
            <CardHeader
              title={
                <Stack width='100%' flexDirection='row' justifyContent='center'>
                  <Logo theme='dark' width={200} />
                </Stack>
              }
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
                    <Heading color='primary' fontWeight={600} text={problem?.title!} icon={<Keyboard fontSize={32} style={{ marginRight: 20 }} />} />
                  </Grid>
                  <Grid item xs={12} container spacing={2}>
                    <Grid item xs={4}>
                      <ProblemDetail
                        title="Status"
                        state={problem?.status!}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <ProblemDetailSector
                        icon={<CrisisAlert color="action" fontSize='small' sx={{ mr: .5 }} />}
                        title="Setor"
                        state={problem?.sector!}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Heading text='Descrição' icon={<IconAlignJustified style={{ marginRight: 20 }} />} />
                    {
                      isEditing ? (
                        <MarkDownEditor
                          handleBlur={handleBlur}
                          handleEditorChange={handleEditorChange}
                          content={markdownContent}
                        />
                      ) : (
                        <Typography>
                          <ReactMarkdown>
                            {markdownContent}
                          </ReactMarkdown>
                        </Typography>
                      )
                    }
                    <Stack>
                      <Chip
                        sx={{ ml: 'auto' }}
                        onClick={isEditing ? handleBlur : handleEditorClick}
                        label={
                          <Box
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {!isEditing ? <><Pencil /> Editar</> : state.loading.loading ? <><SaveOutlined color='action' /> Salvando ...</> : <><SaveOutlined color='action' /> Salvar</>}
                          </Box>
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Heading text='Atividades' icon={<ListBullets color='action' style={{ marginRight: 20 }} />} />
                    <WriteComment />
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={4} spacing={3}>
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
