import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from 'supertest';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { DmcatModule } from "../src/dmcat/dmcat.module";

describe('Dmcat', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                DmcatModule,
            ],
            controllers: [AppController],
            providers: [AppService],
        })
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it('/POST /dmcat/start-stat', (done) => {
        return request(app.getHttpServer())
            .post('/dmcat/start-stat')
            .send({
                "stat_option_arr": [{
                    "key": '了',
                    "title": '1:选项1统计了 热词',
                    "count": 0
                },
                {
                    "key": '666',
                    "title": '2:选项1统计2',
                    "count": 0
                }],
                room_id: '6881113512324844302',
                updated_at: new Date().getTime(),
                start_time: 1602140190215
            })
            .end((err, res) => {
                expect(res.status).not.toBe(404)
                expect(res.status).toBe(201)
                // .expect(201)
                expect(res.body).toEqual(
                    expect.objectContaining({ msg: 'sus' })
                );
                done()
            })
    });

    afterAll(async () => {
        await app.close();
    });
});