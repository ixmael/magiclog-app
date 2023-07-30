import bcrypt from 'bcrypt';

/**
 *
 * @param plainText
 * @returns
 */
const getHash = async (plainText: string): Promise<string> => {
  return await bcrypt
    .genSalt()
    .then((salt: any) => bcrypt.hash(plainText, salt))
    .then((hash: any) => hash);
};

export default getHash;
