import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '@utils/i18n';
import i18next from '@utils/i18n';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import Splash from '../components/Splash';
import store from '../redux/store';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
    initialRouteName: '(auth)',
};

export default function RootLayout() {
    const [appReady, setAppReady] = useState(false);

    const [loaded, error] = useFonts({
        Inter: require('../../assets/fonts/Inter-Regular.ttf'),
        Inter100: require('../../assets/fonts/Inter-Thin.ttf'),
        Inter500: require('../../assets/fonts/Inter-Medium.ttf'),
        Inter600: require('../../assets/fonts/Inter-SemiBold.ttf'),
        Inter700: require('../../assets/fonts/Inter-Bold.ttf'),
        Inter800: require('../../assets/fonts/Inter-ExtraBold.ttf'),
        Inter900: require('../../assets/fonts/Inter-Black.ttf'),
        ...FontAwesome.font,
    });

    useEffect(() => {
        const getLanguage = async () => {
            const lang = await AsyncStorage.getItem('language');
            if (lang) {
                i18next.changeLanguage(lang);
            }
        };

        getLanguage();
    }, []);

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
            setAppReady(true);
        }
    }, [loaded]);

    if (!appReady) {
        return <Splash />;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    return (
        <Provider store={store}>
            <GestureHandlerRootView className='flex-1'>
                <Host>
                    <Slot />
                </Host>
            </GestureHandlerRootView>
        </Provider>
    );
}
