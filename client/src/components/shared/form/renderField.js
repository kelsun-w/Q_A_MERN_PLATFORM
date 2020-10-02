import React from 'react';
import InputWrapper from './InputWrapper';
import Label from './Label';
import SubLabel from './SubLabel';
import LabelWrapper from './LabelWrapper';
import Error from './Error';
import SelectWrapper from './SelectWrapper';
import Input from './Input';
import RadioGroup from './RadioGroup';
import ImageInput from './Image';

const VariableField = field => {
  switch (field.type) {
    case 'select':
      return (
        <InputWrapper>
          <LabelWrapper>
            <Label>{field.label}</Label>
            <SubLabel>{field.sublabel}</SubLabel>
          </LabelWrapper>
          {field.meta.touched && field.meta.error && (
            <Error>{field.meta.error}</Error>
          )}
          <SelectWrapper>
            <Input {...field.input} as='select' type='select'>
              {field.children}
            </Input>
          </SelectWrapper>
        </InputWrapper>
      );

    case 'radiogroup':
      return (
        <InputWrapper>
          <RadioGroup field={field} />
        </InputWrapper>
      );

    case 'textarea':
      return (
        <InputWrapper>
          <LabelWrapper>
            <Label>{field.label}</Label>
            <SubLabel>{field.sublabel}</SubLabel>
          </LabelWrapper>
          {field.meta.touched && field.meta.error && (
            <Error>{field.meta.error}</Error>
          )}
          <Input
            {...field.input}
            as='textarea'
            rows='6'
            error={field.meta.touched && !!field.meta.error}
            placeholder={field.label}
          />
        </InputWrapper>
      );

    case 'file':
      return (
        <InputWrapper>
          <LabelWrapper>
            <Label>{field.label}</Label>
            <SubLabel>{field.sublabel}</SubLabel>
          </LabelWrapper>
          {field.meta.touched && field.meta.error && (
            <Error>{field.meta.error}</Error>
          )}
          <ImageInput
            field={field}
            error={field.meta.touched && !!field.meta.error}
          />
        </InputWrapper>
      );

    default:
      return (
        <InputWrapper>
          <LabelWrapper>
            <Label>{field.label}</Label>
            <SubLabel>{field.sublabel}</SubLabel>
          </LabelWrapper>
          {field.meta.touched && field.meta.error && (
            <Error>{field.meta.error}</Error>
          )}
          <Input
            {...field.input}
            error={field.meta.touched && !!field.meta.error}
            type={field.type}
            placeholder={field.label}
            autoComplete='off'
          />
        </InputWrapper>
      );
  }
};

const renderField = field => {
  return <VariableField {...field} />;
};

export default renderField;
