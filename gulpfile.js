const { src, dest } = require('gulp');
var mainNpmFiles = require('gulp-main-npm-files');
const through2 = require('through2');
const rollup = require('rollup');
var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');


function libs() {
    return src(mainNpmFiles())
        .pipe(through2.obj(async function(file, _, _cb) {
            const nodeModulesIndex = file.path.split('/').indexOf('node_modules');
            const packageName = file.path.split('/').splice(nodeModulesIndex + 1, 1);


            const _file = await rollup.rollup({
                input: file.history[0],
                plugins: [
                    resolve({
                        jsnext: true,
                        main: true,
                    }),
                    commonjs(),
                    replace({
                        'process.env.NODE_ENV': JSON.stringify('production')
                    })
                ]
            }).then(bundle => bundle.write({
                file: 'file.js',
                format: 'es',
            }));

            file.contents = new Buffer.from(_file.output[0].code);
            file.stem = packageName;

            _cb(null, file);
        }))
        .pipe(dest('public'));
}

function defaultTask(cb) {
    // place code for your default task here
    return libs();
}

  exports.default = defaultTask;