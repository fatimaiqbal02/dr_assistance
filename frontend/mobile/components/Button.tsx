import React, { Component } from 'react';
import { Pressable } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

class Button extends Component<ButtonProps> {
  render() {
    const { children, className, ...props } = this.props;
    return (
      <Pressable className={twMerge("justify-center items-center w-[330px] h-14 rounded-lg p-3", className)} {...props}>
        {children}
      </Pressable>
    );
  }
}

export default Button;