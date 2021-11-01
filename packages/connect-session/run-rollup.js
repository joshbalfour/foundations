const babel = require('@rollup/plugin-babel')
const typescript = require('@rollup/plugin-typescript')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { terser } = require('rollup-plugin-terser')
const { rollup } = require('rollup')
const fs = require('fs')
const {promisify} = require('util');

const folders = ['browser', 'react', 'server']

const config = [
  {
    input: './src/{folder}/index.ts',
    output: {
      dir: './dist/cjs',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      resolve.default({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.cjs.json',
      }),
      babel.default({
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                chrome: '69',
              },
              useBuiltIns: 'usage',
              corejs: 3,
            },
          ],
        ],
        extensions: ['.ts', '.tsx'],
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      terser(),
    ],
  },
  {
    input: './src/{folder}/index.ts',
    output: {
      dir: './dist/esm',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      resolve.default({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.esm.json',
      }),
      babel.default({
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                chrome: '69',
              },
              useBuiltIns: 'usage',
              corejs: 3,
            },
          ],
        ],
        extensions: ['.ts', '.tsx'],
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      terser(),
    ],
  },
]

const rollupConfig = folders.reduce((rollupConfig, folderName) => {

  rollupConfig[folderName] = config.map((con) => ({
    ...con,
    input: con.input.replace('{folder}', folderName),
    output: {
      ...con.output,
      dir: con.output.dir.replace('{folder}', folderName),
    },
  }))

  return rollupConfig
}, {})

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

Object.keys(rollupConfig).forEach(async (folderName) => {

  if (!fs.existsSync(`dist/${folderName}`)) {
    fs.mkdirSync(`dist/${folderName}`)
  }

  const result = await Promise.all([
    rollup(rollupConfig[folderName][0]),
    rollup(rollupConfig[folderName][1]),
  ])

  await Promise.all([
    result[0].write(rollupConfig[folderName][0].output),
    result[1].write(rollupConfig[folderName][1].output),
  ])

  await Promise.all([
    promisify(fs.rename)('dist/cjs', `dist/${folderName}/cjs`),
    promisify(fs.rename)('dist/esm', `dist/${folderName}/esm`),
  ])

  await promisify(fs.rename)(`dist/${folderName}`, folderName)
})
