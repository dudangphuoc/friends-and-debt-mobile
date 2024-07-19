import { Text, type TextProps, StyleSheet, Modal, Alert, ModalProps } from 'react-native';
import { useState } from 'react';

export type ThemedTextProps = ModalProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
    modalVisible:boolean;
};

export function ModelView({
    children,
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest
}: ThemedTextProps) {
    const [modalVisible, setModalVisible] = useState(false);
  
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }} {...rest}>
                {children}
        </Modal>
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
    },
});
