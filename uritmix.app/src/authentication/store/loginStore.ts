import { IAccount } from "../../base/account";
import BaseStore from "../../base/baseStore";
import { Api } from "uritmix.api";

class LoginStore extends BaseStore<IAccount> {
  constructor() {
    super();
  }

  public async login(
    email: string,
    password: string,
    rememberMe: boolean
  ): Promise<boolean> {
    return await this.makeRequest(async () => {
      const res = await Api.authApi.apiV1AuthLoginPost({
        email: email,
        password: password,
      });

      this.checkErrors(res);

      if (res.data.ok && res.data.result) {
        let account = IAccount.mapping(res.data.result);
        this.setValue(account);
        IAccount.save(account, rememberMe);
      }

      return res.data.ok || false;
    });
  }
}

export default LoginStore;
