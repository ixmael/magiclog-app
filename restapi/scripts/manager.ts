import fs from 'fs/promises';
import bcrypt from 'bcrypt';

(async () => {
  const username = process.argv[2];
  const plainPassword = process.argv[3];

  const managers = await fs.readFile('./managers.json', {
    encoding: 'utf-8',
  })
    .then((data) => {
      return JSON.parse(data.toString());
    })
    .catch((err) => {
      console.log(err);
      return {};
    });

  if (managers.hasOwnProperty(username)) {
    console.log('The manager exists, this operation override the password');
  }

  const passwordHashed: string = await bcrypt
    .genSalt(7)
    .then((salt: any) => bcrypt.hash(plainPassword, salt))
    .then((hash: any) => hash)
    .catch((err: any) => console.error(err));

  managers[username] = passwordHashed;

  await fs.writeFile('./managers.json', JSON.stringify(managers), {
    encoding: 'utf-8',
  })
    .then((data) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
})();
