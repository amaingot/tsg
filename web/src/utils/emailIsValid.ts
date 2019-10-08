const emailIsValid = (e: string): boolean => {
  const email = e.trim();
  if (email.length === 0) {
    return true;
  }

  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export default emailIsValid;