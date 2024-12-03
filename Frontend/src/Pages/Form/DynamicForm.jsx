import React, { useState, useEffect, useContext } from 'react';
import { FormPage } from '../../components/Forms/FormPage';
import useFetch from '../../Hooks/UseFetch';
import API_URL from '../../../config';
import formsone from '../../assets/formsone.jpg';
import formstwo from '../../assets/formstwo.jpg';
import formsthree from '../../assets/formsthree2.0.jpg';
import servicio from '../../assets/servicio.png';
import { FormPage4 } from '../Form/FormPage4';
import './DynamicForm.css';
import { LoginContext } from '../../Context/LoginContext';
import config from '../../../config';
import { FetchContext } from '../../Context/FetchContext';
import Unauthorized from '../../Components/Unauthorized/Unauthorized';

const DynamicForm = () => {

  const { user, token, role, updateUserField } = useContext(LoginContext);
  const { form, handleFetchForm } = useContext(FetchContext);
  const { data, error, loading } = useFetch(`${config.API_URL}/form`, token, role);

  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]); 
  const [validationMessage, setValidationMessage] = useState(""); 

  useEffect(() => {

    if (error) return;

    if (data) {
      handleFetchForm(data.form[0].forms, data.form[0]._id); 
    }
  }, [data, error]);

  useEffect(() => {
    if (Array.isArray(form) && form.length > 0 && user) {
      const orderedQuestions = form.sort((a, b) => a.order - b.order);
      setQuestions(orderedQuestions);
      setResponses(new Array(orderedQuestions.length).fill(null).map((item, index) => user.form[index] ? 'cumple' : 'no cumple'));
    }
    console.log(user);
  }, [form])

  const startIndex = (currentStep - 1) * 2; 
  const currentQuestions = questions.slice(startIndex, startIndex + 2);

  let imageSrc;
  switch (currentStep) {
    case 1:
      imageSrc = formsone;
      break;
    case 2:
      imageSrc = formstwo;
      break;
    case 3:
      imageSrc = formsthree;
      break;
    case 4:
      imageSrc = servicio;
      break;
    default:
      imageSrc = servicio;
      break;
  }

  const handleResponseChange = (index, response) => {
    setResponses((prev) => {
      const updatedResponses = [...prev];
      updatedResponses[index] = response;
      updateUserField('form', updatedResponses.map((item) => item === 'cumple'));
      return updatedResponses;
    });
  };

  const handleNext = () => {
    if (responses.every(response => response !== null)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1); 
        setValidationMessage(""); 
      }
    } else {
      setValidationMessage("Por favor, selecciona una respuesta para todas las preguntas.");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); 
    }
  };

  if (role !== 'user') return <Unauthorized/>
  if (loading) return <p>Extrayendo datos de formulario...</p>
  if (!form || form.length === 0)
    return <p>No hay formulario disponible...</p>

  return (
    <div className="formContainer">
      {currentStep === 4 ? (
        <FormPage4 /> 
      ) : (
        <FormPage
          steps={[1, 2, 3, 4]}
          currentStep={currentStep}
          imageSrc={imageSrc}
          questions={questions}
          responses={responses}
          onNext={handleNext}
          onBack={handleBack}
          validationMessage={validationMessage}
          onOptionSelect={handleResponseChange} 
        />
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default DynamicForm;
