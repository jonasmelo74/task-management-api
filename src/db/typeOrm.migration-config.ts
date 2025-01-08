import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

config();

const configServiceInstance = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configServiceInstance.get('DB_HOST'),
  port: configServiceInstance.get('DB_PORT'),
  username: configServiceInstance.get('DB_USERNAME'),
  password: configServiceInstance.get('DB_PASSWORD'),
  database: configServiceInstance.get('DB_NAME'),
  entities: [],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false
}

export default new DataSource(dataSourceOptions);