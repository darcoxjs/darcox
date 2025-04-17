import { watch } from 'chokidar';
import _ from 'lodash';
import { ChildProcess } from 'node:child_process';
import { spawn } from 'node:child_process';
import kill from 'tree-kill';

let _process: ChildProcess | null = null;
let isKill = false;

const watcher = watch(['./packages', './playground'], {
  ignored: (path) => {
    // 忽略node_modules、dist、tmp目录和测试文件
    return (
      path.includes('node_modules') ||
      path.includes('dist') ||
      path.includes('tmp') ||
      path.includes('.spec.ts') ||
      path.includes('__test__') ||
      path.includes('.vite') ||
      path.includes('.nx') ||
      path.includes('README.md') ||
      path.includes('LICENSE')
    );
  },
});

watcher.on(
  'all',
  _.debounce(() => {
    process.stdout.write('\x1Bc');

    if (_process && _process.pid) {
      isKill = true;
      kill(_process.pid);
    }

    _process = spawn('pnpm', ['exec', 'nx', 'run', 'playground:start'], {
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    _process.on('exit', () => {
      if (!isKill) process.exit(0);
      isKill = false;
    });
  }, 100),
);
