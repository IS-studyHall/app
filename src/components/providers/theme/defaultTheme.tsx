const colors: Colors = {
  background: {
    main: '#FFFFFF',
  },
  primary: {
    main: 'orange',
  },
  success: {},
  info: {},
  warning: {},
  danger: {},
  base: {
    white: '#FFFFFF',
    black: '#000000',
  },
  text: {
    main: '#314D46',
  },
  iconDefaultColor: '#314D46',
  divider: '#D9D9D9',
};

const typography: Typography = {
  h1: {
    size: 32,
    weight: '700',
    color: colors.text.main,
    family: 'Poppins',
    italic: false,
  },
  h2: {
    size: 24,
    weight: '700',
    color: colors.text.main,
    family: 'Poppins',
    italic: false,
  },
  h3: {
    size: 18,
    weight: '700',
    color: colors.text.main,
    family: 'Poppins',
    italic: false,
  },
  h4: {
    size: 16,
    weight: '700',
    color: colors.text.main,
    family: 'Poppins',
    italic: false,
  },
  h5: {
    size: 14,
    weight: '700',
    color: colors.text.main,
    family: 'Poppins',
    italic: false,
  },
  p1: {
    size: 16,
    weight: '400',
    color: colors.text.main,
    family: 'Poppins',
    italic: false,
  },
  p2: {
    size: 14,
    weight: '400',
    color: colors.text.main,
    family: 'Poppins',
    italic: false,
  },
};

const sizes: Sizes = {
  spacings: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 28,
    xxl: 32,
  },
  borderRadius: {
    extraBig: 30,
    big: 16,
    normal: 10,
    small: 8,
    extraSmall: 5,
  },
  bottomBar: 50,
};

const theme: Theme = {
  colors,
  typography,
  sizes,
};

export default theme;
