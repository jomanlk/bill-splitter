const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#c24914',
                            '@link-color': '#682c0e',
                            '@success-color': '#52c41a', // success state color
                            '@warning-color': '#faad14', // warning state color
                            '@error-color': '#f5222d', // error state color
                            '@heading-color': 'rgba(104, 44, 14, 0.85)', // heading text color
                            '@text-color': 'rgba(104, 44, 14, 0.65)', // major text color
                            '@text-color-secondary': 'rgba(104, 44, 14, 0.45)', // secondary text color
                            '@disabled-color': 'rgba(104, 44, 14, 0.25)', // disable state color
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
