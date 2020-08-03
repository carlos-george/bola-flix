import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

import './styles.css';

// function validate(values) {
//   const errors = {};

//   if (values.nome.trim() === '') {
//     errors.nome = 'Nome é um campo obrigatório.';
//   }
//   if (values.cor.trim() === '') {
//     errors.cor = 'Cor é um campo obrigatório.';
//   }

//   return errors;
// }

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
    setTouched,
    handleBlur,
    validateValues,
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

        <div className="form-field">
          <FormField
            label="Nome da Categoria"
            name="nome"
            value={values.nome}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.nome && errors.nome && <span className="form-field-error">{errors.nome}</span>}
        </div>

        <div className="form-field">
          <FormField
            label="Descrição"
            type="textarea"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <FormField
            label="Cor"
            type="color"
            name="cor"
            value={values.cor}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.cor && errors.cor && <span className="form-field-error">{errors.cor}</span>}
        </div>

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
