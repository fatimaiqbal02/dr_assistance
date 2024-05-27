import React, { createContext, Component, ReactNode } from 'react';
import { Role } from '../constants/constants';

interface AuthContextType {
  userAuthentication: UserAuthState;
  login: (phone: string, password: string, role: Role, callback: (success: boolean, error: any, message?: string) => void) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string, role: Role, callback: (success: boolean, error: any) => void) => Promise<void>;
  logout: () => void;
}

interface UserAuthState {
  name: string;
  role: Role;
  isAuthenticated: boolean | undefined;
  token: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProviderState {
  userAuthentication: UserAuthState;
}

export class AuthProvider extends Component<AuthProviderProps, AuthProviderState> {
  constructor(props: AuthProviderProps) {
    super(props);
    this.state = {
      userAuthentication: {
        name: "",
        role: Role.PATIENT,
        isAuthenticated: undefined,
        token: null
      }
    };
  }

  login = async (phone: string, password: string, role: Role, callback: (success: boolean, error: any, message?: string) => void) => {
    try {
      const response = await fetch("http://10.0.2.2:8000/api/user/token/", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone,
          password,
        })
      });

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.hasOwnProperty("token")) {
        const userDetails = await fetch("http://10.0.2.2:8000/api/user/me", {
          method: "GET",
          headers: {
            "Authorization": `Token ${responseData['token']}`,
            "Content-Type": "application/json"
          }
        });
        const user = await userDetails.json();
        const isDoctor = user["is_doctor"];

        const userResponse = role === Role.DOCTOR;
        if (userResponse === isDoctor) {
          this.setState({
            userAuthentication: {
              ...this.state.userAuthentication,
              isAuthenticated: true,
              role: role,
              name: user['name'],
              token: responseData['token']
            }
          });
        } else {
          callback(false, null, "please select switch the current tab user");
        }

        callback(true, null, "");
      } else {
        callback(false, null, "You are not registered either check your phoneNo or password.");
      }
    } catch (err) {
      console.log("Error faced at register:", err);
      callback(false, err, "An error occurred while signing. Please try again later.");
    }
  };

  register = async (name: string, email: string, phone: string, password: string, role: Role, callback: (success: boolean, error: any) => void) => {
    console.log("register called");
    try {
      const response = await fetch("http://10.0.2.2:8000/api/user/create/", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone,
          email,
          password,
          name,
          "is_doctor": role === Role.DOCTOR
        })
      });
      const responseData = await response.json();
      console.log(responseData);
      if (Object.keys(responseData).length > 2) {
        this.setState({
          userAuthentication: {
            ...this.state.userAuthentication,
            isAuthenticated: true,
            role: role,
            name: name
          }
        });
        this.login(phone, password, role, callback)
        callback(true, null);
      } else {
        callback(false, null);
      }
    } catch (err) {
      console.log("Error faced at register:", err);
      callback(false, err);
    }
  };

  logout = async () => {
    this.setState({
      userAuthentication: {
        ...this.state.userAuthentication,
        isAuthenticated: false,
        token: null
      }
    });
  };

  render() {
    const { children } = this.props;
    const { userAuthentication } = this.state;
    return (
      <AuthContext.Provider value={{ userAuthentication, login: this.login, register: this.register, logout: this.logout }}>
        {children}
      </AuthContext.Provider>
    );
  }
}

export const useAuthContext = () => {
  const value = React.useContext(AuthContext);

  if (!value) {
    throw new Error("This component is not under Context Provider");
  }

  return value;
};