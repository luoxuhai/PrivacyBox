export enum UserType {
  /* 管理员 */
  ADMIN = 1,
  /* 访客 */
  GHOST = 2,
}

export interface User {
  id: string;
  type: UserType;
  password?: string;
}
