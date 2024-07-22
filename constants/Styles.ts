import { StyleSheet } from 'react-native';

export const lightStyle = StyleSheet.create({
    glassmorphism: {
        // borderRadius: 10,
        borderWidth: 1,
        borderColor: "rgba( 255, 255, 255, 0.2)",
        borderStyle: 'solid',
        shadowOffset: { width: 8, height: 32 },
        shadowOpacity: 0,
        shadowRadius: 0,
        textShadowColor: 'rgba( 31, 38, 135, 0.37 )',
        
    }
});

export const globalStyle = StyleSheet.create({
    background: {
        backgroundColor: '#313335',
        padding: 8,
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        height: 100,
    },

    boarder: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderCurve: 'circular',
        borderRadius: 5,
        borderColor: '#444746',
    },

    rightActions: {
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        backgroundColor: '#444746',
        paddingHorizontal: 16,
        width: 150,
    },

    item: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        height: "100%",
    },
    describe: {
        fontSize: 16,
    },

    inlineFotter: {
    },

    header: {
        height: 250,
        overflow: 'hidden',
    },

});