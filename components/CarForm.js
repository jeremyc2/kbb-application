import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

export default function CarDetailsForm() {

  var make;
  var model;
  var year;

  return (
    <View>
      <Card style={styles.card}>
        <TextInput style={styles.textInput} onChangeText={(text) => make = text} />
        <Text>Make</Text>
        <TextInput style={styles.textInput} onChangeText={(text) => model = text} />
        <Text>Model</Text>
        <TextInput style={styles.textInput} onChangeText={(text) => year = text} />
        <Text>Year</Text>
      </Card>
      <Card style={styles.card}>
        <CarDetailsForm make={make} model={model} year={year} />
      </Card>
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
    backgroundColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});
