 
export const SESSION_CONSTANTS = {
  ACCESS_TOKEN_EXPIRY: '15m', 
  REFRESH_TOKEN_EXPIRY: '7d',  
  SESSION_EXPIRY: 7 * 24 * 60 * 60 * 1000,  
  MAX_SESSIONS_PER_USER: 5, 
  INACTIVITY_TIMEOUT: 30 * 60 * 1000, 
  REMEMBER_ME_EXPIRY: '30d',  
  TOKEN_ROTATION_THRESHOLD: 24 * 60 * 60 * 1000,  
};

export const SESSION_MESSAGES = {
  CREATED: 'Session created successfully',
  REFRESHED: 'Session refreshed successfully',
  REVOKED: 'Session revoked successfully',
  EXPIRED: 'Session has expired',
  LOGGED_OUT: 'Logged out successfully',
  INVALID_TOKEN: 'Invalid session token',
  MAX_SESSIONS_REACHED: 'Maximum concurrent sessions reached',
  SUSPICIOUS_ACTIVITY: 'Suspicious login activity detected',
};