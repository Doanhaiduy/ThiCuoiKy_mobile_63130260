import authenticationAPI from '@apis/authApi';
import {
    ButtonComponent,
    ContainerComponent,
    InputComponent,
    SectionComponent,
    SpaceComponent,
    TextComponent,
} from '@components/index';
import { Regex } from '@helpers/index';
import LoadingModal from '@modals/LoadingModal';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet } from 'react-native';

export default function ForgotScreen() {
    const [email, setEmail] = React.useState('haiduytbt2k3@gmail.com');
    const [isError, setIsError] = React.useState(false);
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const { t } = useTranslation();

    const handleCheckEmail = (email: string) => {
        if (!Regex.email.test(email)) {
            setIsError(true);
            return;
        }
        setIsError(false);
    };

    const HandleSubmit = async () => {
        setIsLoading(true);
        try {
            const res = await authenticationAPI.HandleAuthentication('/forgotPassword', { email }, 'post');
            setIsLoading(false);
            router.push({
                pathname: '/verification',
                params: {
                    email,
                    code: res.data.code,
                    type: 'forgot',
                },
            });
        } catch (err: any) {
            setIsLoading(false);
            setError(err);
        }
    };

    const router = useRouter();

    return (
        <ContainerComponent isAuth isScroll back>
            <SectionComponent>
                <TextComponent className='text-[28px] font-inter700 mb-2'>{t('forgot.enterEmailTitle')}</TextComponent>
                <TextComponent className=' text-grayText text-base'>
                    {t('forgot.enterEmailToReceiveCode')}
                </TextComponent>
            </SectionComponent>
            <SectionComponent className='w-[100%] h-[250px]'>
                <Image source={require('@assets/images/forgot.png')} className='w-full h-full' />
            </SectionComponent>
            <SpaceComponent height={20} />
            <SectionComponent>
                <InputComponent
                    value={email}
                    onChange={(val) => setEmail(val)}
                    placeholder='example@mail.com'
                    label={t('forgot.emailAddress')}
                    onEnd={() => handleCheckEmail(email)}
                    err={`${isError ? t('forgot.invalidEmailAddress') : ''}`}
                />
            </SectionComponent>
            {error && <TextComponent className='text-error text-center'>{error}</TextComponent>}
            <SectionComponent>
                <ButtonComponent
                    title={t('forgot.continue')}
                    onPress={HandleSubmit}
                    size='large'
                    type='primary'
                    disabled={isError}
                />
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </ContainerComponent>
    );
}

const styles = StyleSheet.create({});
