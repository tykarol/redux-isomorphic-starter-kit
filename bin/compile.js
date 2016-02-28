import webpack from 'webpack';
import config from '../webpack.config';

webpack(config, (err, stats) => {
    if (err) throw new Error(err);

    // eslint-disable-next-line no-console
    console.log(stats.toString({ colors: true }));
});
