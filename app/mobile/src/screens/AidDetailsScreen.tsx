import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AidDetails'>;

export const AidDetailsScreen: React.FC<Props> = ({ route }) => {
    const { aidId } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aid Details</Text>
            <Text style={styles.subtitle}>ID: {aidId}</Text>
            <Text style={styles.subtitle}>Coming Soon in a future wave</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A',
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        marginTop: 8,
    },
});
