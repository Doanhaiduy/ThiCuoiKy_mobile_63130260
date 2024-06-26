import { TextComponent } from '@components/index';
import { appColors } from '@constants/appColors';
import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
interface Props {
    visible: boolean;
    message?: string;
}

export default function LoadingModal(props: Props) {
    const { visible, message } = props;

    return (
        <Modal style={{ flex: 1 }} visible={visible} transparent statusBarTranslucent>
            <View
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
            >
                <ActivityIndicator color={appColors.white} size={32} />
                <TextComponent className='text-white'>{message}</TextComponent>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({});
