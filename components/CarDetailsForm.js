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

  const request = new XMLHttpRequest();

  request.onreadystatechange = (e) => {
    if (request.readyState !== 4) {
      return;
    }

    if (request.status === 200) {

      console.log(`Loaded: ${request.responseURL}`);

      var res = request.responseText;

      if(request.responseURL.startsWith('https://kbb-quick-search.glitch.me')) {
        res = JSON.parse(res);
        setStylesList(res);
      } else {
        setStylesList(parseStyles(res, subUrl));
      }
      
      setSelectedStyle(stylesList[0]);

    } else if(request.status === 0) {

      var url = `https://kbb-quick-search.glitch.me/styles${subUrl}`;
      console.log(`Loading: ${url}`);

      request.open('GET', url);
      request.send();

    } else {
      console.warn(`${request.status}: ${request.statusText}`);
    }
  };

  const subUrl = `/${props.make}/${props.model}/${props.year}`;
  const generalUrl = `https://www.kbb.com${subUrl}`;

  function getStyles() {

    console.log(`Loading: ${generalUrl}`);

    request.abort();

    request.open('GET', generalUrl);
    request.send();
  }

  React.useEffect(getStyles, [props.make, props.model, props.year]);

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
