import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService) => {
  return 'mongodb://admin:admin@localhost:27017/admin';
  // return (
  //   'mongodb://' +
  //   configService.get('MONGO_LOGIN') +
  //   ':' +
  //   configService.get('MONGO_PASSWORD') +
  //   '@' +
  //   configService.get('MONGO_HOST') +
  //   ':' +
  //   configService.get('MONGO_PORT') +
  //   '/' +
  //   configService.get('MONGO_AUTHDATABASE')
  // );
};

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
