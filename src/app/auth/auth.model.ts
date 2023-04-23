type LoginPayload = {
  name: string;
  password: string;
  isPersistent: boolean;
};

interface IAuthorizedUser {
  access_token: string;
  id: string;
  name: string;
}

export { LoginPayload, IAuthorizedUser };
