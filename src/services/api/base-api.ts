import {DEFAULT_REQUEST_TIMEOUT} from "./constants.ts";

class BaseApi {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private checkResponse(response: Response): void {
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
  }

  private checkSuccess(obj: any): any {
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

  protected async get(relativeUrl: string): Promise<any> {
    return this.makeRequest(relativeUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}});
  }

  protected async post(relativeUrl: string, body: object): Promise<any> {
    return this.makeRequest(relativeUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    });
  }

}

export default BaseApi;
