import { Card, CardHeader, IconButton, Modal, CardContent, CardActions, Button, Grid, Stack, Typography, Chip, Box } from '@mui/material';
import { Circle, Close, CrisisAlert, SaveOutlined } from '@mui/icons-material'
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

function ModalProblem() {
  const { dispatch, state } = useCustomContext()

  const { modalDetails: { problem } } = state

  const [isEditing, setIsEditing] = useState(false);
  const [markdownContent, setMarkdownContent] = useState<string>(problem?.description!);

  useEffect(() => {
    setMarkdownContent(problem?.description!)
  }, [problem?.description])

  const handleEditorChange = ({ text }: { text: string }) => {
    setMarkdownContent(text);
  };

  const handleEditorClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleClose = () => {
    dispatch({ type: 'CLOSE-MODAL-DETAILS' })
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
        paddingTop: 4,
        paddingBottom: 4,
        maxHeight: '100vh'
      }}
    >
      <div style={{
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        paddingTop: '40px',
        paddingBottom: '40px',
      }}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={11} md={8}>
            <Card>
              <CardHeader
                title={
                  <Stack width='100%' flexDirection='row' justifyContent='center'>
                    <Logo theme='dark' width={200} />
                  </Stack>
                }
                action={
                  <IconButton onClick={handleClose} aria-label="Fechar">
                    <Close />
                  </IconButton>
                } />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Heading color='primary' fontWeight={600} text={problem?.title!} icon={<Keyboard fontSize={32} style={{ marginRight: 20 }} />} />
                  </Grid>
                  <Grid item xs={12} md={8} container spacing={2}>
                    <Grid item xs={3}>
                      <ProblemDetail
                        icon={<Circle color="warning" fontSize='small' sx={{ mr: .5 }} />}
                        title="Status"
                        value='Pendente'
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <ProblemDetail
                        icon={<CrisisAlert color="action" fontSize='small' sx={{ mr: .5 }} />}
                        title="Setor"
                        value={problem?.setor!}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={8}>
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
                            {!isEditing ? <><Pencil /> Editar</> : <><SaveOutlined color='action' /> Salvar</>}
                          </Box>
                        }
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Heading text='Atividades' icon={<ListBullets color='action' style={{ marginRight: 20 }} />} />
                    <WriteComment />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button fullWidth sx={{ height: 60 }} variant='contained'>Finalizar</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Modal>

  );
}

export default ModalProblem;
