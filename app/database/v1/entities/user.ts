export enum UserType {
  /* 管理员 */
  ADMIN = 1,
  /* 访客 */
  GHOST = 2,
}

export interface User {
  type: UserType;
  password?: string;
}
