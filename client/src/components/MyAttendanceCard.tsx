import eventAPI from '@apis/eventApi';
import { appColors } from '@constants/appColors';
import { Ionicons } from '@expo/vector-icons';
import getDateFnsLocale from '@utils/dateFns';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextComponent from './TextComponent';

interface Data {
    _id: string;
    attendanceTime: string;
    eventId: string;
    status: string;
}

export default function MyAttendanceCard(props: { data: Data }) {
    const { data } = props;
    const [event, setEvent] = useState<any>({});
    const locale = getDateFnsLocale();

    useEffect(() => {
        (async () => {
            try {
                const res = await eventAPI.HandleEvent(`/${data.eventId}`);
                setEvent(res.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    return (
        <TouchableOpacity className=' bg-white p-4 rounded-[14px] flex-1 mx-2 flex-row justify-between items-center'>
            <View className='flex-row items-center max-w-[70%]'>
                <View className='p-1 bg-primary-500/10 mr-2 rounded-[6px]'>
                    <Ionicons name='checkmark-done' size={24} color={appColors.primary} />
                </View>
                <View className='ml-2 '>
                    <TextComponent className='font-inter700 text-base ' numberOfLines={2}>
                        {event.eventName}
                    </TextComponent>
                    <TextComponent className='text-sm text-grayText'>
                        {format(new Date(data.attendanceTime), 'MMM dd, yyyy', {
                            locale,
                        })}
                    </TextComponent>
                </View>
            </View>
            <View>
                <TextComponent className='font-inter700 text-base'>
                    {format(new Date(data.attendanceTime), 'hh:mm a', {
                        locale,
                    })}
                </TextComponent>
                <TextComponent className='text-sm text-grayText text-right'>{data.status}</TextComponent>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({});
