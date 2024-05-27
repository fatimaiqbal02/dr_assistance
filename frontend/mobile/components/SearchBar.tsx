import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

interface SearchBarProps {
    placeholder: string;
}

interface SearchBarState {}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
    render() {
        const { placeholder } = this.props;

        return (
            <View className="my-2 mx-4 relative bg-gray-100 rounded-lg overflow-hidden">
                <EvilIcons name="search" size={25} color="#555" className="absolute left-2 top-1/2 -translate-y-1/2" />
                <TextInput
                    placeholder={placeholder}
                    className="pl-10 py-2 pr-3 rounded-lg border border-gray-300 text-md"
                />
            </View>
        );
    }
}

export default SearchBar;