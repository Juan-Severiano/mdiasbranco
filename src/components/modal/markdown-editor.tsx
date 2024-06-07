import markdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite';
import '../../styles/md-editor.css';

interface MarkDownEditorProps {
  content: string
  handleEditorChange: ({ text }: { text: string }) => void
  handleBlur: () => void
}

export function MarkDownEditor({ content, handleEditorChange, handleBlur }: MarkDownEditorProps) {

  return (
    <>
      <MdEditor
        value={content}
        style={{ height: '150px', width: '100%', marginTop: 10, marginBottom: 10 }}
        renderHTML={(text) => markdownIt().render(text)}
        onChange={handleEditorChange}
        onBlur={handleBlur}
      />
    </>
  )
}
