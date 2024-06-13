import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  sector: Yup.string().required('Setor é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  files: Yup.array()
    .of(
      Yup.mixed().test('fileSize', 'O arquivo é muito grande', (value) => {
        if (value) {
          return (value as File).size <= 1024 * 1024;
        }
        return true;
      })
    )
    .max(6, 'Você pode enviar no máximo 6 imagens')
});
