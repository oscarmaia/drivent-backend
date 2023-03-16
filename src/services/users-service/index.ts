import { cannotEnrollBeforeStartDateError } from '@/errors';
import userRepository from '@/repositories/user-repository';
import { User } from '@prisma/client';
import axios from 'axios';
import bcrypt from 'bcrypt';
import qs from 'query-string';
import eventsService from '../events-service';
import { duplicatedEmailError } from './errors';

export async function createUser({ email, password }: CreateUserParams): Promise<User> {
  await canEnrollOrFail();

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function canEnrollOrFail() {
  const canEnroll = await eventsService.isCurrentEventActive();
  if (!canEnroll) {
    throw cannotEnrollBeforeStartDateError();
  }
}

async function getAcessToken(code: string) {
  const { CLIENT_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
  const params = {
    code,
    grant_type: 'authorization_code',
    redirect_uri: CLIENT_URL,
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
  };
  try {
    const { data } = await axios.post('https://github.com/login/oauth/access_token', params, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const parsedData = qs.parse(data);
    return parsedData.access_token;
  } catch (error) {
    console.log(error);
  }
}

async function fetchUser(token: any) {
  const GITHUB_ENDPOINT = 'https://api.github.com/user';
  const response = await axios.get(GITHUB_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export type CreateUserParams = Pick<User, 'email' | 'password'>;

const userService = {
  createUser,
  getAcessToken,
  fetchUser,
};

export * from './errors';
export default userService;
