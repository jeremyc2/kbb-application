import * as React from 'react';
import {
  View,
  Picker,
  Button,
  TextInput,
  Text,
  Linking,
  StyleSheet,
} from 'react-native';

export default function CarDetailsForm(props) {
  const [selectedStyle, setSelectedStyle] = React.useState('style');
  const [selectedMileage, setSelectedMileage] = React.useState('mileage');
  const [selectedCondition, setSelectedCondition] = React.useState('condition');

  const pricetype = 'retail';
  const intent = 'buy-used';

  const conditions = [
    { label: 'excellent', value: 'excellent' },
    { label: 'very good', value: 'very good' },
    { label: 'good', value: 'good' },
    { label: 'fair', value: 'fair' },
  ];

  return (
    <View>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setSelectedMileage(text)}
      />
      <Text>Mileage</Text>
      <Picker
        selectedValue={selectedCondition == 'condition'? setSelectedCondition(conditions[0].value) && selectedCondition: selectedCondition}
        style={styles.picker}
        onValueChange={(itemValue) =>
          setSelectedCondition(itemValue)
        }>
        {conditions.map((condition, index) => (
          <Picker.Item key={index} label={condition.label} value={condition.value} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedStyle == 'style'? setSelectedStyle(props.styles[0]) && selectedStyle: selectedStyle}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedStyle(itemValue)}>
        {props.styles.map((style, index) => (
          <Picker.Item key={index} label={style} value={style} />
        ))}
      </Picker>
      <View style={{ marginTop: 10 }}>
        <Button
          title="Open Kelly Bluebook"
          style={styles.button}
          onPress={() => {
            if(selectedStyle == 'style') return;
            var url = `${props.generalUrl}/${selectedStyle}/?pricetype=${pricetype}&intent=${intent}${
              selectedCondition != 'condition'
                ? `&condition=${selectedCondition}`
                : ''
            }${
              selectedMileage != 'mileage' ? `&mileage=${selectedMileage}` : ''
            }`;
            console.log("Opening url: " + url);
            Linking.openURL(url);
          }}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: '#f3b50a',
    color: 'black',
    marginTop: 10,
  },
  button: {
    color: 'blue',
  },
  textInput: {
    borderColor: 'black',
    borderBottomWidth: 2,
    padding: 5,
  },
});
