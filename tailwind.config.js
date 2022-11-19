module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            primary: 'Poppins, sans-serif',
            serif: 'Roboto, sans-serif',

        },
        container: {
            padding: {
                DEFAULT: '1.5rem',
                lg: '3rem',
            },
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
        extend: {
            colors: {
                primary: '#005991',
                accent: '#286F6C',
                grey: {
                    DEFAULT: '#919297',
                    1: '#D9D9D9',
                    2: '#E7E9EB',
                    3: '#F5F5F5',
                    4: '#E4E4E4',
                    5: '#B8B8B8',
                    6: '#929497',
                    7: '#E1E1E1',
                },
                white: {
                    DEFAULT: 'white',
                    1: '#FFFFFF',
                    2: '#FBF9FA',
                },
                pink: 'pink',
                blue: '#086788',
                bluet: '#005083',
                tosca: '#00CBA9',
                orange: '#FBA241',
                border: '#19618F',

            },
            backgroundImage: {

            },
            dropShadow: {
                primary: '0px 4px 10px rgba(15, 27, 51, 0.05);',
            },
        },
    },
    plugins: [],
}