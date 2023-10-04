import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity,ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";

@Entity({name:'ciudad_profesor'})
export class CiudadProfesor{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    direccion:string;

    @ManyToOne(()=>Profesor,profesor=>profesor.domicilios)
    profesor:Profesor;

    @ManyToOne(()=>Ciudad,ciudad=>ciudad.domicilios)
    ciudad:Ciudad;

}