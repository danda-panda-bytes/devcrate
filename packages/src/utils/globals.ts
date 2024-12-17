export type ForceType<T, U> = { [P in keyof T]: T[P] | U }
export type BooleanMap = { [key: string]: boolean }
export type AnyMap = { [key: string]: any }
export type ValuesOf<T> = T[keyof T]
export type KeysOf<T> = keyof T
export type MapOf<T> = { [key: string]: T }
export type KeyOf<T> = keyof T extends never ? string : keyof T
