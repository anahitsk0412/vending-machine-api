import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  role: string;

  @Expose()
  deposit: number;

  @Expose()
  change?: number[];
}
