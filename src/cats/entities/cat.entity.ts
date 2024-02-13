import { Breed } from "src/breeds/entities/breed.entity";
import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Cat {

    @Column({ primary: true, generated:true })
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    age: number;

    // @Column()
    // breed: string;

    @DeleteDateColumn()
    deleteAt: Date;

    @ManyToOne(() => Breed , (breed) => breed.id, {
        eager: true,
    })
    breed: Breed;

    // @ManyToOne(() => User, (user) => user.email, {
    //     eager: true,
    // })
    // user: User

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email', })
    user: User;

    @Column()
    userEmail: string;

}
