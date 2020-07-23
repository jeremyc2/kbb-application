import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

export default function CarDetailsForm() {
  const [selectedMake, setSelectedMake] = React.useState('make');
  const [selectedModel, setSelectedModel] = React.useState('model');
  const [selectedYear, setSelectedYear] = React.useState('year');

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
      <Card style={styles.card}>
        <CarDetailsForm make={selectedMake} model={selectedModel} year={selectedYear} />
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
