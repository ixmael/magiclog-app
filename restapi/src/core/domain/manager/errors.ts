/**
 *
 */
export class NotExistsManagerError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "ManagerNotExistsError,";

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotExistsManagerError.prototype);
  }

  toString() {
    return this.message;
  }
}

/**
 *
 */
export class InvalidPasswordManagerError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "InvalidUserDataError";

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidPasswordManagerError.prototype);
  }

  toString() {
    return this.message;
  }
}
