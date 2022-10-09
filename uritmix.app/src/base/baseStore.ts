import { action, computed, makeObservable, observable } from "mobx";
import { catchHttp } from "./catchError";

class BaseStore<T> {
  // К сожалению Mobx не дает наблюдать скрытые поля
  _errors: string[] = [];
  _loading: boolean = false;
  _value: T | null = null;
  private _callCheckError: boolean = false;

  public get loading() {
    return this._loading;
  }

  public get errors() {
    return this._errors;
  }

  public get value() {
    return this._value;
  }

  public clearErrors = () => (this._errors = []);

  public addError = (error: string) => this._errors.push(error);

  public setLoading = (value: boolean) => (this._loading = value);

  public setValue = (value: T | null) => (this._value = value);

  public init() {
    this.clearErrors();
    this.setLoading(false);
    this.setValue(null);
  }

  constructor() {
    makeObservable(this, {
      _errors: observable,
      _loading: observable,
      _value: observable,

      loading: computed,
      errors: computed,
      value: computed,

      clearErrors: action,
      setLoading: action,
      addError: action,
      setValue: action,
    });
  }

  protected checkErrors(result: any) {
    this._callCheckError = false;
    if (result && !result.data.ok) {
      throw result.data.error || "Unknown error";
    }
  }

  protected async makeRequest(
    onRequest: () => Promise<boolean>
  ): Promise<boolean> {
    this.setLoading(true);
    this.clearErrors();
    this.setValue(null);
    this._callCheckError = true;
    try {
      let res = await onRequest();
      if (this._callCheckError) throw "You didn't call checkErrors";
      return res;
    } catch (error) {
      catchHttp(error, (error) => {
        this.addError(error);
      });
    } finally {
      this.setLoading(false);
    }

    return false;
  }
}

export default BaseStore;
