export const adjustValue = (value: string) => {
  const digits = value.replace(/[^\d]/g, '');
  if (!digits || digits.length < 10) return value;
  const cut = digits.length === 10 ? 6 : 7;
  const max = digits.length > 11 ? 11 : digits.length;
  return `(${digits.substring(0, 2)}) ${digits.substring(2, cut)}-${digits.substring(cut, max)}`;
};

export const maskPhone = (value: string | undefined) => {
  const newValue = adjustValue(value ?? '');
  return newValue.length >= 6 && newValue[5] === '9' ? '(99) 99999-9999' : '(99) 9999-9999';
};
