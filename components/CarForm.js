import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

import CarDetailsForm from './CarDetailsForm';
import parseStyles from '../parseStyles.js';

function getRequestID(make, model, year) {
  return `${make}/${model}/${year}`;
}

var requestIDState;
function setRequestIDState(text) {
  requestIDState = text;
}

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

    request.id = requestIDState;
    request.reused = false;

    // console.log(`(#1) Make: ${selectedMake}, Model: ${selectedModel}, Year: ${selectedYear}, ReqID: ${request.id}, ReqIDState: ${requestIDState}`);

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }
  
      if (request.status === 200) {

        // console.log(`(#2) Make: ${selectedMake}, Model: ${selectedModel}, Year: ${selectedYear}, ReqID: ${request.id}, ReqIDState: ${requestIDState}`);

        if(requestIDState != request.id){
          console.log("returning...");
          return;
        }
  
        var res = request.responseText;
  
        if(request.responseURL.startsWith('https://kbb-quick-search.glitch.me')) {
          if(res == '' || res == '[]') {
              res = null;
          } else {
              res = JSON.parse(res);
          }
        } else {
          res = parseStyles(res, `/${request.id}`);
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

        console.log("New request from API. Request ID = " + request.id);
  
        var url = `https://kbb-quick-search.glitch.me/styles/${request.id}`;
  
        request.open('GET', url);
        request.send();
  
      } else {
        console.warn(`${request.status}: ${request.statusText}`);
      }
    };

    request.open('GET', `https://www.kbb.com/${request.id}`);
    request.send();

  }, [selectedMake, selectedModel, selectedYear]);

  return (
    <View>
      <Card style={styles.card}>
        <TextInput style={styles.textInput} onChangeText={(text) => {setRequestIDState(getRequestID(text, selectedModel, selectedYear)); setSelectedMake(text)}} />
        <Text>Make</Text>
        <TextInput style={styles.textInput} onChangeText={(text) => {setRequestIDState(getRequestID(selectedMake, text, selectedYear)); setSelectedModel(text)}} />
        <Text>Model</Text>
        <TextInput style={styles.textInput} onChangeText={(text) => {setRequestIDState(getRequestID(selectedMake, selectedModel, text)); setSelectedYear(text)}} />
        <Text>Year</Text>
      </Card>
      {selectedMake != 'make' && selectedMake != '' && 
       selectedModel != 'model' && selectedModel != '' && 
       selectedYear != 'year' && selectedYear != '' &&
       requestIDState != null && stylesList != 'styles' && stylesList != null &&
      <Card style={styles.card}>
        <CarDetailsForm generalUrl={`https://www.kbb.com/${requestIDState}`} styles={stylesList} make={selectedMake} model={selectedModel} year={selectedYear} />
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
