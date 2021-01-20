import { createMuiTheme } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "rgb(0, 48, 101)",
      secondary: "rgb(0, 48, 82)",
      disabled: "rgb(0, 48, 90)",
      hint: "rgb(0, 48, 120)"
    },
    primary: {
      main: '#FFFFFF',
      light: '#FAFAFA',
      contrastText: '#222'
    },
    secondary: {
      main: '#222',
      dark: '#6f0000'
    },
    common: {
      white: '#FAFAFA',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
}, ptBR);

export default theme;