const { RateLimit } = require('async-sema');

// Create rate limiters for different endpoints
const authLimiter = new RateLimit(5); // 5 concurrent requests for auth
const apiLimiter = new RateLimit(10); // 10 concurrent requests for general API
const uploadLimiter = new RateLimit(3); // 3 concurrent requests for file uploads

// Middleware factory for rate limiting
const createRateLimiter = (limiter) => {
  return async (req, res, next) => {
    try {
      await limiter.acquire();
      next();
      limiter.release();
    } catch (error) {
      res.status(429).json({ 
        message: 'Too many requests. Please try again later.',
        retryAfter: 60 // Suggest retry after 60 seconds
      });
    }
  };
};

// Export configured middleware
module.exports = {
  authRateLimit: createRateLimiter(authLimiter),
  apiRateLimit: createRateLimiter(apiLimiter),
  uploadRateLimit: createRateLimiter(uploadLimiter)
}; 