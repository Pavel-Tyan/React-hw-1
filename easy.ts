export type MyPick<Src, Picked extends keyof Src> = {
  // Возьмем значения свойств из Src по ключам свойств из Picked
  [Key in Picked]: Src[Key];
};

export type NOfArray<ArrayObj, N> = unknown;

export type Unshift<ArrayType, Element> = unknown;

export type MyExclude<T, U> = unknown;
