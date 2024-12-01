import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss';
import tplCompiler from 'vue-template-compiler';
import replace from '@rollup/plugin-replace';

const isProduction = !process.env.ROLLUP_WATCH;

console.log('# Rollup.js environment:');
console.log(' - PROD:', isProduction);

function getPath(_path) {
    return path.resolve(__dirname, _path);
}

export default {
    input: getPath(`source/index.ts`),
    output: {
        extend: true,
        name: 'tsRollupVue',
        file: getPath('web/app.iife.js'),
        format: 'iife'
    },
    plugins: [
        scss({
            output: getPath('web/style.css'),
        }),
        typescript({
            verbosity: 1,
            clean: true,
            tsconfig: getPath('tsconfig.json'),
            tsconfigOverride: {
                compilerOptions: {
                    target: 'ES5',
                    module: 'ES6',
                },
            },
        }),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        nodeResolve(),
        commonjs(),
        vue({
            css: true,
            template: {
                compiler: tplCompiler,
                compilerOptions: {
                    whitespace: 'condense',
                    isProduction: true,
                },
            },
        }),
        isProduction &&
        terser({
            output: {
                comments: false,
                beautify: false,
                webkit: true,
            },
            mangle: {
                properties: {
                    regex: /^\_.+\$\d$/,
                },
            },
            ecma: 5,
            ie8: true,
            safari10: true,
            warnings: true,
        }),
    ],
};

