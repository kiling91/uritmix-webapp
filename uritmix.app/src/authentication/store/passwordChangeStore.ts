import { IAccount } from "../../base/account";
import BaseStore from "../../base/baseStore";
import { Api } from "uritmix.api"

class PasswordChangeStore extends BaseStore<boolean> {
  constructor() {
    super();
  }

  public async change(code: string, password: string, passwordConfirm: string): Promise<boolean> {
    return await this.makeRequest(async () => {
      const res = await Api.authApi.apiV1AuthPasswordResetPost({
        confirmCode: code,
        password: password,
        passwordConfirm: passwordConfirm,
      });
      this.setValue(res.data.ok);
      this.checkErrors(res);
      return res.data.ok || false;
    });
  }
}

export default PasswordChangeStore;
