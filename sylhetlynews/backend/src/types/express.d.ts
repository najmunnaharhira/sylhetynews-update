declare namespace Express {
  interface Request {
    adminUser?: {
      email: string;
      role: 'admin';
    };
  }
}
