import { generateToken } from '../utils/token-generator.js';
import 'dotenv/config';

const defaultUser = {
  id: process.env.USER_ID,
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
};

export async function login(req, res) {
  const { email, password } = req.body;

  const user = { id: 1, email };

  if (email === defaultUser.email && password === defaultUser.password) {
    const token = generateToken(user);

    res.json({ token });
  } else {
    res.sendStatus(401);
  }
}
