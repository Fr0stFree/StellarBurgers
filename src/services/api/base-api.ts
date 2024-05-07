import {DEFAULT_REQUEST_TIMEOUT} from "./constants.ts";

class BaseApi {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private checkSuccess(obj: any): any {
    let errorMessage = 'Ошибка:';
    if (!obj.hasOwnProperty('success')) {
      throw new Error(errorMessage + ' отсутствует поле success');
    }
    if (!obj.success) {
      obj.hasOwnProperty('message') ? errorMessage += ` ${obj.message}` : errorMessage += ' неизвестная ошибка';
      throw new Error(errorMessage);
    }
    delete obj.success;
    return obj;
  }

  protected async makeRequest(relativeUrl: string, options: RequestInit) {
    options.signal = options.signal || AbortSignal.timeout(DEFAULT_REQUEST_TIMEOUT);
    const response = await fetch(`${this.baseUrl}/${relativeUrl}`, options);
    const data = await response.json();
    return this.checkSuccess(data);
  }

  protected async get(relativeUrl: string, extra: {accessToken?: string} = {}): Promise<any> {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    if (extra.accessToken) {
      options.headers['Authorization'] = extra.accessToken;
    }
    return this.makeRequest(relativeUrl, options);
  }

  protected async post(relativeUrl: string, body: any, extra: {accessToken?: string} = {}): Promise<any> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }
    if (extra.accessToken) {
      options.headers['Authorization'] = extra.accessToken;
    }
    return this.makeRequest(relativeUrl, options);
  }

  protected async patch(relativeUrl: string, body: any, extra: {accessToken?: string} = {}): Promise<any> {
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }
    if (extra.accessToken) {
      options.headers['Authorization'] = extra.accessToken;
    }
    return this.makeRequest(relativeUrl, options);
  }
}

export default BaseApi;
