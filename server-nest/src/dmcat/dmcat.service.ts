import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DmEntity } from './dm.entity';

@Injectable()
export class DmcatService {
  constructor(
    @InjectRepository(DmEntity)
    private usersRepository: Repository<DmEntity>,
  ) {}

  findAll(): Promise<DmEntity[]> {
    return this.usersRepository.find();
  }
  count(): Promise<number> {
    return this.usersRepository.count();
  }
  find_by_strapi(query): Promise<DmEntity[]> {
    // {
    //     "_limit": "10",
    //     "_sort": "id:ASC",
    //     "_start": "0"
    //   }
    let option = {};
    if (query['_sort']) {
      let a = query['_sort'].split(':');
      option['order'] = { [a[0]]: a[1] };
    }
    option['take'] = query['_limit'];
    option['skip'] = query['_start'];
    return this.usersRepository.find(option);
  }
  async create(body: DmEntity): Promise<DmEntity> {
    body.created_at = new Date().getTime();
    return await this.usersRepository.save(body);
  }
  findOne(id: string): Promise<DmEntity> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
