import { queryKeys } from "@/react-query/query.key";
import { DefaultEntity, DefaultParams } from "@/types/general.type";
import { QueryFunctionContext } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import baseAxios from "./axios.service";

export class BaseService<
  QueryKey extends keyof typeof queryKeys,
  Entity extends DefaultEntity,
  Create extends object = Partial<Entity>
> {
  constructor(private _path: string) {}

  get path() {
    return this._path;
  }

  private getService = (params: DefaultParams): Promise<AxiosResponse> => {
    return baseAxios.get(this.path, { params });
  };

  get = (
    context: QueryFunctionContext<
      ReturnType<(typeof queryKeys)[QueryKey]["list"]>
    >
  ) => {
    const { params } = context.queryKey[0];
    return this.getService(params as DefaultParams);
  };

  getInfinite = (
    context: QueryFunctionContext<
      ReturnType<(typeof queryKeys)[QueryKey]["list"]>
    >
  ) => {
    const { pageParam = 1, queryKey } = context;

    const params = {
      ...(queryKey?.[0]?.params as DefaultParams),
      page: pageParam as number,
    };

    return this.getService(params as DefaultParams);
  };

  getById = (
    context: QueryFunctionContext<
      ReturnType<(typeof queryKeys)[QueryKey]["detail"]>
    >
  ): Promise<Entity> => {
    const { id } = context.queryKey[0];
    return baseAxios.get(this.path + "/" + id);
  };

  create = (payload: Create): Promise<Entity> => {
    return baseAxios.post(this.path, payload);
  };

  update = (payload: Partial<Entity>): Promise<Entity> => {
    const { id } = payload;
    return baseAxios.put(this.path + "/" + id, payload);
  };

  delete = (id: string): Promise<unknown> => {
    return baseAxios.delete(this.path + "/" + id);
  };
}
