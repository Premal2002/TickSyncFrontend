export class User {
    userId?: number;
    fullName: string;
    email: string;
    phone: string;
    passwordHash: string;
    createdAt?: string;
  
    constructor(
      fullName: string,
      email: string,
      phone: string,
      passwordHash: string,
      userId?: number,
      createdAt?: string
    ) {
      this.fullName = fullName;
      this.email = email;
      this.phone = phone;
      this.passwordHash = passwordHash;
      this.userId = userId;
      this.createdAt = createdAt;
    }
  }