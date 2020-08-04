import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
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

function CadastroCategoria() {
  const history = useHistory();

  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '#ffffff',
  };

  const {
    handleChange,
    values,
    clearForm,
    errors,
    touched,
    handleBlur,
  } = useForm({
    valoresIniciais,
    // eslint-disable-next-line no-shadow
    validate: (values) => {
      // eslint-disable-next-line no-shadow
      const errors = {};

      if (values.nome.trim() === '') {
        errors.nome = 'Nome da Categoria é um campo obrigatório.';
      }
      if (values.cor.trim() === '') {
        errors.cor = 'Cor é um campo obrigatório.';
      }
      return errors;
    },
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });
  }, []);

  const validate = () => {
    if (errors && (errors.nome || errors.cor)) {
      return false;
    }
    return true;
  };

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>

      <form onSubmit={function handleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();
        if (validate()) {
          const categoriaEscolhida = categorias
            .find((categoria) => categoria.titulo === values.categoria);

          if (categoriaEscolhida) {
            // eslint-disable-next-line no-alert
            alert('Categoria já existente na base');
            return;
          }

          categoriasRepository.create({
            titulo: values.nome,
            // url: values.descricao,
            cor: values.cor,
          })
            .then(() => {
              // eslint-disable-next-line no-console
              // console.log('Cadastrou com sucesso!');
              history.push('/');
            });

          clearForm();
        }
      }}
      >

        <FormFieldGroup>
          <FormField
            label="Nome da Categoria"
            name="nome"
            value={values.nome}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.nome && errors.nome && <FormFieldError>{errors.nome}</FormFieldError>}
        </FormFieldGroup>

        <FormFieldGroup>
          <FormField
            label="Descrição"
            type="textarea"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
          />
        </FormFieldGroup>
        <FormFieldGroup>
          <FormField
            label="Cor"
            type="color"
            name="cor"
            value={values.cor}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.cor && errors.cor && <FormFieldError>{errors.cor}</FormFieldError>}
        </FormFieldGroup>

        <Button type="submit">
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
        <div>
          {/* Cargando... */}
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
