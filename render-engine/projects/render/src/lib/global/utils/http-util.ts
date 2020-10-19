import { HttpResponse, HttpRequest, HttpErrorResponse } from '@angular/common/http';

export class HttpUtil {
  static checkErrorResponse(res: HttpResponse<any>) {
    const body = res.body as { error_code: string, error_message: string };
    if (body.error_code || body.error_message) {
      const httpErrorResponse = new HttpErrorResponse({
        error: `[${body.error_code}] ${body.error_message}`,
        headers: res.headers,
        status: 400,
        statusText: 'OK',
        url: res.url
      });
      throw httpErrorResponse;
    }
  }
}
