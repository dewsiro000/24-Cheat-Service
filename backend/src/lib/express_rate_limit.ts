import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  
  limit: 100, 
  standardHeaders: true, 
  legacyHeaders: false, 
  message: {
    error: 'You have sent too many request in a given amount of time. Please try again later.',
  } 
})

export default limiter;

