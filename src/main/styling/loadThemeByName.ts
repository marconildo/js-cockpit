import { createTheme, loadTheme } from 'office-ui-fabric-react/lib/Styling'

type ThemeName = 'blue' | 'orange'

const themes: any = {
  blue: {
    palette: {
      themePrimary: '#0078d4',
      themeLighterAlt: '#eff6fc',
      themeLighter: '#deecf9',
      themeLight: '#c7e0f4',
      themeTertiary: '#71afe5',
      themeSecondary: '#2b88d8',
      themeDarkAlt: '#106ebe',
      themeDark: '#005a9e',
      themeDarker: '#004578',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#c2c2c2',
      neutralSecondary: '#858585',
      neutralPrimaryAlt: '#4b4b4b',
      neutralPrimary: '#333333',
      neutralDark: '#272727',
      black: '#1d1d1d',
      white: '#ffffff',
    },

  "fonts": {
    "tiny": {
      "fontFamily": "Arial, Helvetica, sans-serif",
      "MozOsxFontSmoothing": "grayscale",
      "WebkitFontSmoothing": "antialiased",
      "fontSize": "10px",
      "fontWeight": 600
    },
    "xSmall": {
      "fontFamily": "Arial, Helvetica, sans-serif",
      "MozOsxFontSmoothing": "grayscale",
      "WebkitFontSmoothing": "antialiased",
      "fontSize": "11px",
      "fontWeight": 400
    },
    "small": {
      "fontFamily": "Arial, Helvetica, sans-serif",
      "MozOsxFontSmoothing": "grayscale",
      "WebkitFontSmoothing": "antialiased",
      "fontSize": "12px",
      "fontWeight": 400
    },
    "smallPlus": {
      "fontFamily": "Arial, Helvetica, sans-serif",
      "MozOsxFontSmoothing": "grayscale",
      "WebkitFontSmoothing": "antialiased",
      "fontSize": "13px",
      "fontWeight": 400
    },
    "medium": {
      "fontFamily": "Arial, Helvetica, sans-serif",
      "MozOsxFontSmoothing": "grayscale",
      "WebkitFontSmoothing": "antialiased",
      "fontSize": "14px",
      "fontWeight": 400
    },
    "mediumPlus": {
      "fontFamily": "Arial, Helvetica, sans-serif",
      "MozOsxFontSmoothing": "grayscale",
      "WebkitFontSmoothing": "antialiased",
      "fontSize": "15px",
      "fontWeight": 400
    },
    "large": {
      "fontFamily": "Arial, Helvetica, sans-serif",
      "MozOsxFontSmoothing": "grayscale",
      "WebkitFontSmoothing": "antialiased",
      "fontSize": "17px",
      "fontWeight": 300
    },
    "xLarge": {
      "fontFamily": "Arial, Helvetica, sans-serif",
      "MozOsxFontSmoothing": "grayscale",
      "WebkitFontSmoothing": "antialiased",
      "fontSize": "21px",
      "fontWeight": 100
    },
    "xxLarge": {
      "fontFamily": "Arial, Helvetica, sans-serif",
      "MozOsxFontSmoothing": "grayscale",
      "WebkitFontSmoothing": "antialiased",
      "fontSize": "28px",
      "fontWeight": 100
    },
    "superLarge": {
      "fontFamily": "Arial, Helvetica, sans-serif",
      "MozOsxFontSmoothing": "grayscale",
      "WebkitFontSmoothing": "antialiased",
      "fontSize": "42px",
      "fontWeight": 100
    },
    "mega": {
      "fontFamily": "Arial, Helvetica, sans-serif",
      "MozOsxFontSmoothing": "grayscale",
      "WebkitFontSmoothing": "antialiased",
      "fontSize": "72px",
      "fontWeight": 100
    }
}
  },

  orange: {
    palette: {
      themePrimary: '#d75d30',
      themeLighterAlt: '#fdf8f5',
      themeLighter: '#f8e2d9',
      themeLight: '#f3c9ba',
      themeTertiary: '#e7977b',
      themeSecondary: '#db6d45',
      themeDarkAlt: '#c1532a',
      themeDark: '#a34624',
      themeDarker: '#78331a',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#c2c2c2',
      neutralSecondary: '#858585',
      neutralPrimaryAlt: '#4b4b4b',
      neutralPrimary: '#333333',
      neutralDark: '#272727',
      black: '#1d1d1d',
      white: '#ffffff',
    }
  }
}

const fontSizes = [
  'tiny', 'xSmall', 'small', 'smallPlus', 'medium', 'mediumPlus', 'large',
  'xLarge', 'xxLarge', 'superLarge', 'mega'
]

Object.keys(themes).forEach(themeName => {
  let fonts = themes[themeName].fonts

  if (!fonts) {
    fonts = themes[themeName].fonts = {}
  }

  fontSizes.forEach(fontSize => {
    if (!fonts[fontSize]) {
      fonts[fontSize] = {}
    }

    fonts[fontSize].fontFamily = "'Open Sans', Roboto, Arial, Helvetia, sans-serif"
  })

  themes[themeName] = createTheme(themes[themeName])
})

function loadThemeByName(name: ThemeName) {
  loadTheme(themes[name])
}

// --- exports ------------------------------------------------------

export default loadThemeByName
