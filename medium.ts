/*
DeepPartial
Тип будет работать только с объектами.
Если Obj - объект, то есть 2 варианта:
    1) Obj - функция (т.к. Function подтип object) и нам нужно просто убрать readonly
    
    2) Obj - не функция, значит нужно обойти его свойства и сделать их опциональными.
    Здесь снова есть 2 варианта: 
        2.1. Если значение его свойства примитив (не объект), то просто сделаем свойство
        опциональным.
        2.2. Если значение свойства это объект, то нужно обойти его также как и исходный 
        тип Obj. Поэтому снова оборачиваем тип в DeepPartial (делаем "обход в глубину") 
*/

export type DeepPartial<Obj extends object> = Obj extends Function
  ? Obj
  : {
      [Key in keyof Obj]?: Obj[Key] extends object
        ? DeepPartial<Obj[Key]>
        : Obj[Key];
    };

/*
MyCapitalize
Берем первый символ и меняем его на верхний регистр через вспомогательный тип
CapitalizedChar.
*/
export type MyCapitalize<Str extends string> =
  Str extends `${infer FirstChar}${infer RestString}`
    ? `${CapitalizedChar<FirstChar>}${RestString}`
    : // Если строка будет пустая, то ничего не меняем и возвращаем оригинальную строку
      Str;

/*
CapitalizedChar - вспомогательный тип, который меняет регистр у символа строки на верхний. 
Если строка состоит из одного символа и это латинская буква в нижнем регистре,
то меняем регистр на верхний. Иначе ничего не делаем со строкой.
*/
type CapitalizedChar<Char extends string> = Char extends "a"
  ? "A"
  : Char extends "b"
  ? "B"
  : Char extends "c"
  ? "C"
  : Char extends "d"
  ? "D"
  : Char extends "e"
  ? "E"
  : Char extends "f"
  ? "F"
  : Char extends "g"
  ? "G"
  : Char extends "h"
  ? "H"
  : Char extends "i"
  ? "I"
  : Char extends "j"
  ? "J"
  : Char extends "k"
  ? "K"
  : Char extends "l"
  ? "L"
  : Char extends "m"
  ? "M"
  : Char extends "n"
  ? "N"
  : Char extends "o"
  ? "O"
  : Char extends "p"
  ? "P"
  : Char extends "q"
  ? "Q"
  : Char extends "r"
  ? "R"
  : Char extends "s"
  ? "S"
  : Char extends "t"
  ? "T"
  : Char extends "u"
  ? "U"
  : Char extends "v"
  ? "V"
  : Char extends "w"
  ? "W"
  : Char extends "x"
  ? "X"
  : Char extends "y"
  ? "Y"
  : Char extends "z"
  ? "Z"
  : // Если символ не латинская буква, то ничего не меняем
    Char;

/*
DeepMutable
Тип будет работать только с объектами.
Если Obj - объект, то есть 2 варианта:
    1) Obj - функция (т.к. Function подтип object) и нам нужно просто убрать readonly
    
    2) Obj - не функция, значит нужно обойти его свойства и убрать везде readonly.
    Здесь снова есть 2 варианта: 
        2.1. Если значение его свойства примитив (не объект), то уберем readlonly.
        2.2. Если значение свойства это объект, то нужно обойти его также как и исходный 
        тип Obj. Поэтому снова оборачиваем тип в DeepMutable (делаем "обход в глубину") 
*/

export type DeepMutable<Obj extends object> = Obj extends Function
  ? Obj
  : {
      -readonly [Key in keyof Obj]: Obj[Key] extends object
        ? DeepMutable<Obj[Key]>
        : Obj[Key];
    };

export type ParseURLParams<StringElem> = unknown;
