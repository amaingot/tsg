import {
  ObjectType,
  getConnection,
  DeepPartial,
  SelectQueryBuilder,
} from "typeorm";
import { buildPaginator } from "typeorm-cursor-pagination";
import { PaginationInput } from "../graphql/types";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

interface Filter<Entity> {
  alias: string;
  query: (qb: SelectQueryBuilder<Entity>) => SelectQueryBuilder<Entity>;
}

const defaultFilter = <Entity>() => ({
  alias: "row",
  query: (qb: SelectQueryBuilder<Entity>) => qb,
});

export const findMany = async <Entity>(
  target: ObjectType<Entity>,
  input: PaginationInput = {},
  filter?: Filter<Entity>
) => {
  const limit = input.limit || 100;
  const order = input.order || "ASC";
  const { cursor: cursorKey, type } = input.cursor || {};
  const { alias, query } = filter || defaultFilter<Entity>();

  const queryBuilder = query(
    getConnection().getRepository<Entity>(target).createQueryBuilder(alias)
  );

  const paginator = buildPaginator<Entity>({
    entity: target,
    query: {
      limit,
      order,
      afterCursor: type === "AFTER" ? cursorKey : undefined,
      beforeCursor: type === "BEFORE" ? cursorKey : undefined,
    },
  });

  const { data, cursor } = await paginator.paginate(queryBuilder);

  return {
    data,
    cursor: {
      afterCursor: cursor.afterCursor || undefined,
      beforeCursor: cursor.beforeCursor || undefined,
    },
  };
};

export const findOne = <Entity>(target: ObjectType<Entity>, id?: string) => {
  if (id === undefined) return undefined;
  return getConnection().getRepository(target).findOne(id);
};

export const findOneOrFail = async <Entity>(
  target: ObjectType<Entity>,
  id: string
) => {
  const record = await findOne(target, id);
  if (record === undefined) throw new Error();
  return record;
};

export const deleteOne = async <Entity>(
  target: ObjectType<Entity>,
  id: string
) => {
  await getConnection().getRepository(target).softDelete(id);
  return true;
};

export const createOne = <Entity>(
  target: ObjectType<Entity>,
  input: DeepPartial<Entity>
) => {
  return getConnection().getRepository(target).create(input);
};

export const updateOne = async <Entity>(
  target: ObjectType<Entity>,
  id: string,
  input: QueryDeepPartialEntity<Entity>
) => {
  await getConnection().getRepository(target).update(id, input);
  const item = await findOne(target, id);
  if (item === undefined) throw new Error();
  return item;
};
