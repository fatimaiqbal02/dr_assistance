import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface StatsCardProps {
    icon: string;
    title: string;
    value: string;
}

class StatsCard extends Component<StatsCardProps> {
    render() {
        const { icon, title, value } = this.props;
        
        return (
            <View className="w-[48%] p-4 bg-[#d3e8f7] rounded-lg shadow-md flex-row items-center mb-4">
                <FontAwesome5 name={icon} size={24} color="#0A5C8E" style="mr-2" />
                <View className="ml-1">
                    <Text className="text-md font-bold">{title}</Text>
                    <Text className="text-lg text-[#045883]">{value}</Text>
                </View>
            </View>
        );
    }
}

export default StatsCard;