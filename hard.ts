/* 
Camelize
Если тип Obj не объект, то вернем never. Это нужно, чтобы удобно
использовать Camelize для элементов массива, тип которых не являются объектами.
Если бы не случай с массивом, можно было бы проверять на object через <Obj extends object>
Если Obj - объект, то есть 2 варианта:
    1) Obj - массив. Есть 2 случая:
        1.1 Массив не пустой. Тогда берем каждый его элемент и применяем к нему camelCase.
        Например для такого случая: [a: {some_string: string}]. 
        1.2 Масив пустой. Тогда ничего не делаем
    
    2) Obj - не массив. Тогда просто обходим его свойства и меняем ключ на camelCase
    через вспомогательный тип CamelizeString.
    Здесь снова есть 2 варианта: 
        2.1. Если значение свойства примитив либо функция, то ничего не меняем.
        2.2. Если значение свойства это объект, то нужно обойти его также как и исходный 
        тип Obj. Поэтому снова оборачиваем тип (значение свойства) в Camelize 
        (делаем "обход в глубину") 
*/

export type Camelize<Obj> = Obj extends object
  ? Obj extends Array<any>
    ? Obj extends [infer FirstElem, ...infer RestElems]
      ? [Camelize<FirstElem>, ...Camelize<RestElems>]
      : []
    : {
        [Key in keyof Obj as CamelizeString<Key>]: Obj[Key] extends object
          ? Camelize<Obj[Key]>
          : Obj[Key];
      }
  : never;

/*
CamelizeString - вспомогательный тип, который преобразует строку в camelCase.
Важно, что первое слово в camelCase начинается с нижнего регистра, но все
остальные слова начинаются с верхнего регистра (Например: someObjectString).
Чтобы корректно это реализовать и не писать слишком много условий, заведем 
еще 1 вспомогательный тип CapitalizeCamelizeString
*/

type CamelizeString<Str> = Str extends `${infer FirstWord}_${infer RestWords}`
  ? `${FirstWord}${CapitalizeCamelizeString<RestWords>}`
  : Str;

/*
CapitalizeCamelizeString - вспомогательный тип, который преобразует строку в camelCase, 
где у первого слова верхний регистр (Например: SomeObjectString). В остальном делает то же 
самое, что и CamelizeString
*/

type CapitalizeCamelizeString<Str extends string> =
  Str extends `${infer FirstWord}_${infer RestWords}`
    ? `${Capitalize<FirstWord>}${CapitalizeCamelizeString<RestWords>}`
    : Capitalize<Str>;

export type DeepPick<T, Paths> = unknown;
