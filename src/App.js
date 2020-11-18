import React, { useState } from "react";
import { ErrorMessage, Formik, Field, Form as FormikForm } from "formik";
import { mask, unMask } from "remask";
import PropTypes from "prop-types";
import * as yup from "yup";
import "./App.css";

const validation = yup.object().shape({
  numero: yup.number().required('Adicione o Número'),
  logradouro: yup.string().required('Campo Vazio'),
  cidade: yup.string().required('Campo Vazio'),
  bairro: yup.string().required('Campo Vazio'),
  uf: yup.string().required('Campo Vazio'),
});

function onBlurCep(ev, setFieldValue) {
  const { value } = ev.target;

  const cep = value?.replace(/[^0-9]/g, "");

  if (cep?.length !== 8) {
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .then((data) => {
      setFieldValue("cep", data.cep);
      setFieldValue("logradouro", data.logradouro);
      setFieldValue("bairro", data.bairro);
      setFieldValue("cidade", data.localidade);
      setFieldValue("uf", data.uf);
    });
}

const Formu = () => {
  
  const [value, setValue] = useState("");
  const onChange = (ev) => {
    const OriginalValue = unMask(ev.target.value);
    const maskedValue = mask(OriginalValue, ["99999-999"]);
    setValue(maskedValue);
  };

  const handleSubmit = (e) => {
    alert(JSON.stringify(e));
  }

  return (
    <div className="App">
      <Formik
        validationSchema={validation}
        onSubmit={handleSubmit}
        validateOnMount
        initialValues={{
          cep: "",
          logradouro: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          uf: "",
        }}
        render={({ setFieldValue }) => (
          <FormikForm className="Form" >
            <h1 style={{ fontSize: 25, color: '#bfb90a', fontWeight: 'bold',  }}> Validador de Endereço </h1>
            <h2> Insira seu Cep </h2>
            <div className="Form-Group">
              <label>Cep</label>
              <Field
                className="Form-Field"
                name="cep"
                onChange={onChange}
                value={value}
                type="text"
                onBlur={(ev) => onBlurCep(ev, setFieldValue)}
              />
              <ErrorMessage
                className="Form-Error"
                component="span"
                name="cep"
              />
            </div>
            <div className="Form-Group">
              <label>Logradouro</label>
              <Field className="Form-Field" name="logradouro" type="text" />
              <ErrorMessage
                className="Form-Error"
                component="span"
                name="logradouro"
              />
            </div>
            <div className="Form-Group">
              <label>Número</label>
              <Field className="Form-Field" name="numero" type="text" />
              <ErrorMessage
                className="Form-Error"
                component="span"
                name="numero"
              />
            </div>
            <div className="Form-Group">
              <label>Complemento</label>
              <Field className="Form-Field" name="complemento" type="text" />
              <ErrorMessage
                className="Form-Error"
                component="span"
                name="complemento"
              />
            </div>
            <div className="Form-Group">
              <label>bairro</label>
              <Field className="Form-Field" name="bairro" type="text" />
              <ErrorMessage
                className="Form-Error"
                component="span"
                name="bairro"
              />
            </div>
            <div className="Form-Group">
              <label>Cidade</label>
              <Field className="Form-Field" name="cidade" type="text" />
              <ErrorMessage
                className="Form-Error"
                component="span"
                name="cidade"
              />
            </div>
            <div className="Form-Group">
              <label>Estado</label>
              <Field className="Form-Field" name="uf" />
              <ErrorMessage
                className="Form-Error"
                component="span"
                name="cidade"
              />
            </div>
            <button type="submit" className="Form-Btn">
              Enviar
            </button>
          </FormikForm>
        )}
      />
    </div>
  );
};
Formu.propTypes = {
  initialValues: PropTypes.object.isRequired,
  // handleSubmit: PropTypes.func.isRequired,
};

export default Formu;
