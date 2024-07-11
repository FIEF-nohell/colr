export default {
    output: 'export',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/colr/' : '',
    images: {
        unoptimized: true,
    },
};
