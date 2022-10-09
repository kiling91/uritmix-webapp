import BaseStore from "../../base/baseStore";
import { Api } from "uritmix.api";

class PasswordResetStore extends BaseStore<boolean> {
  constructor() {
    super();
  }

  public async reset(email: string): Promise<boolean> {
    return await this.makeRequest(async () => {
      const res = await Api.authApi.apiV1AuthPasswordResetQueryPost({
        email: email,
      });
      this.setValue(res.data.ok);
      this.checkErrors(res);
      return res.data.ok || false;
    });
  }
}

export default PasswordResetStore;
