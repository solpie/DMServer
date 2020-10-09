import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { DmEntity } from './dm.entity';
interface StatOption {
    key: string
    title: string
    count: number
}
@Injectable()
export class DmcatService {
    async start_stat(body: any) {
        let { stat_option_arr, room_id, start_time, end_time } = body
        start_time = Number(start_time)
        if (!end_time)
            end_time = Infinity
        else {
            end_time = Number(end_time)
        }
        for (let stat_option of stat_option_arr) {
            //
            let so: StatOption = stat_option
            so.count = await this.dmRepository.count({ room_id, created_at: Between(start_time, end_time), content: Like(`%${so.key}%`) })
            Logger.log(`start stat ${so.key} - ${so.title}: ${so.count}`, 'DmcatService');
            // console.log(`start stat ${so.key} - ${so.title}: ${so.count}`);


        }
        return { stat_option_arr }
    }

    _last_room_id: string
    _last_dm: DmEntity
    _stat_option_arr: StatOption[] = []
    constructor(
        @InjectRepository(DmEntity)
        private dmRepository: Repository<DmEntity>,
    ) {
        this.init_stat()
    }

    async init_stat() {
        // 最新一条弹幕
        let dm = await this.dmRepository.findOne({
            order: {
                created_at: "DESC"
            }
        })
        if (dm) {
            this._last_dm = dm
            this._last_room_id = dm.room_id
            // console.log(dm);
            Logger.log(`start stat ${JSON.stringify(dm)}`, 'DmcatService');
        }
    }

    findAll(): Promise<DmEntity[]> {
        return this.dmRepository.find();
    }
    count(): Promise<number> {
        return this.dmRepository.count();
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
        // option['take'] = query['_limit'];
        if (query['_limit'])
            option['limit'] = query['_limit'];
        if (query['_start'])
            option['skip'] = query['_start'];
        return this.dmRepository.find(option);
    }
    find_like(like: string, start: number = 0, end: number, room_id = null): Promise<DmEntity[]> {
        let option = {
            content: Like(like),
            created_at: Between(start, end)
        }
        if (room_id)
            option[room_id] = room_id
        return this.dmRepository.find(option);
    }
    async create(body: DmEntity) {
        this._last_room_id = body.room_id
        body.created_at = new Date().getTime();
        return this.dmRepository.save(body);
    }
    findOne(id: string): Promise<DmEntity> {
        return this.dmRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.dmRepository.delete(id);
    }
}
