import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SliderProps {}

interface SliderState {
    currentIndex: number;
}

class Slider extends Component<SliderProps, SliderState> {
    constructor(props: SliderProps) {
        super(props);
        this.state = {
            currentIndex: 0
        };
    }

    images = [
        require('../assets/images/doc-banner-2.jpg'),
        require('../assets/images/doc-banner-1.jpg'),
        require('../assets/images/doc-banner-3.jpg'),
        require('../assets/images/doc-banner-4.jpg')
    ];

    handlePrev = () => {
        this.setState((prevState) => ({
            currentIndex: prevState.currentIndex === 0 ? this.images.length - 1 : prevState.currentIndex - 1
        }));
    };

    handleNext = () => {
        this.setState((prevState) => ({
            currentIndex: prevState.currentIndex === this.images.length - 1 ? 0 : prevState.currentIndex + 1
        }));
    };

    render() {
        const { currentIndex } = this.state;

        return (
            <View className="flex-row items-center justify-between mx-4 mb-5">
                <TouchableOpacity onPress={this.handlePrev} className="p-4">
                    <MaterialIcons name="keyboard-double-arrow-left" size={20} color="gray" />
                </TouchableOpacity>

                <View className="flex flex-col items-center mt-3 mb-3">
                    <Image source={this.images[currentIndex]} className="h-[20vh] w-[80vw]" />
                </View>

                <TouchableOpacity onPress={this.handleNext} className="p-4">
                    <MaterialIcons name="keyboard-double-arrow-right" size={20} color="gray" />
                </TouchableOpacity>
            </View>
        );
    }
}

export default Slider;