export const USER_TYPE = {
  basic_user: 'basic_user',
  pro_user: 'pro_user',
};

export type IUSER_TYPE =
  | typeof USER_TYPE.basic_user
  | typeof USER_TYPE.pro_user
  | null;
