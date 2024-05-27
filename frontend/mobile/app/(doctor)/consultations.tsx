import React, { Component } from 'react';
import { View, Text } from 'react-native';

interface ConsultationsProps {}

class Consultations extends Component<ConsultationsProps> {
  render() {
    return (
      <View className="w-full bg-[#dadbdc]">
        <Text>Upcoming Consultations</Text>
      </View>
    );
  }
}

export default Consultations;