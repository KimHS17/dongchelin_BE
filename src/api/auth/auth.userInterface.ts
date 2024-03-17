import { UserEntity } from 'src/entities/user.entity';

export interface IOAuthUser {
  user: Pick<UserEntity, 'email' | 'name' | 'nickname'>;
}
