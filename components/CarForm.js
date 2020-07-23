import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

export default function CarDetailsForm(props) {
  return (
    <View>
      <Card style={styles.card}>
        <TextInput style={styles.textInput} onChangeText={(text) => null} />
        <Text>Make</Text>
        <TextInput style={styles.textInput} onChangeText={(text) => null} />
        <Text>Model</Text>
        <TextInput style={styles.textInput} onChangeText={(text) => null} />
        <Text>Year</Text>
      </Card>
              <Card style={styles.card}>
          <CarDetailsForm make="kia" model="forte" year="2010" />
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
