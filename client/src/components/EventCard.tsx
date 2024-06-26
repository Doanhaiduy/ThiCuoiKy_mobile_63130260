import { appColors } from '@constants/appColors';
import { MaterialIcons } from '@expo/vector-icons';
import { checkTimeStatus } from '@helpers/index';
import getDateFnsLocale from '@utils/dateFns';
import { format } from 'date-fns';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextComponent from './TextComponent';

interface Data {
    _id: string;
    eventCode: string;
    eventName: string;
    startAt: string;
    endAt: string;
}

export default function EventCard(props: { data: Data }) {
    const { data } = props;
    const locale = getDateFnsLocale();

    return (
        <TouchableOpacity
            className='h-[135px] bg-white p-4 rounded-[14px] flex-1 mx-2'
            onPress={() => {
                router.push({
                    pathname: `/attendance/${data.eventCode}`,
                    params: { eventId: data._id },
                });
            }}
        >
            <View className='flex-row items-center'>
                <View className='p-1 bg-primary-500/10 mr-2 rounded-[6px]'>
                    <MaterialIcons name='event' size={24} color={appColors.primary} />
                </View>
                <View>
                    <TextComponent className='text-base max-w-[90%] ' numberOfLines={1}>
                        {data.eventName}
                    </TextComponent>
                    <TextComponent className='text-base '>{data.eventCode}</TextComponent>
                </View>
            </View>
            <TextComponent className='font-inter700 text-xl my-2'>
                {format(new Date(data.startAt), 'hh:mm a', {
                    locale,
                })}
            </TextComponent>
            <TextComponent className=''>
                {checkTimeStatus(new Date(data.startAt ?? new Date()), new Date(data.endAt ?? new Date()))}
            </TextComponent>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({});
