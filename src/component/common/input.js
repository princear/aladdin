import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { GREY_DD, BLACK, WHITE } from '../../scenes/styles/color';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FREDOKA_ONE_REGULAR } from '../../scenes/styles/typography';

export default function Input(props) {
  const {
    inputstyle,
    width,
    height,
    color,
    borderColor,
    placeholderTextColor,
    placeholder,
    secureTextEntry,
    editable,
    inputRef,
    errorStyle,
    errortext,
  } = props;
  return (
    <View>
      <TextInput
        {...props}
        style={[
          styles.inputstyle,
          {
            width: width ? width : wp(85),
            height: height ? height : hp(6),
            color: color ? color : BLACK,
            borderColor: borderColor ? borderColor : GREY_DD,
          },
          inputstyle,
        ]}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry || false}
        editable={editable}
        ref={inputRef}
      />
      {errortext == null || errortext == '' ? null : (
        <Text
          style={[styles.errorStyle, { color: errortext == null ? WHITE : 'red' }, errorStyle]}
        >
          {errortext}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputstyle: {
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: hp(2),
    marginTop: hp(2),
  },
  errorStyle: { width: wp(85), alignSelf: 'center', fontSize: 12, },
});
