export interface IDoc {
  id: number
  created_at: string
  updated_at: string
}

interface Log {
  fatal(message?: any, ...optionalParams: any[]): void
  error(message?: any, ...optionalParams: any[]): void
  warn(message?: any, ...optionalParams: any[]): void
  info(message?: any, ...optionalParams: any[]): void
  debug(message?: any, ...optionalParams: any[]): void
}

interface CRUD {
  // https://strapi.io/documentation/v3.x/concepts/queries.html#api-reference
  create(collection_data: any): Array<any>
  // _sort filed_name:asc|desc|ASC|DESC
  find(
    query_param:
      | any
      | {
          _sort?: 'filed_name:asc' | 'filed_name:desc'
          _limit: number
          _start: number
        }
  ): Array<IDoc>
  update(query_param: any | { id: number }, collection_data: any): Array<any>
  delete(query_param: any): Array<any>
}
export const UTIL_public_doc = (doc: any) => {
  let d = JSON.parse(JSON.stringify(doc))
  delete d['created_by']
  delete d['updated_by']
  return d
}
export interface IStrapi {
  // socket.io
  io?: any
  log: Log
  server?: any
  query(content: string): CRUD
}

declare let strapi: IStrapi
export const strapi_ = strapi
