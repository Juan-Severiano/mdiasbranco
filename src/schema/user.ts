import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  email: Yup.string().email('Deve ser um email válido').max(255).required('Email é obrigatório'),
  password: Yup.string()
    .required('Senha é obrigatória')
    .min(6, 'A senha  deve ter no mínimo 6 caracteres'),
  name: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').required('Nome Completo é obrigatório'),
  telphone: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').required('Telefone é obrigatório'),
  sector: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').required('Setor é obrigatório'),
  mat: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').required('Matrícula é obrigatório'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'As senhas devem corresponder')
    .required('Repetir senha é obrigatório'),
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

export const optionalSchema = Yup.object().shape({
  email: Yup.string().email('Deve ser um email válido').max(255).optional(),
  name: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').optional(),
  telphone: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').optional(),
  sector: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').optional(),
  mat: Yup.string().min(4, 'Deve ter no mínimo 4 caracteres').optional(),
  // files: Yup.array()
  //   .of(
  //     Yup.mixed().test('fileSize', 'O arquivo é muito grande', (value) => {
  //       if (value) {
  //         return (value as File).size <= 1024 * 1024;
  //       }
  //       return true;
  //     })
  //   )
  //   .max(6, 'Você pode enviar no máximo 6 imagens')
});
