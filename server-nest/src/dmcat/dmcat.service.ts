import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { DmEntity } from './dm.entity';
export interface StatOption {
    key: string
    title: string
    count: number
}
export interface ConfBody {
    stat_option_arr: StatOption[],
    room_id: string,
    start_time: any,
    end_time: any,
    updated_at: any,
    type: 'pk' | 'vote' | 'stat'
}
@Injectable()
export class DmcatService {
    _last_stat_conf: any
    _last_stat_conf_map: Record<string, ConfBody> = {
        'pk': null,
        'vote': null,
        'stat': null,
    }
    async start_stat(body: any) {
        let { stat_option_arr, room_id, start_time, end_time, updated_at, type } = body
        if (stat_option_arr.length) {
            this._last_stat_conf = body

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
            this._stat_option_arr = stat_option_arr
            if (['pk', 'vote', 'stat'].includes[type]) {
                // if (Object.keys(this._last_stat_conf_map).includes[type]) {
                //
                body.stat_option_arr = { ...stat_option_arr }
                this._last_stat_conf_map[type] = { ...body }
            }
        }
        return { stat_option_arr, type, map: this._last_stat_conf_map }
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
            option['take'] = query['_limit'];
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
    async stat_user(room_id: string, start: number = 0, end: number) {
        let dm_arr = await this.dmRepository.find({ room_id, created_at: Between(start, end) })
        let user_stat = {}
        for (let dm of dm_arr) {
            if (!user_stat[dm.user_id])
                user_stat[dm.user_id] = { user_name: dm.user_name, count: 0 }
            user_stat[dm.user_id].count++
        }
        return { msg: 'sus', user_stat }
    }
    async create(body: DmEntity) {
        this._last_room_id = body.room_id
        this.stat_new_dm(body)
        body.created_at = new Date().getTime();

        let io = global['dmcat-io']
        io?.emit("wall", { msg: { un: body.user_name, cont: body.content } })
        return this.dmRepository.save(body);
    }
    stat_new_dm(dm: DmEntity) {
        if (this._stat_option_arr.length) {
            this._stat_option_arr.forEach((so: StatOption) => {
                if (this._last_stat_conf.room_id && this._last_stat_conf.room_id === dm.room_id) {
                    if (dm.content.includes(so.key)) {
                        so.count++
                        let io = global['dmcat-io']
                        io?.emit("stat_new_dm", so)
                        Logger.log(`stat_new_dm ${dm.content}, ${so.key} count:${so.count}`, 'dmcat-io');
                    }
                }
            })
        }
        for (const type in this._last_stat_conf_map) {
            const conf_body = this._last_stat_conf_map[type]
            if (conf_body && conf_body.stat_option_arr.length) {
                conf_body.stat_option_arr.forEach((so: StatOption) => {
                    if (conf_body.room_id && conf_body.room_id === dm.room_id) {
                        if (dm.content.includes(so.key)) {
                            so.count++
                            let io = global['dmcat-io']
                            io?.emit("stat_new_dm", { ...so, type })
                            Logger.log(`stat_new_dm ${dm.content}, ${so.key} count:${so.count}`, 'dmcat-io');
                        }
                    }
                })
            }
        }

    }
    get_stat_type(type: string) {
        if (this._last_stat_conf_map[type]) {
            return { msg: 'sus', ...this._last_stat_conf_map[type] }
        }
        return { msg: 'no type', type }
    }
    get_stat() {
        return { ...this._last_stat_conf, stat_option_arr: this._stat_option_arr }
    }
    findOne(id: string): Promise<DmEntity> {
        return this.dmRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.dmRepository.delete(id);
    }
}
