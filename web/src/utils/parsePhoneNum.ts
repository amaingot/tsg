const parsePhoneNum = (p: string): string => {
  const a = p.slice(1, 4);
  const b = p.slice(6, 9);
  const c = p.slice(10, 14);

  return `+1${a}${b}${c}`;
};

export default parsePhoneNum;
