import React from 'react';
import FormTextInput, {TProps as FormTextInputProps} from '../inputs/TextInput';

export const enum InputTypes {
  TEXT_INPUT = 'TEXT_INPUT',
}

type TProps<D> = {
  type: InputTypes;
  inputProps: TextInputProps<D>;
};

type TextInputProps<D> = {
  props: FormTextInputProps<D>;
};

function getInput<D>(
  type: TProps<D>['type'],
  inputProps: TProps<D>['inputProps'],
) {
  switch (type) {
    case InputTypes.TEXT_INPUT:
      return <FormTextInput {...inputProps.props} />;
  }
}

function Input<D>({type, inputProps}: TProps<D>) {
  return getInput(type, inputProps);
}

export default React.memo(Input) as unknown as typeof Input;
