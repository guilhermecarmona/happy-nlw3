import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import path from 'path';
import { differenceInHours } from 'date-fns';
import User from '../models/User';
import UserToken from '../models/UserToken';
import EtherealMailProvider from '../providers/EtherealMailProvider';

export default {
  async create(request: Request, response: Response) {
    const { email } = request.body;

    const userRepository = getRepository(User);
    const user = await userRepository.find({
      where: {
        email,
      },
    });

    if (!user || user.length === 0) {
      return response.status(404).json({ message: 'User not found' });
    }

    const userTokenRepository = getRepository(UserToken);
    const token = v4();
    const userToken = userTokenRepository.create({
      token,
      user_id: user[0].id,
    });
    await userTokenRepository.save(userToken);

    const forgotPasswordTemplate = path.join(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    );

    const mailProvider = new EtherealMailProvider();
    await mailProvider.sendMail({
      to: email,
      subject: 'Redefinição de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          link: `${process.env.HAPPY_URL}/reset-password?token=${token}`,
        },
      },
    });

    return response.json({ message: 'E-mail sent' });
  },

  async update(request: Request, response: Response) {
    const userTokensRepository = getRepository(UserToken);
    const { token, password } = request.body;
    const userToken = await userTokensRepository.find({ where: { token } });
    if (!userToken || userToken.length === 0) {
      return response
        .status(400)
        .json({ messag: 'User token does not exists' });
    }
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(userToken[0].user_id);
    if (!user) {
      return response
        .status(400)
        .json({ messag: 'The user provided by the token does not exists' });
    }
    const tokenCreatedAt = userToken[0].created_at.getTime();
    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      return response.status(400).json({ messag: 'Token expired' });
    }
    user.password = await hash(password, 8);
    await usersRepository.save(user);
    return response.json({ message: 'Password updated' });
  },

  async show(request: Request, response: Response) {
    const usersRepository = getRepository(User);
    const { email, password } = request.body;
    const user = await usersRepository.find({ where: { email } });
    if (!user || user.length === 0)
      return response
        .status(401)
        .json({ message: 'Incorrect email/password combination.' });

    const passwordMatched = await compare(password, user[0].password);
    if (!passwordMatched)
      return response
        .status(401)
        .json({ message: 'Incorrect email/password combination.' });

    const secret = process.env.HAPPY_JWT_SECRET || 'default';
    const token = sign({}, secret, {
      subject: user[0].id.toString(),
      expiresIn: '1d',
    });
    return response.json({ user, token });
  },
};
