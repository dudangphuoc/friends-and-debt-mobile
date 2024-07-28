import { StyleSheet } from 'react-native';
export const mainColor = '#408DF0';
export const subColor = '#2060B0';
export const accentColor = '#7FD09C';
export const backgroundColor = '#4AA6DB';
export const borderColor = '#444746';
export const borderColorOffBlack = '#292D32';
export const textColor = '#4f4f4f';
export const textColorLight = '#f4f4f4';
export const borderRadius = 0;


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
        
    },
    neonBorder: {
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 10,
        shadowColor: 'blue', // Màu neon
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
      },
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
        borderStyle: 'solid',
        borderCurve: 'circular',
    },

    rightActions: {
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        backgroundColor: backgroundColor,
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



export const typographyStyle = StyleSheet.create({
    small_Bold: {
        fontSize: 11,
        lineHeight: 13,
        fontWeight: 'bold',
        letterSpacing: 0.06,
    },
    small_Medium: {
        fontSize: 11,
        lineHeight: 13,
        fontWeight: 'medium',
        letterSpacing: 0.06,
    },
    small_Regular: {
        fontSize: 11,
        lineHeight: 13,
        fontWeight: 'regular',
        letterSpacing: 0.07,
    },

    caption_regular: {
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 16,
        
    },
    caption_bold: {
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 16,
    },

    subheadline_Regular: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: 'regular',
        letterSpacing: -0.24,
    },
    subheadline_Bold: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: -0.5,
    },

});