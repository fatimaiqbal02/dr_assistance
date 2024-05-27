import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Button from '../../components/Button';
import { useUserContext } from '../../contexts/UserContext';
import { useAuthContext } from '../../contexts/AuthContext';

interface ProfileFormData {
    name: string;
    email: string;
    password: string;
    phone: string;
    image: string;
}

// Class component ProfileForm
class ProfileForm extends React.Component<{
    userDetails: any,
    updateUserDetails: (token: string, data: any) => void,
    userAuthentication: any
}, {
    formData: ProfileFormData
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            formData: {
                name: props.userDetails?.name || '',
                email: props.userDetails?.email || '',
                password: 'password123',
                phone: props.userDetails?.phone || '',
                image: ''
            }
        };
    }

    handleImageClick = () => {
        console.log('Add image...');
    };

    handleSubmit = () => {
        console.log('Form submitted', this.state.formData);
        const { password, image, ...updatedData } = this.state.formData;
        this.props.updateUserDetails(this.props.userAuthentication.token, updatedData);
        Alert.alert("Profile", "Profile Updated Successfully");
    };

    render() {
        const { formData } = this.state;

        return (
            <ScrollView className='bg-white'>
                <View className="px-4 pt-4 bg-white mt-10">
                    <View className="items-center mb-4">
                        <TouchableOpacity onPress={this.handleImageClick}>
                            <Image
                                source={formData.image ? formData.image : require('../../assets/images/placeholder.webp')}
                                className="h-[20vh] aspect-square rounded-full"
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="p-2">
                        <Text className="mb-2 text-[#045883]">Name</Text>
                        <TextInput
                            className="border-[#3f3e7a] border rounded-md p-2 mb-2"
                            value={formData.name}
                            onChangeText={text => this.setState(prevState => ({ ...prevState, formData: { ...prevState.formData, name: text } }))}
                        />
                    </View>

                    <View className="p-2">
                        <Text className="mb-2 text-[#045883]">Email</Text>
                        <TextInput
                            className="border-[#3f3e7a] border rounded-md p-2 mb-2"
                            value={formData.email}
                            onChangeText={text => this.setState(prevState => ({ ...prevState, formData: { ...prevState.formData, email: text } }))}
                        />
                    </View>
                    <View className="p-2">
                        <Text className="mb-2 text-[#045883]">Password</Text>
                        <TextInput
                            secureTextEntry
                            className="border-[#3f3e7a] border rounded-md p-2 mb-2"
                            value={formData.password}
                            onChangeText={text => this.setState(prevState => ({ ...prevState, formData: { ...prevState.formData, password: text } }))}
                        />
                    </View>
                    <View className="p-2">
                        <Text className="mb-2 text-[#045883]">Phone</Text>
                        <TextInput
                            className="border-[#3f3e7a] border rounded-md p-2 mb-2"
                            value={formData.phone}
                            onChangeText={text => this.setState(prevState => ({ ...prevState, formData: { ...prevState.formData, phone: text } }))}
                        />
                    </View>

                    <View className="flex items-center">
                        <Button className="bg-[#045883] mt-3 w-[50%]" onPress={this.handleSubmit}>
                            <Text className="text-white font-bold">Update</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

// Functional component wrapper to provide user context to ProfileForm
const ProfileFormWrapper: React.FC = () => {
    const { userDetails, updateUserDetails } = useUserContext();
    const { userAuthentication } = useAuthContext();

    return (
        <ProfileForm
            userDetails={userDetails}
            updateUserDetails={updateUserDetails}
            userAuthentication={userAuthentication}
        />
    );
};

export default ProfileFormWrapper;
