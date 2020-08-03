import { useState, useEffect } from 'react';

function useForm({
  valoresIniciais,
  validate,
}) {
  const [values, setValues] = useState(valoresIniciais);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function validateValues(newValues) {
    setErrors(validate(newValues));
  }

  useEffect(() => {
    validateValues(values);
  }, [values]);

  function setValue(chave, valor) {
    // chave: nome, descricao, bla, bli
    setValues({
      ...values,
      [chave]: valor, // nome: 'valor'
    });
  }

  function handleChange(infosDoEvento) {
    setValue(
      infosDoEvento.target.getAttribute('name'),
      infosDoEvento.target.value,
    );
  }

  function handleBlur(event) {
    const field = event.target.getAttribute('name');

    setTouched({
      ...touched,
      [field]: true,
    });
  }

  function clearForm() {
    setValues(valoresIniciais);
  }

  return {
    values,
    handleChange,
    clearForm,
    errors,
    setErrors,
    touched,
    setTouched,
    handleBlur,
    validateValues,
  };
}

export default useForm;
