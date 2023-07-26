// eslint-disable-next-line import/prefer-default-export
export function getResponseCount(response: Record<string, any>) {
   return response.headers.map && response.headers.map['content-range']
      ? Number(response.headers.map['content-range'])
      : 0;
}
