import CustomStore from "devextreme/data/custom_store";
import { Api, dto } from "uritmix.api";
import { Paginator } from "../../base/paginator";
import { catchHttp, checkErrors } from "../../base/catchError";

const personsDataStore = () => {
  let totalCount = 0;
  let persons: dto.Person[] = [];
  return new CustomStore({
    key: "id",
    load: async (options) => {
      if (options.searchOperation != "contains") return [];

      try {
        const response = await Api.personApi.apiV1PersonGet(
          Paginator.paginatorPageSize(options.skip, options.take),
          Paginator.paginatorPageNumber(options.skip, options.take)
        );
        checkErrors(response);
        totalCount = response.data.result?.totalRecords!;
        persons = response.data.result?.results!;
        return persons;
      } catch (error) {
        catchHttp(error, (errorMessage: string) => {
          throw errorMessage;
        });
      }
      return [];
    },
    totalCount: () => {
      return Promise.resolve(totalCount);
    },
  });
};
export default personsDataStore;
