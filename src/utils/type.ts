import type { SexType } from "@faker-js/faker";

export type TabParamLists = {
  messages: undefined;
  status: undefined;
  call: undefined;
  profile: undefined;
};

export type User = {
  _id: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  sex: SexType;
  online: boolean;
};
