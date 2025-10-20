export function cleanObject<T>(obj: T | Partial<T>, allowEmptyStrings = true, allowNulls = false): T {
  return Object.keys(obj).reduce<T>((acc, key) => {
    const value = obj[key];
    const isValueEmpty = value === '';
    const isValueNull = value === null;
    const isValueUndefined = value === undefined;

    if (isValueUndefined || (!allowNulls && isValueNull) || (!allowEmptyStrings && isValueEmpty)) {
      return acc;
    }

    acc[key] = value;
    return acc;
  }, {} as T);
}
