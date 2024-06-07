import { Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Para renderizar corretamente tabelas, lista de tarefas, etc.

export const renderMarkdownPreview = (markdownContent: string) => {
  return (
    <Typography component="div">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
    </Typography>
  );
};
