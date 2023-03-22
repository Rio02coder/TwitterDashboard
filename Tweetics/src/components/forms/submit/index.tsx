import React from 'react';
import {useFormikContext} from 'formik';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {submitStyles} from './styles';

type TProps = {
  height: ViewStyle['height'];
  width: ViewStyle['width'];
  top: ViewStyle['marginTop'];
};

function SubmitButton<D>({
  height,
  width,
  top,
  children,
  ...touchableOpacityProps
}: TouchableOpacityProps & TProps) {
  const {handleSubmit} = useFormikContext<D>();
  return (
    <TouchableOpacity
      style={[
        submitStyles.container,
        {height: height, width: width, marginTop: top},
      ]}
      onPress={handleSubmit}
      {...touchableOpacityProps}>
      {children ? children : <Text style={submitStyles.text}>Continue</Text>}
    </TouchableOpacity>
  );
}

export default React.memo(SubmitButton) as unknown as typeof SubmitButton;
