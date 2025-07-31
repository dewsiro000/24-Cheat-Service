/*custom modules*/
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt'
import { logger } from '@/lib/winston'
import config from '@/config'

/* models */
import User from '@/models/user'
import Token from '@/models/token'

/*Types*/
import type { Request, Response } from 'express'
import type { IUser } from '@/models/user'

type UserData = Pick<IUser, 'email' | 'password' | 'username'>

const register = async(req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username } = req.body as UserData;
		
		const newUser = await User.create({
			username,
			email,
			password,
		});
		
		const accessToken = generateAccessToken(newUser._id);
		const refreshToken = generateRefreshToken(newUser._id);
		
		await Token.create({ token: refreshToken, userId: newUser._id });
		logger.info('Refresh token created for user', {
		  userId: newUser._id,
		  token: refreshToken,
		})
		
		res.cookie('refreshToken', refreshToken, {
			 httpOnly: true,
			 secure: config.NODE_ENV !== 'production',
			 sameSite: 'strict',
		})
  
	  res.status(201).json({
		  user: {
		    username: newUser.username,
		    email: newUser.email,
		    role: newUser.role,
		  },
		  accessToken
	  })
	  
	  logger.info('User registered successfully', {
	    username: newUser.username,
	    email: newUser.email,
	    role: newUser.role,
	  })
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: err
    })
    
    logger.error('Error during user registeration', err)
  }
}

export default register;