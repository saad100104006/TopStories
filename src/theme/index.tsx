import { extendTheme, theme } from 'native-base';

const myTheme = extendTheme({
  colors: {
    primary: { ...theme.colors.blueGray },
  },
  components: {
    Text: {
      defaultProps: {
        allowFontScaling: false,
      },
    },
    Input: {
      defaultProps: {
        allowFontScaling: false,
      },
    },
  },
});

export default myTheme;
