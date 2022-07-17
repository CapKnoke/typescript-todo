 export const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    background: {
      default: '#E4E4E4',
    },
    ...(mode === 'dark' && {
      background: {
        default: '#434343',
      },
    })
  },
});
