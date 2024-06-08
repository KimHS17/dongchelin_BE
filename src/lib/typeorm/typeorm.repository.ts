import { Request } from 'express';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ENTITY_MANAGER_KEY } from './typeorm.interceptor';

export class BaseRepository {
  constructor(
    // simple connection from the pool which doesn't have any trx
    private dataSource: DataSource,
    // direct access to the req due to request-scoped repository classes
    private request: Request,
  ) {}

  protected getRepository<T>(entityClass: new () => T): Repository<T> {
    /**
     * give us a repository instance that will run queries inside a transaction if the transaction interceptor is used
     * if transaction interceptor was not used, it will run queries outside of any transaction
     */
    const entityManager: EntityManager =
      this.request[ENTITY_MANAGER_KEY] ?? this.dataSource.manager;
    return entityManager.getRepository(entityClass);
  }
}
