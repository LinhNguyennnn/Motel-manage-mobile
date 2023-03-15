module.exports = {
  content: ['./**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({addUtilities}) {
      const utilities = {
        shadow: {
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          shadowOffset: '0px 2px',
        },
      };

      addUtilities(utilities);
    },
  ],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
};
