/**
 * This represents the user
 */
export type UserType = {
  id: string;
  email: string;
  passwordHashed: string;
  createdAt: number; // Use as epoch
};

/**
 * This reprents the user information that can be public
 */
export type PublicUserType = {
  id: string;
};
