import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  name: 'PG',
  connector: 'postgresql',
  // url: 'postgres://postgres:root@localhost/mydatabase',
  host: process.env.HOST,
  port: +(process.env.DBPORT ?? 3000),
  user: process.env.DBUSERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PgDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'PG';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.PG', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
