import authenticationService from '@/services/authentication-service';
import userService from '@/services/users-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function usersPost(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await userService.createUser({ email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === 'DuplicatedEmailError') {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function loginWithGithub(req: Request, res: Response) {
  const { code } = req.body;
  const token = await userService.getAcessToken(code);
  const user = await userService.fetchUser(token);
  try {
    const userEmailAndPassword = { email: user.email, password: user.id };
    const createdUser = await userService.createUser(userEmailAndPassword);
    const token = await authenticationService.createSession(createdUser.id);
    const returnUserInDB = {
      ...createdUser,
      token,
    };
    delete returnUserInDB.password;
    return res.status(httpStatus.OK).send(returnUserInDB);
  } catch (error) {
    if (error.name === 'DuplicatedEmailError') {
      try {
        const userInDB = await userService.getUserByEmail(user.email);
        const token = await authenticationService.createSession(userInDB.id);
        const returnUserInDB = {
          ...userInDB,
          token,
        };
        delete returnUserInDB.password;
        return res.status(httpStatus.OK).send(returnUserInDB);
      } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).send({});
      }
    }
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
