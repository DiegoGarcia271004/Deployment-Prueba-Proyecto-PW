import React from 'react';
import { RadioOption } from './RadioOption';
import './InspectionItem.css';

export const InspectionItem = ({ description, selectedOption, onOptionSelect }) => {
  return (
    <section className="inspectionItem">
      <p className="description">{description}</p>
      <div className="divider" />
      <div className="optionsContainer">
        <RadioOption
          label="Cumple"
          isSelected={selectedOption === 'cumple'}
          onClick={() => onOptionSelect('cumple')} 
        />
        <RadioOption
          label="No cumple"
          isSelected={selectedOption === 'no cumple'}
          onClick={() => onOptionSelect('no cumple')} 
        />
      </div>
    </section>
  );
};
