import 'reflect-metadata';

export type RolldownOptions = {
  input: string;
  output?: {
    file?: string;
    format?: 'esm' | 'cjs';
    sourcemap?: boolean;
  };
};

function A(): ClassDecorator {
  return (target) => {
    console.info(Reflect.getMetadataKeys(target));
  };
}

@A()
export class AAA {
  constructor(private readonly a: string, private readonly b: string) {}
}

export const rolldown = {
  a: 10,
};
