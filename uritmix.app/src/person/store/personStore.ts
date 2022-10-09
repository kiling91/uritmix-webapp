import { Api, dto } from "uritmix.api";
import BaseStore from "../../base/baseStore";

class PersonStore extends BaseStore<dto.Person> {
  public async create(create: dto.CreatePerson) {
    return await this.makeRequest(async () => {
      const res = await Api.personApi.apiV1PersonPost(create);
      this.checkErrors(res);
      this.setValue(res.data.result);
      return res.data.ok || false;
    });
  }

  public async edit(personId: number, edit: dto.EditPerson) {
    return await this.makeRequest(async () => {
      const res = await Api.personApi.apiV1PersonPersonIdPut(personId, edit);
      this.checkErrors(res);
      this.setValue(res.data.result);
      return res.data.ok || false;
    });
  }

  public async get(personId: number) {
    return await this.makeRequest(async () => {
      const res = await Api.personApi.apiV1PersonPersonIdGet(personId);
      this.checkErrors(res);
      this.setValue(res.data.result);
      return res.data.ok || false;
    });
  }
}

export default PersonStore;
