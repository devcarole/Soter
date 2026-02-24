import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AidOverviewScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aid Overview</Text>
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
