import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  firstName?: string;
  lastName?: string;
}

const userSchema = new Schema<IUser> (
  {
	  username: {
	    type: String,
	    required: [true, 'Username is required'],
		    maxLength: [20, 'User name must be less than 20 characters'],
		    unique: [true, 'Username must be unique'],
	  },
	  email: {
		  type: String,
		  required: [true, 'Email is required'],
		  maxLength: [50, 'Email must be less than 50 characters'],
		  unique: [true, 'Email must be unique'],
	  },
	  password: {
	    type: String,
	    required: [true, 'password is required'],
	    select: false,
	  },
	  role : {
		  type: String,
		  required: [true, 'Role is required'],
		  default: 'user',
	  },
  }, 
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) {
	  next();
	  return;
  }
  
  //Hash the password
  this.password = await bcrypt.hash(this.password, 10);
  next();
})


export default model<IUser>('User', userSchema);