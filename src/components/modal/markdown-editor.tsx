import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box } from '@mui/material';

interface MarkDownEditorProps {
  content: string;
  handleEditorChange: ({ text }: { text: string }) => void;
  handleBlur: () => void;
}

function MarkDownEditor({ content, handleBlur, handleEditorChange }: MarkDownEditorProps) {
  return (
    <Box sx={{ width: '100%', maxHeight: 200, my: 1, overflow: 'auto' }}>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onReady={(editor: any) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(_: any, editor: any) => {
          const data = editor.getData();
          handleEditorChange({ text: data });
        }}
        onBlur={() => {
          handleBlur();
        }}
        onFocus={(_: any, editor: any) => {
          console.log('Focus.', editor);
        }}
      />
    </Box>
  );
}

export default MarkDownEditor;
