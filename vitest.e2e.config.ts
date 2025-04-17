import { mergeConfig } from 'vitest/config';
import config from './vitest.config';

export default mergeConfig(config, {
  test: {
    name: 'e2e',
    include: ['packages/**/__test__/e2e/*.spec.ts'],
  },
});
