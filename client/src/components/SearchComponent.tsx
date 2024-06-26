import useDebounce from '@/hooks/useDebounce';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';
import SectionComponent from './SectionComponent';

interface Props {
    handleChooseLocation: (val: string) => void;
    getCurrent: () => void;
}

export default function SearchComponent(props: Props) {
    const { handleChooseLocation, getCurrent } = props;
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [value, setValue] = useState('' as string);
    const debounceValue = useDebounce(value, 500);

    const { t } = useTranslation();

    const handleSearchLocation = async () => {
        try {
            const apiKey = 'zQooxv0iylfvwq46LeAidvzavSl9RIuhgBkvBF9-0JY';
            const api = `https://revgeocode.search.hereapi.com/v1/autocomplete?q=${debounceValue}&lang=vi-VN&apiKey=${apiKey}&limit=10`;
            const res = await axios(api);
            if (res && res.status === 200) {
                setRecentSearches(res.data.items);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(debounceValue);
        if (debounceValue === '') {
            setRecentSearches([]);
        } else {
            handleSearchLocation();
        }

        console.log(1234);
    }, [debounceValue]);
    return (
        <View className=''>
            <SectionComponent className='pt-0'>
                <ButtonComponent
                    type='success'
                    size='small'
                    title={t('map.getCurrentLocation')}
                    onPress={getCurrent}
                    icon={<Ionicons name='location' size={24} color='#fff' />}
                    iconFlex='right'
                />
            </SectionComponent>
            <InputComponent
                value={value}
                onChange={(val) => setValue(val)}
                placeholder={t('map.searchLocationPlaceholder')}
                multiline
                // height={70}
                label={t('map.locationLabel')}
                iconRight={
                    <Pressable onPress={handleSearchLocation}>
                        <Ionicons name='search' size={24} color='#000' />
                    </Pressable>
                }
            />

            <View
                className=' bg-white'
                style={{
                    zIndex: 1000,
                }}
            >
                {recentSearches.length > 0 &&
                    recentSearches.map((item: any, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                handleChooseLocation(item.address.label);
                                setValue('');
                                setRecentSearches([]);
                            }}
                            className='px-2 py-4 text-lg border-b border-gray-200'
                        >
                            <Text>{item.address.label}</Text>
                        </TouchableOpacity>
                    ))}
                {recentSearches.length === 0 && debounceValue && (
                    <View className='px-2 py-4 text-lg border-b border-gray-200'>
                        <Text>{t('map.noResultFound')}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
