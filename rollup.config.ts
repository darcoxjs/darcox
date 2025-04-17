import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import rm from 'rollup-plugin-rm';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const packagesDir = process.env.PACKAGES_DIR || 'packages';
const target = process.env.TARGET;

if (!target) {
  throw new Error('TARGET is required');
}

const resolvePackagesDir = (pkg: string) =>
  path.resolve(__dirname, packagesDir, pkg);
const targetDir = resolvePackagesDir(target);
const pkg = require(path.resolve(targetDir, 'package.json'));
const targetPkg = require(path.resolve(targetDir, 'package.json'));

export default defineConfig([{
  input: path.resolve(targetDir, 'src/index.ts'),
  output: [
    {
      format: 'cjs',
      file: path.resolve(targetDir, 'dist/index.cjs'),
    },
    {
      format: 'esm',
      file: path.resolve(targetDir, 'dist/index.mjs'),
    },
  ],
  plugins: [
    rm(path.resolve(targetDir, 'dist'), 'buildStart'),
    resolve(),
    commonjs(),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.build.json'),
      compilerOptions: {
        rootDir: path.resolve(targetDir, 'src'),
        declarationDir: path.resolve(targetDir, 'dist', 'types'),
      },
      outputToFilesystem: false,
    }),
  ],
  external: [
    ...Object.keys(targetPkg.dependencies || {}),
    ...Object.keys(targetPkg.devDependencies || {}),
    ...Object.keys(targetPkg.peerDependencies || {}),
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
}, {
  input: path.resolve(targetDir, 'dist', 'types', 'index.d.ts'),
  output: [{
    file: path.resolve(targetDir, 'dist', 'index.d.ts'),
    format: 'esm',
  }],
  plugins: [
    dts(),
    rm(path.resolve(targetDir, 'dist', 'types'), 'buildEnd'),
  ],
}]);
