import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import CarDetailsForm from './CarDetailsForm';

export default function CarForm() {
  const [selectedMake, setSelectedMake] = React.useState('make');
  const [selectedModel, setSelectedModel] = React.useState('model');
  const [selectedYear, setSelectedYear] = React.useState('year');
  const [stylesList, setStylesList] = React.useState('styles');

  React.useEffect(() => {

    if(selectedMake == 'make' || selectedModel == 'model' || selectedYear == 'year') {
      return;
    }

    const request = new XMLHttpRequest();

    request.make = selectedMake;
    request.model = selectedModel;
    request.year = selectedYear;

    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
  
      if (request.status === 200) {
  
        var res = request.responseText;
  
        console.log(`REQUEST: ${request.make}, ${request.model}, ${request.year}`);
        console.log(`STATE: ${selectedMake}, ${selectedModel}, ${selectedYear}`);
  
        if(request.make != selectedMake || request.model != selectedModel || request.year != selectedYear) {
          console.log("returning");
          return;
        }
  
        if(request.responseURL.startsWith('https://kbb-quick-search.glitch.me')) {
          if(res == '') {
            res = '[]'
          }
          res = JSON.parse(res);
          setStylesList(res);
        } else {
          var stylesFromKBB = parseStyles(res, `/${selectedMake}/${selectedModel}/${selectedYear}`);
          setStylesList(stylesFromKBB);
        }
          
      } else if(request.status === 0) {
  
        var url = `https://kbb-quick-search.glitch.me/styles/${selectedMake}/${selectedModel}/${selectedYear}`;
  
        request.open('GET', url);
        request.send();
  
      } else {
        console.warn(`${request.status}: ${request.statusText}`);
      }
    };

    request.open('GET', `https://www.kbb.com/${selectedMake}/${selectedModel}/${selectedYear}`);
    request.send();

  });

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
       stylesList != 'styles' &&
      <Card style={styles.card}>
        <CarDetailsForm generalUrl={`https://www.kbb.com/${selectedMake}/${selectedModel}/${selectedYear}`} styles={stylesList} make={selectedMake} model={selectedModel} year={selectedYear} />
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
