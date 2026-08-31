const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegistration = (input) => {
  const errors = [];
  const name = typeof input?.name === 'string' ? input.name.trim() : '';
  const email = typeof input?.email === 'string' ? input.email.trim() : '';
  const password = typeof input?.password === 'string' ? input.password : '';

  if (name.length < 2 || name.length > 100) {
    errors.push({
      field: 'name',
      message: 'Name must contain between 2 and 100 characters',
    });
  }

  if (
    email.length > 320 ||
    !EMAIL_PATTERN.test(email) ||
    email.includes('..')
  ) {
    errors.push({
      field: 'email',
      message: 'A valid email address is required',
    });
  }

  if (
    password.length < 8 ||
    !/[A-Za-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    errors.push({
      field: 'password',
      message: 'Password must be at least 8 characters and include a letter and a number',
    });
  } else if (Buffer.byteLength(password, 'utf8') > 72) {
    errors.push({
      field: 'password',
      message: 'Password must not exceed 72 UTF-8 bytes',
    });
  }

  return {
    errors,
    value: {
      name,
      email: email.toLowerCase(),
      password,
    },
  };
};
