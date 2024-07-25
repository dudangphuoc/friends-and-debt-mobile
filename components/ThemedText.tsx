import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { typographyStyle } from '@/constants/Styles';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 
  | 'Small_Regular'
  | 'Small_Medium'
  | 'Small_Bold'
  | 'Caption_Bold' 
  | 'Caption_Regular' 
  | 'Subheadline_Regular'
  | 'Subheadline_Bold'
  | 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  };

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'Small_Regular' ? typographyStyle.small_Regular : undefined,
        type === 'Small_Medium' ? typographyStyle.small_Medium : undefined,
        type === 'Small_Bold' ? typographyStyle.small_Bold : undefined,
        type === 'Caption_Bold' ? typographyStyle.caption_bold : undefined,
        type === 'Caption_Regular' ? typographyStyle.caption_regular : undefined,
        type === 'Subheadline_Regular' ? typographyStyle.subheadline_Regular : undefined,
        type === 'Subheadline_Bold' ? typographyStyle.subheadline_Bold : undefined,
        style,
      ]}
      {...rest}
    />
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
    // fontSize: 20,
    // fontWeight: 'bold',
  },

  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
