import React, { Component } from 'react';
import { Text, View, Image, TextInput, Alert } from 'react-native';
import Button from "../components/Button"
import { Link } from 'expo-router';
import GoogleLogo from '../assets/images/SVG/GoogleLogo';
import { FontAwesome } from '@expo/vector-icons';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useRouter } from 'expo-router';
import { Role } from '../constants/constants';
import { useAuthContext } from '../contexts/AuthContext';

interface SignInProps {
    router: any; 
    authContext: any;
}

interface SignInState {
    activeTab: Role;
    user: {
        phone: string;
        password: string;
    };
}

class SignIn extends Component<SignInProps, SignInState> {
    constructor(props: SignInProps) {
        super(props);
        this.state = {
            activeTab: Role.PATIENT,
            user: {
                phone: '',
                password: '',
            }
        };
    }

    handleTabChange = (tab: Role) => {
        this.setState({ activeTab: tab });
    };

    handleLoginIn = () => {
        const { authContext } = this.props;
        const { login } = authContext;
        const { activeTab, user } = this.state;
        if (user.phone === "" || user.password === "") {
            Alert.alert("Login", "Please fill all the fields")
            return
        }

        // login("patient", "patient")
        login(user.phone, user.password, activeTab, (success: boolean, error: any, message?: string) => {
            if (error) {
                console.error("Login System Error:", error);
                Alert.alert("Login Failed", message);
            } else if (!success) {
                Alert.alert("Login Failed", message);
            }
        })
    }

    render() {
        const { activeTab, user } = this.state;

        return (
            <CustomKeyboardView>
                <View className="flex-1 px-5">
                    <View className="items-center">
                        <Image
                            source={require("../assets/images/image.png")}
                            resizeMode='contain'
                            className="h-[33vh] aspect-square"
                        />
                    </View>

                    <View className=" gap-3">
                        <Text className="text-[1.6rem] font-semibold tracking-tighter">Login</Text>


                        <View className="gap-3">
                            <View className="w-full bg-[#dadbdc] rounded-xl p-1 flex-row items-center justify-between">
                                <Button className={`w-[42vw] rounded-xl ${activeTab === Role.PATIENT ? "bg-[#045883]" : ""}`} onPress={() => this.handleTabChange(Role.PATIENT)}>
                                    <Text className={`font-bold ${activeTab === Role.PATIENT ? "text-white" : "text-[#045883]"}`}>Patient</Text>
                                </Button>
                                <Button className={`w-[42vw] rounded-xl ${activeTab === Role.DOCTOR ? "bg-[#045883]" : ""}`} onPress={() => this.handleTabChange(Role.DOCTOR)}>
                                    <Text className={`font-bold ${activeTab === Role.DOCTOR ? "text-white" : "text-[#045883]"}`}>Doctor</Text>
                                </Button>
                            </View>
                            <View className="gap-2">
                                <Text className="text-black text-sm">Phone No</Text>
                                <TextInput
                                    className="w-full py-2 px-2 rounded-lg border border-gray-300 text-sm"
                                    placeholder="Enter your phoneNo"
                                    value={user.phone}
                                    onChangeText={value => this.setState(prevState => ({ ...prevState, user: { ...prevState.user, phone: value } }))}
                                    inputMode='tel'
                                />
                            </View>

                            <View className="gap-2">
                                <Text className="text-black text-sm">Password</Text>
                                <TextInput
                                    className="w-full py-2 px-2 rounded-lg border border-gray-300 text-sm"
                                    placeholder="Enter your password"
                                    secureTextEntry={true}
                                    value={user.password}
                                    onChangeText={value => this.setState(prevState => ({ ...prevState, user: { ...prevState.user, password: value } }))}
                                />
                            </View>
                            <Link className="text-xs text-right text-gray-500" href='forgetPassword'>Forget Password?</Link>
                        </View>

                        <Button
                            className="bg-[#045883] w-full"
                            onPress={this.handleLoginIn}
                        >
                            <Text className="text-white font-bold">Login</Text>
                        </Button>

                    </View>

                    <View className="gap-0.5">
                        <View className="flex-row items-center justify-center my-5">
                            <View className="flex-1 h-px bg-gray-500"></View>
                            <Text className="px-3 text-xs text-gray-500 font-semibold">OR</Text>
                            <View className="flex-1 h-px bg-gray-500"></View>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Button className="w-[40vw] border border-gray-300">
                                <GoogleLogo />
                            </Button>
                            <Button className="w-[40vw] border border-gray-300">
                                <FontAwesome name="facebook" size={24} color="#3C5A99" />
                            </Button>
                        </View>

                    </View>
                    <View className="mt-8 mb-4 flex-row justify-center items-center gap-2">
                        <Text className="text-sm text-center text-gray-500">Don't have an account?</Text>
                        <Link className='text-sm text-center text-[#045883] font-semibold' href='/signUp'>Sign Up</Link>
                    </View>

                </View>
            </CustomKeyboardView>
        );
    }
}

const SignInWrapper: React.FC = (props) => {
    const router = useRouter();
    const authContext = useAuthContext();
  
    return <SignIn {...props} router={router} authContext={authContext} />;
  }
  
  export default SignInWrapper
