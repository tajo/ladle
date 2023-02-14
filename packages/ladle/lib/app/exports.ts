export type Args<
  P = {
    [key: string]: any;
  },
> = Partial<P>;

export type ControlType =
  | "select"
  | "multi-select"
  | "radio"
  | "inline-radio"
  | "check"
  | "inline-check"
  | "range";

export interface ArgType<K = any> {
  control?: {
    options?: K[];
    type: ControlType;
    min?: number;
    max?: number;
    step?: number;
    [key: string]: any;
  };
  defaultValue?: K;
  description?: string;
  name?: string;
  action?: string;
  [key: string]: any;
}

export type ArgTypes<
  P = {
    [key: string]: any;
  },
> = {
  [key in keyof P]?: ArgType<P[key]>;
};

export type Meta = {
  [key: string]: any;
};
