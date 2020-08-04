import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

const FormFieldGroup = styled.div`
  margin-bottom: 35px;
  display: flex;
  flex-direction: column;
`;

const FormFieldError = styled.span`
  color: #d93025;
  font-size: 16px;
  margin-top: 5px;
`;

function CadastroVideo() {
  const valoresIniciais = {
    titulo: 'Video padrão',
    url: 'https://www.youtube.com/watch?v=jOAU81jdi-c',
    categoria: 'Front End',
  };
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const {
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
  } = useForm({
    valoresIniciais,
    validate: () => {
      // eslint-disable-next-line no-shadow
      const errors = {};

      if (values.titulo.trim() === '') {
        errors.titulo = 'Título é um campo obrigatório.';
      }
      if (values.url.trim() === '') {
        errors.url = 'URL é um campo obrigatório.';
      }
      if (values.categoria.trim() === '') {
        errors.categoria = 'Categoria é um campo obrigatório.';
      }
      return errors;
    },
  });
  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });
  }, []);

  const validate = () => {
    if (errors && (errors.titulo || errors.url || errors.categoria)) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // eslint-disable-next-line no-alert
    // alert('Video Cadastrado com sucesso!!!!');
    if (validate()) {
      const categoriaEscolhida = categorias
        .find((categoria) => categoria.titulo === values.categoria);

      if (!categoriaEscolhida) {
        // eslint-disable-next-line no-alert
        alert('Categoria não existente na base');
        return;
      }

      videosRepository.create({
        titulo: values.titulo,
        url: values.url,
        categoriaId: categoriaEscolhida.id,
      })
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('Cadastrou com sucesso!');
          history.push('/');
        });
    }
  };

  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>

      <form onSubmit={(event) => handleSubmit(event)}>
        <FormFieldGroup>
          <FormField
            label="Título do Vídeo"
            name="titulo"
            value={values.titulo}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.titulo && errors.titulo && <FormFieldError>{errors.titulo}</FormFieldError>}
        </FormFieldGroup>
        <FormFieldGroup>
          <FormField
            label="URL"
            name="url"
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.url && errors.url && <FormFieldError>{errors.url}</FormFieldError>}
        </FormFieldGroup>

        <FormFieldGroup>
          <FormField
            label="Categoria"
            name="categoria"
            value={values.categoria}
            onChange={handleChange}
            suggestions={categoryTitles}
            onBlur={handleBlur}
          />
          {touched.categoria && errors.categoria
            && <FormFieldError>{errors.categoria}</FormFieldError>}
        </FormFieldGroup>

        <Button type="submit">
          Cadastrar
        </Button>
      </form>

      <br />
      <br />

      <Link to="/cadastro/categoria">
        Cadastrar Categoria
      </Link>
    </PageDefault>
  );
}

export default CadastroVideo;
