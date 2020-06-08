export default interface Helper {
  stringifyParams(params: any): string
  getBase64(file: File): Promise<string>
  prepareUrl(baseUrl: string, params: any): string
  jsonReparse(data: any): any
}
