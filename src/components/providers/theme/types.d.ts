interface Theme {
  colors: Colors;
  typography: Typography;
  sizes: Sizes;
}

type AppTheme = 'light' | 'dark' | 'default';

interface Sizes {
  spacings: {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    extraBig: number;
    big: number;
    normal: number;
    small: number;
    extraSmall: number;
  };
  bottomBar: number;
}

interface Color {
  main?: string;
}
interface Colors {
  background: Color;
  primary: Color;
  success: Color;
  info: Color;
  warning: Color;
  danger: Color;
  base: {
    white: string;
    black: string;
  };
  text: Color;
  iconDefaultColor: string;
  divider: string;
}

interface Typography {
  h1: TypographyItem;
  h2: TypographyItem;
  h3: TypographyItem;
  h4: TypographyItem;
  h5: TypographyItem;
  p1: TypographyItem;
  p2: TypographyItem;
}

interface TypographyItem {
  size: number;
  weight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  color?: string;
  family: string;
  italic: boolean;
}
