// adapted from https://github.com/boblauer/MockDate

const RealDate = Date;
let now: null | number = null;

const MockDate = class Date extends RealDate {
  constructor();
  constructor(value: any);
  constructor(
    year: number,
    month: number,
    date?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number,
  );

  constructor(
    y?: number,
    m?: number,
    d?: number,
    h?: number,
    M?: number,
    s?: number,
    ms?: number,
  ) {
    super();

    let date;

    switch (arguments.length) {
      case 0:
        if (now !== null) {
          date = new RealDate(now.valueOf());
        } else {
          date = new RealDate();
        }
        break;

      case 1:
        // @ts-ignore
        date = new RealDate(y);
        break;

      default:
        d = typeof d === "undefined" ? 1 : d;
        h = h || 0;
        M = M || 0;
        s = s || 0;
        ms = ms || 0;
        // @ts-ignore
        date = new RealDate(y, m, d, h, M, s, ms);
        break;
    }

    return date;
  }

  static [Symbol.hasInstance](instance: unknown): boolean {
    return instance instanceof RealDate;
  }
};

MockDate.UTC = RealDate.UTC;

MockDate.now = function () {
  return new MockDate().valueOf();
};

MockDate.parse = function (dateString) {
  return RealDate.parse(dateString);
};

MockDate.toString = function () {
  return RealDate.toString();
};

export function set(date: string): void {
  const dateObj = new Date(date.valueOf());
  if (isNaN(dateObj.getTime())) {
    throw new TypeError("mockdate: The time set is an invalid date: " + date);
  }

  // @ts-ignore
  Date = MockDate;

  now = dateObj.valueOf();
}

export function reset(): void {
  Date = RealDate;
}

export default {
  set,
  reset,
};
