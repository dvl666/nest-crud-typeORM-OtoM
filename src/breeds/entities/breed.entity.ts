import { Cat } from "src/cats/entities/cat.entity";
import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Breed {

    @Column({ primary: true, generated: true })
    id: number;

    @Column({ length: 500 })
    name: string;

    @OneToMany(()=> Cat , (cat) => cat.breed)
    cats: Cat[];

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => User)
    @JoinColumn({ name: 'relatedUserEmail', referencedColumnName: 'email', })
    relatedUser: User;

    @Column()
    relatedUserEmail: string;
    
}
