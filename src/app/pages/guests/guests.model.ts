export interface IGuest {
  id?: string;
  ip: string;
  country: string;
  city: string;
  flag: string;
  userAgent: string;
  browser: Nullable<string>;
  os: Nullable<string>;
  createdAt: Date;
}
