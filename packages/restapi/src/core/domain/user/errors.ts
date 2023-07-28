
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

export {
  InvalidUserDataError,
  EmailExistsError,
};

export default {
  InvalidUserDataError,
  EmailExistsError,
};
