import {DEFAULT_REQUEST_TIMEOUT} from "../constants.ts";

class BaseApi {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected checkResponse: (response: Response) => void = (response) => {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
  }

  protected checkSuccess: (obj: any) => any = (obj) => {
    const errorMessage = 'Ошибка валидации ответа:';
    if (!obj.hasOwnProperty('success')) {
      throw new Error(errorMessage + ' отсутствует поле success');
    }
    if (!obj.success) {
      throw new Error(errorMessage + ' сервер не подтвердил успешность операции');
    }
    delete obj.success;
    return obj;
  }

  protected async makeRequest(relativeUrl: string, options: RequestInit) {
    options.signal = options.signal || AbortSignal.timeout(DEFAULT_REQUEST_TIMEOUT);
    const response = await fetch(`${this.baseUrl}/${relativeUrl}`, options);
    this.checkResponse(response);
    const data = await response.json();
    return this.checkSuccess(data);
  }
}

export default BaseApi;
