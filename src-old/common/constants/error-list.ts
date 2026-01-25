// resource
export const RESOURCE_NOT_FOUND = {
  field: 'resourceId',
  error: 'resource.notFound',
  code: 1,
};
export const RESOURCE_NAME_ALREADY_EXISTS = {
  field: 'name',
  error: 'resource.alreadyExists',
  code: 2,
};

// action
export const ACTION_NOT_FOUND = {
  field: 'actionId',
  error: 'action.notFound',
  code: 11,
};
export const ACTION_NAME_ALREADY_EXISTS = {
  field: 'name',
  error: 'action.alreadyExists',
  code: 12,
};

// module
export const MODULE_NOT_FOUND = {
  field: 'moduleId',
  error: 'module.notFound',
  code: 21,
};
export const MODULE_NAME_ALREADY_EXISTS = {
  field: 'name',
  error: 'module.alreadyExists',
  code: 22,
};

// role
export const ROLE_NOT_FOUND = {
  field: 'roleId',
  error: 'role.notFound',
  code: 31,
};
export const ROLE_NAME_ALREADY_EXISTS = {
  field: 'name',
  error: 'role.alreadyExists',
  code: 32,
};

// user
export const USER_NOT_FOUND = {
  field: 'userId',
  error: 'user.notFound',
  code: 41,
};
export const USERNAME_ALREADY_EXISTS = {
  field: 'username',
  error: 'user.usernameAlreadyExists',
  code: 42,
};
export const USER_EMAIL_ALREADY_EXISTS = {
  field: 'email',
  error: 'user.emailAlreadyExists',
  code: 43,
};

// auth
export const INVALID_CREDENTIALS = {
  field: 'credentials',
  error: 'auth.invalidCredentials',
  code: 51,
};
export const INVALID_OLD_PASSWORD = {
  field: 'oldPassword',
  error: 'auth.invalidOldPassword',
  code: 52,
};
export const INVALID_RESET_TOKEN = {
  field: 'token',
  error: 'auth.invalidResetToken',
  code: 53,
};
export const EXPIRED_RESET_TOKEN = {
  field: 'token',
  error: 'auth.expiredResetToken',
  code: 54,
};

// permission
export const PERMISSION_NOT_FOUND = {
  field: 'permissionId',
  error: 'permission.notFound',
  code: 61,
};

// product
export const PRODUCT_NOT_FOUND = {
  field: 'productId',
  error: 'product.notFound',
  code: 71,
};
export const PRODUCT_NAME_ALREADY_EXISTS = {
  field: 'name',
  error: 'product.alreadyExists',
  code: 72,
};

// user role
export const USER_ROLE_NOT_FOUND = {
  field: 'userRoleId',
  error: 'userRole.notFound',
  code: 81,
};

export const ERROR_LIST = [
  RESOURCE_NOT_FOUND,
  RESOURCE_NAME_ALREADY_EXISTS,
  ACTION_NOT_FOUND,
  ACTION_NAME_ALREADY_EXISTS,
  MODULE_NOT_FOUND,
  MODULE_NAME_ALREADY_EXISTS,
  ROLE_NOT_FOUND,
  ROLE_NAME_ALREADY_EXISTS,
  USER_NOT_FOUND,
  USERNAME_ALREADY_EXISTS,
  USER_EMAIL_ALREADY_EXISTS,
  INVALID_CREDENTIALS,
  INVALID_OLD_PASSWORD,
  INVALID_RESET_TOKEN,
  EXPIRED_RESET_TOKEN,
  PERMISSION_NOT_FOUND,
  PRODUCT_NOT_FOUND,
  PRODUCT_NAME_ALREADY_EXISTS,
  USER_ROLE_NOT_FOUND,
];
