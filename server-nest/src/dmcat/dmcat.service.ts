import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DmEntity } from './dm.entity';

@Injectable()
export class DmcatService {

    constructor(
        @InjectRepository(DmEntity)
        private usersRepository: Repository<DmEntity>,
    ) { }

    findAll(): Promise<DmEntity[]> {
        return this.usersRepository.find();
    }

    async create(body: DmEntity): Promise<DmEntity> {
        body.created_at = new Date().getTime()
        return await this.usersRepository.save(body);
    }
    findOne(id: string): Promise<DmEntity> {
        return this.usersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
