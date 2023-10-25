/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Users } from 'src/modules/users/entities/users.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot({
  envFilePath: '.env',
});
const config: MysqlConnectionOptions = {
  type: process.env.DB_TYPE as 'mysql' | 'mariadb',
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Users],
  synchronize: false, // Tạo bảng xong thì nhớ chuyển thành false
  namingStrategy: new SnakeNamingStrategy(),
};

export default config;