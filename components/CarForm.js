import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import CarDetailsForm from './CarDetailsForm';
import parseStyles from '../parseStyles.js';

const request = new XMLHttpRequest();

export default function CarForm() {
  const [selectedMake, setSelectedMake] = React.useState('make');
  const [selectedModel, setSelectedModel] = React.useState('model');
  const [selectedYear, setSelectedYear] = React.useState('year');

  const [stylesList, setStylesList] = React.useState('styles');

  function buildPathString() {
    return `/${selectedMake}/${selectedModel}/${selectedYear}`;
  }

  React.useEffect(() => {

    if(selectedMake == 'make' || selectedModel == 'model' || selectedYear == 'year') {
      return;
    }

    request.reused = false;

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }
  
      if (request.status === 200) {
  
        var res = request.responseText;
  
        if(request.responseURL.startsWith('https://kbb-quick-search.glitch.me')) {
          if(res == '' || res == '[]') {
              res = null;
          } else {
              res = JSON.parse(res);
          }
        } else {
          res = parseStyles(res, buildPathString());
          if(res.length == 0)
            res = null;
        }
        
        setStylesList(res);
          
      } else if(request.status === 0) {

        if(request.reused == true) {
          console.log("We've already reused this request object for new request");
          return;
        }

        request.reused = true;
  
        var url = `https://kbb-quick-search.glitch.me/styles${buildPathString()}`;
  
        request.open('GET', url);
        request.send();
  
      } else {
        console.warn(`${request.status}: ${request.statusText}`);
      }
    };

    request.open('GET', `https://www.kbb.com${buildPathString()}`);
    request.send();

  }, [selectedMake, selectedModel, selectedYear]);

  return (
    <View>
      <Card style={styles.card}>
        <TextInput style={styles.textInput} onChangeText={(text) => setSelectedMake(text)} />
        <Text>Make</Text>
        <TextInput style={styles.textInput} onChangeText={(text) => setSelectedModel(text)} />
        <Text>Model</Text>
        <TextInput style={styles.textInput} onChangeText={(text) => setSelectedYear(text)} />
        <Text>Year</Text>
      </Card>
      {selectedMake != 'make' && selectedMake != '' && 
       selectedModel != 'model' && selectedModel != '' && 
       selectedYear != 'year' && selectedYear != '' &&
       stylesList != 'styles' && stylesList != null &&
      <Card style={styles.card}>
        <CarDetailsForm generalUrl={`https://www.kbb.com${buildPathString()}`} styles={stylesList} make={selectedMake} model={selectedModel} year={selectedYear} />
      </Card>}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'black',
    borderBottomWidth: 2,
    padding: 5,
  },
  card: {
    backgroundColor: '#f3b50a',
    padding: 10,
    marginBottom: 10,
    width: 300,
    alignSelf: 'center',
  },
});
