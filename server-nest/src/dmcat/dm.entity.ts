import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'dm' })
export class DmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    msg_id: string;
    @Column()
    room_id: string;
    @Column()
    user_name: string;
    @Column()
    user_id: string;
    @Column()
    content: string;

    
    // 

    // @Column()
    // created_by: string;
    // @Column()
    // updated_by: string;
    @Column()
    created_at: number;
    // @Column()
    // updated_at: number;
}