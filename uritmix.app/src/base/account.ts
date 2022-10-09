import { dto } from "uritmix.api";

export interface IAccount {
  firstName: string;
  lastName: string;
  email: string;
  role: dto.AuthRoleView;
  accessToken: string;
  refreshToken: string;
}

export namespace IAccount {
  export const load = (): IAccount | null => {
    let data = localStorage.getItem("account");
    if (data) return JSON.parse(data);
    else {
      data = sessionStorage.getItem("account");
      if (data) return JSON.parse(data);
    }
    return null;
  };

  export const accountStorageIsLocalStorage = (): boolean => {
    let data = localStorage.getItem("account");
    if (data) return true;
    else {
      data = sessionStorage.getItem("account");
      if (data) return false;
    }
    return false;
  };

  export const save = (account: IAccount, rememberMe: boolean) => {
    if (rememberMe) {
      localStorage.setItem("account", JSON.stringify(account));
      sessionStorage.removeItem("account");
    } else {
      sessionStorage.setItem("account", JSON.stringify(account));
      localStorage.removeItem("account");
    }
  };

  export const logout = () => {
    localStorage.removeItem("account");
    sessionStorage.removeItem("account");
  };

  export const mapping = (login: dto.LoggedPerson): IAccount => {
    return {
      firstName: login.firstName,
      lastName: login.lastName,
      email: login.email,
      role: login.role,
      accessToken: login.accessToken,
      refreshToken: login.refreshToken,
    };
  };
}
