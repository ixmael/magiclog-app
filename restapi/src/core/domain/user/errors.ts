
/**
 *
 */
class InvalidUserDataError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "InvalidUserDataError";

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidUserDataError.prototype);
  }

  toString() {
    return this.message;
  }
}

/**
 *
 */
class EmailExistsError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "EmailExistsError";

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, EmailExistsError.prototype);
  }

  toString() {
    return this.message;
  }
}

/**
 *
 */
class EmailNotExistsError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "EmailNotExistsError";

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, EmailNotExistsError.prototype);
  }

  toString() {
    return this.message;
  }
}

/**
 *
 */
class PasswordIsInvalidError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "PasswordIsInvalidError";

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, PasswordIsInvalidError.prototype);
  }

  toString() {
    return this.message;
  }
}

export {
  InvalidUserDataError,
  EmailExistsError,
  EmailNotExistsError,
  PasswordIsInvalidError,
};

export default {
  InvalidUserDataError,
  EmailExistsError,
  EmailNotExistsError,
  PasswordIsInvalidError,
};
