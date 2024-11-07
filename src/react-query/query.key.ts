enum QueryKeysEnum {
  BASE = 'base'
}

export type QueryKeyItemType<Params = unknown> = {
  scope?: QueryKeysEnum
  entity?: string
  id?: string
  params?: Params
}

export type QueryKeyTypes<Params = unknown> = [QueryKeyItemType<Params>]

const createBasicListKey = <ListParams = unknown>({ scope }: { scope: QueryKeysEnum }) => {
  const queryKeyFactory = {
    /**
     * Used to invalidate all queries related to this scope
     */
    invalidateAllKey: [{ scope }] as QueryKeyTypes,
    /**
     * Used to invalidate all list queries
     */
    invalidateListsKey: () => [{ ...queryKeyFactory.invalidateAllKey[0], entity: 'lists' }] as QueryKeyTypes,
    /**
     * List query key with params
     */
    list: (params?: ListParams) =>
      [{ ...queryKeyFactory.invalidateListsKey()[0], params }] as QueryKeyTypes<ListParams>,
    /**
     * Used to invalidate all detail queries
     */
    invalidateDetailsKey: () => [{ ...queryKeyFactory.invalidateAllKey[0], entity: 'details' }] as QueryKeyTypes,
    /**
     * Detail query key
     */
    detail: (id: string) => [{ ...queryKeyFactory.invalidateDetailsKey()[0], id }] as QueryKeyTypes
  }

  return queryKeyFactory
}

export const queryKeys = {
  base: createBasicListKey({ scope: QueryKeysEnum.BASE })
}
