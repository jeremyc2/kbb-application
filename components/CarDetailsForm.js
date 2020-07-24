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
import parseStyles from '../parseStyles.js';

export default function CarDetailsForm(props) {
  const [stylesList, setStylesList] = React.useState([]);
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

  const subUrl = `/${props.make}/${props.model}/${props.year}`;

  const generalUrl = `https://www.kbb.com${subUrl}`;

  React.useEffect(() => {
    fetch(generalUrl)
      .then((response) => response.text())
      .then((data) => parseStyles(data, subUrl))
      .then((data) => {
        setStylesList(data);
        setSelectedStyle(data[0]);
      })
      .catch((error) => {
        console.error(error);
        var url = `https://kbb-quick-search.glitch.me/styles${subUrl}`;
        console.log(`Try with new URL: ${url}`);
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setStylesList(data);
            setSelectedStyle(data[0]);
          })
          .catch((error) => {console.log(error); setStylesList(null)});
      });
  }, [subUrl, generalUrl]);

  return (
    <View>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setSelectedMileage(text)}
      />
      <Text>Mileage</Text>
      <Picker
        selectedValue={selectedCondition == 'condition'? conditions[0].value: selectedCondition}
        style={styles.picker}
        onValueChange={(itemValue) =>
          setSelectedCondition(itemValue)
        }>
        {conditions.map((condition, index) => (
          <Picker.Item key={index} label={condition.label} value={condition.value} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedStyle}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedStyle(itemValue)}>
        {stylesList && stylesList.map((style, index) => (
          <Picker.Item key={index} label={style} value={style} />
        ))}
      </Picker>
      <View style={{ marginTop: 10 }}>
        <Button
          title="Open Kelly Bluebook"
          style={styles.button}
          onPress={() => {
            if (selectedStyle == null || selectedStyle == 'style') return;
            var url = `${generalUrl}/${selectedStyle}/?pricetype=${pricetype}&intent=${intent}${
              selectedCondition != 'condition'
                ? `&condition=${selectedCondition}`
                : ''
            }${
              selectedMileage != 'mileage' ? `&mileage=${selectedMileage}` : ''
            }`;
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
