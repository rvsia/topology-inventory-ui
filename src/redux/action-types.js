const asyncActions = [
  'LOAD_ENTITIES'
].reduce((acc, curr) => [
  ... acc,
  ...[curr, `${curr}_PENDING`, `${curr}_FULFILLED`, `${curr}_REJECTED`]
], [])

export const ACTION_TYPES = [
    ...asyncActions
  ]
  .reduce((acc, curr) => {
    acc[curr] = curr;
    return acc;
  },
  {}
)

export const SELECT_ENTITY = 'SELECT_ENTITY';
export const EXPAND_ENTITY = 'EXPAND_ENTITY';
export const SORT_ENTITIES = 'SORT_ENTITIES';
export const PAGE_AND_SIZE = 'PAGE_AND_SIZE';
