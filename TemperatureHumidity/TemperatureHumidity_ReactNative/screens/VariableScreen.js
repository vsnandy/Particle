import React from 'react';
import { ScrollView, Text, Button, TextInput,
  StyleSheet, TouchableOpacity, View, Modal, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import Ionicon from 'react-native-vector-icons/Ionicons'

import { fetchVariable } from '../api';

// Global ID variable
let id = 0;

const Variable = (props) => {
  return (
    <View style={styles.variableContainer}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>
        <View>
          <Text style={[styles.variableText, {fontWeight: 'bold'}]}>{props.variable.device}</Text>
          <Text style={styles.variableText}>{props.variable.varName}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text style={styles.variableValue}>{props.variable.val}</Text>
          <TouchableOpacity
            style={styles.refresh}
            onPress={() => props.onRefresh(props.variable)}
          >
            <Ionicon name="ios-refresh" size={30} color="#0a3067" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default class VariableScreen extends React.Component {
  state = {
    variables: [],
    isCreating: false,
    deviceName: '',
    variableName: '',
  };

  // Based off the selected variable to refresh, call the Particle API
  refreshVariable = async (variable) => {
    try {
      // get the designated variable from device
      const result = await fetchVariable(variable.device, variable.varName);

      // set the returned value into the variables state dictionary
      // reset error message for that variable
      let newVariables = [...this.state.variables];
      newVariables.forEach(v => {
        if(v.id === variable.id) {
          if(result.result !== null) {
            v.val = result.result.toFixed(2);
          } else {
            v.val = "NaN";
          }
        }
      });

      this.setState({
        variables: newVariables,
      });
    } catch(err) {
      console.log(err);
      let newVariables = [...this.state.variables];
      newVariables.forEach(v => {
        if(v.id === variable.id) {
          v.val = err.message
        }
      });

      // if there is an error, set the error message
      this.setState({
        variables: newVariables,
      });
    }
  }

  createVariable = () => {
    this.setState({
      isCreating: !this.state.isCreating,
    });
  }

  addVariable = () => {
    id++;
    this.setState({
      variables: [...this.state.variables, { id: id, device: this.state.deviceName, varName: this.state.variableName, val: 0 }],
      isCreating: !this.state.isCreating,
      deviceName: '',
      variableName: '',
    });
  }

  handleDeviceNameChange = (device) => {
    this.setState({
      deviceName: device,
    });
  }

  handleVariableNameChange = (variable) => {
    this.setState({
      variableName: variable,
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <Modal visible={this.state.isCreating}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: 'white', marginBottom: 15,}}>Add a Device Variable</Text>
            <TextInput style={styles.input} placeholder="Device Name" onChangeText={this.handleDeviceNameChange} />
            <TextInput style={styles.input} placeholder="Variable Name" onChangeText={this.handleVariableNameChange} />
            <Button title="Add Variable" onPress={this.addVariable} color="white"/>
          </View>
        </Modal>

        <TouchableOpacity 
          style={styles.addButton} 
          onPress={this.createVariable}
        >
          <Text style={styles.addText}>
            +
          </Text>
        </TouchableOpacity>
        <ScrollView style={styles.scrollFill}>
          {this.state.variables.map((variable) => (
            <Variable
              variable={variable}
              key={variable.id.toString()}
              onRefresh={this.refreshVariable}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    alignItems: 'stretch',
  },
  modalContent: {
    flex: 0.25,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: Constants.statusBarHeight,
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'stretch',
    width: '75%',
    backgroundColor: '#0a3067',
  },
  input: {
    fontSize: 24,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  addButton: {
    borderWidth: 2,
    marginBottom: 25,
    borderRadius: 25,
    borderColor: '#0a3067',
    width:75,
    height: 75,
    alignSelf: 'center',
    //backgroundColor: 'yellow',
  },
  addText: {
    fontSize: 48,
    textAlign: 'center',
    color: '#0a3067',
  },
  scrollFill: {
    marginBottom: 25,
  },
  variableContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 25,
    marginHorizontal: 10,
    backgroundColor: '#0a3067',
  },
  variableText: {
    fontSize: 18,
    padding: 5,
    color: 'white',
  },
  variableValue: {
    fontSize: 32, 
    padding: 5, 
    alignSelf: 'center',
    color: 'white',
  },
  refresh: {
    padding: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    backgroundColor: 'white',
  },
});