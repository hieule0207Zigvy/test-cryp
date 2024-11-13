import { theme, ThemeConfig } from 'antd'

export const themeColors = {
  primary: '#03aac7',
  secondary: '#26c99b',
  text: '#f4f5f7',
  background: '#151517',
  danger: '#f1493f',
  warn: '#FF9142',
  transparent: 'transparent',
  backgroundSecondary: '#38393d',
  border: '#27282B'
} as const

export const globalTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: { colorPrimary: themeColors.primary },
  components: {
    Button: {
      algorithm: true,
      colorPrimaryBgHover: '#4EBA9C',

      colorError: themeColors.danger,

      defaultColor: themeColors.text,
      defaultHoverColor: themeColors.text,
      defaultActiveColor: themeColors.text,

      defaultBg: 'transparent',
      defaultBorderColor: themeColors.backgroundSecondary,
      defaultActiveBg: '#3f3f41',
      defaultActiveBorderColor: '#3f3f41',
      defaultHoverBg: themeColors.backgroundSecondary,
      defaultHoverBorderColor: themeColors.backgroundSecondary,

      controlHeight: 40,
      controlHeightSM: 32
    },
    Input: {
      algorithm: true,
      colorBgContainer: themeColors.background,
      hoverBorderColor: themeColors.border,
      colorBorder: themeColors.border,
      borderRadius: 9999,

      controlHeight: 40,
      controlHeightLG: 48,

      paddingInline: 16
    },
    DatePicker: {
      algorithm: true,
      borderRadius: 9999,
      paddingInline: 16,
      colorPrimary: themeColors.text,
      hoverBorderColor: '#424242',
      colorTextLightSolid: '#000000'
    },
    Segmented: {
      algorithm: true,
      borderRadius: 9999,
      colorBgBase: '#252629',
      borderRadiusLG: 9999,
      paddingContentHorizontalLG: 20,
      fontSizeLG: 14
    }
  }
}
