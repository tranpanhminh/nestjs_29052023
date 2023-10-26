/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { UsersEntity } from 'src/modules/users/database/entities/users.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule } from '@nestjs/config';
import { RolesEntity } from 'src/modules/roles/database/entities/roles.entity';
import { CategoryEntity } from 'src/modules/category/database/entities/category.entity';
import { QuestionEntity } from 'src/modules/questions/database/entities/questions.entity';
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
  // entities: [UsersEntity, RolesEntity, QuestionEntity, CategoryEntity],
  entities: [__dirname + '/**/**/**/*.entity.{ts,js}'],
  synchronize: true, // Tạo bảng xong thì nhớ chuyển thành false
  namingStrategy: new SnakeNamingStrategy(),
};

export default config;
