import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ContainerComponent from '@/src/components/ContainerComponent';
import SectionComponent from '@/src/components/SectionComponent';
import TextComponent from '@/src/components/TextComponent';
import { OtpInput } from 'react-native-otp-entry';
import { appColors } from '@/src/constants/appColors';
import SpaceComponent from '@/src/components/SpaceComponent';
import ButtonComponent from '@/src/components/ButtonComponent';
export default function VerificationScreen() {
    const [otp, setOtp] = React.useState('');

    return (
        <ContainerComponent isAuth isScroll back>
            <SectionComponent>
                <TextComponent className='text-[28px] font-inter700 mb-2'>Enter Verification Code</TextComponent>
                <TextComponent className=' text-grayText text-base'>
                    We have sent the code verification to your email address
                </TextComponent>
            </SectionComponent>
            <SectionComponent className='w-[100%] h-[250px]'>
                <Image source={require('../../assets/images/verification.png')} className='w-full h-full' />
            </SectionComponent>
            <SpaceComponent height={20} />
            <SectionComponent>
                <OtpInput
                    numberOfDigits={4}
                    autoFocus
                    focusColor={appColors.primary}
                    onTextChange={(text) => setOtp(text)}
                    theme={{
                        pinCodeContainerStyle: {
                            width: 70,
                            height: 70,
                            backgroundColor: appColors.white,
                            borderColor: appColors.primary,
                        },
                    }}
                />
                <View className='flex-row items-end self-end mt-4'>
                    <TextComponent className='mr-1'>Didn't receive the code?</TextComponent>
                    <Pressable className='' onPress={() => {}}>
                        <TextComponent className='text-primary-500'>Resend</TextComponent>
                    </Pressable>
                </View>
            </SectionComponent>
            <SpaceComponent height={80} />
            <SectionComponent>
                <ButtonComponent title='Verify' onPress={() => {}} size='large' type='primary' />
            </SectionComponent>
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
