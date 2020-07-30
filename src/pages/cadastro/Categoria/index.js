import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

const CadastroCategoria = () => {
  const initialValues = {
    nome: '',
    descricao: '',
    cor: '',
  };
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    const url = 'http://localhost:8080/categorias';
    fetch(url).then(async (resposta) => {
      const res = await resposta.json();
      setCategorias([
        ...res,
      ]);
    });
  }, []);

  const setValue = (chave, valor) => {
    // chave: nome, descricao, bla, bli
    setValues({
      ...values,
      [chave]: valor, // nome: 'valor'
    });
  };

  const handleChange = (infosDoEvento) => {
    setValue(
      infosDoEvento.target.getAttribute('name'),
      infosDoEvento.target.value,
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCategorias([
      ...categorias,
      values,
    ]);

    setValues(initialValues);
  };

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {' '}
        {values.nome}
      </h1>

      <form onSubmit={handleSubmit}>

        <FormField
          label="Nome da Categoria"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />
        {/* <div>
              <label>
                Descrição:
                <textarea
                  type="text"
                  value={values.descricao}
                  name="descricao"
                  onChange={handleChange}
                />
              </label>
            </div> */}

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />
        {/* <div>
              <label>
                Cor:
                <input
                  type="color"
                  value={values.cor}
                  name="cor"
                  onChange={handleChange}
                />
              </label>
            </div> */}

        <Button>
          Cadastrar
        </Button>
      </form>

      <ul>
        {categorias.map((categoria, indice) => {
          const i = indice;
          return (
            <li key={`${categoria}${i}`}>
              {categoria.titulo}
            </li>
          );
        })}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
};

export default CadastroCategoria;
