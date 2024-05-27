import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import Button from '../components/Button';
import { useRouter } from 'expo-router';

interface WelcomeProps {
  router: any; // Adjust the type according to the actual type of `router`
}

class Welcome extends Component<WelcomeProps> {
  render() {
    const { router } = this.props;

    const handleSignIn = () => {
      router.push("signIn");
    };

    const handleSignUp = () => {
      router.push("signUp");
    };

    return (
      <View className="flex-1">
        <ImageBackground source={require('../assets/images/welcome.jpg')} resizeMode="cover" className="justify-end flex-1 items-center gap-3 p-5">
          <Text className="text-white text-2xl font-bold mb-24">Doctor Assistance</Text>
          <Button className="bg-[#045883]" onPress={handleSignIn}>
            <Text className="color-white text-base">Sign In</Text>
          </Button>
          <Button className="border border-white" onPress={handleSignUp}>
            <Text className="color-white text-base">Create Account</Text>
          </Button>
        </ImageBackground>
      </View>
    );
  }
}

export default function WelcomeWrapper(props: any) {
  const router = useRouter();
  return <Welcome {...props} router={router} />;
}