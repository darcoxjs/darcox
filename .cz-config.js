export const types = [
  { value: ':building_construction: build', name: '🏗️  build:    打包发布' },
  { value: ':construction_worker: ci', name: '👷 ci:       持续集成' },
  {
    value: ':package: chore',
    name: '📦️ chore:    开发工具变动(构建、脚手架工具等)',
  },
  { value: ':memo: docs', name: '📝 docs:     变更的只有文档' },
  { value: ':sparkles: feat', name: '✨ feat:     一个新的特性' },
  { value: ':bug: fix', name: '🐛 fix:      修复一个Bug' },
  { value: ':zap: perf', name: '⚡️ perf:     提升性能' },
  {
    value: ':recycle: refactor',
    name: '♻️  refactor: 代码重构，注意和特性、修复区分开',
  },
  { value: ':rewind: revert', name: '⏪️ revert:   代码回退' },
  { value: ':art: style', name: '🎨 style:    空格, 分号等格式修复' },
  { value: ':white_check_mark: test', name: '✅ test:     添加一个测试' },
  { value: ':construction: wip', name: '🚧 wip:      正在进行中的工作' },
];

export const scopes = [{ name: 'global' }, { name: 'core' }];

export const messages = {
  type: '选择一种你的提交类型:',
  customScope: '请输入修改范围(可选):',
  subject: '短说明:',
  body: '长说明，使用"|"换行(可选):',
  breaking: '破坏性改动(可选):\n',
  footer: '关联关闭的issue,例如:#31, #34(可选):',
  confirmCommit: '确定提交说明?',
};

export const emoji = true;
export const allowCustomScopes = true;
export const allowBreakingChanges = ['特性', '修复'];
export const subjectLimit = 100;
