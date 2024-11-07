import { theme, ThemeConfig } from 'antd'

export const themeColors = {
  primary: '#03aac7',
  secondary: '#26c99b',
  text: '#f4f5f7',
  background: '#151517',
  danger: '#f1493f',
  warn: '#FF9142',
  transparent: 'transparent'
}

export const globalTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: { colorPrimary: themeColors.primary },
  components: {
    Button: {
      colorPrimaryBgHover: '#4EBA9C',

      colorError: themeColors.danger,

      defaultColor: themeColors.text,
      defaultHoverColor: themeColors.text,
      defaultActiveColor: themeColors.text,

      defaultBg: 'transparent',
      defaultBorderColor: '#38393d',
      defaultActiveBg: '#3f3f41',
      defaultActiveBorderColor: '#3f3f41',
      defaultHoverBg: '#38393d',
      defaultHoverBorderColor: '#38393d',

      controlHeight: 40,
      controlHeightSM: 32
    },
    Input: {
      colorBgContainer: themeColors.background,
      hoverBorderColor: '#27282B',
      colorBorder: '#27282B',
      borderRadius: 9999,

      controlHeight: 40,
      controlHeightLG: 48,

      paddingInline: 16
    }
  }
}
