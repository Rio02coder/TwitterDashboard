import React from 'react';
import {
  TextInputProps,
  TextInput,
  StyleProp,
  ViewStyle,
  View,
  TextStyle,
} from 'react-native';
import {useFormikContext} from 'formik';
import styles from './styles';
import Errors from '../../errors';

export type TProps<D> = TextInputProps & {
  contentStyle?: StyleProp<ViewStyle> | StyleProp<TextStyle>;
  field: keyof D;
  isMandatory?: boolean;
  height: ViewStyle['height'];
  width: ViewStyle['width'];
};

function FormTextInput<D>({
  field,
  isMandatory,
  contentStyle,
  height,
  width,
  ...textInputProps
}: TProps<D>) {
  const {handleBlur, handleChange, values, errors, touched} =
    useFormikContext<D>();
  return (
    <>
      <TextInput
        style={[styles.container, contentStyle, {height: height, width: width}]}
        value={values[field] as string}
        onChangeText={handleChange(field)}
        onBlur={handleBlur(field as string)}
        placeholderTextColor={'#9fa19f'}
        {...textInputProps}
      />
      <View style={styles.errors}>
        <Errors touched={touched} field={field} errors={errors} />
      </View>
    </>
  );
}

export default React.memo(FormTextInput) as unknown as typeof FormTextInput;
