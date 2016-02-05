import webpack from 'webpack';
import config  from '../webpack.config';

webpack(config, function(err, stats) {
    if(err) throw new Error(err);

    console.log(stats.toString({ colors: true }));
})