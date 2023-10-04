import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Clase } from "src/clases/entities/clase.entity";
import { CiudadProfesor } from "src/ciudad/entities/ciudad_profesor.entity";

@Entity({name: 'profesor'})
export class Profesor {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    @IsNotEmpty()
    apellido:string;

    @OneToMany(()=>Clase,clases=>clases.profesor)
    clases:Clase[];

    @OneToMany(()=>CiudadProfesor,domicilios=>domicilios.profesor)
    domicilios:CiudadProfesor[];

    constructor(nombre:string,apellido:string){
        this.nombre = nombre;
        this.apellido = apellido;
    }

    public getId():number{
        return this.id;
    }

    public getNombre():string{
        return this.nombre;
    }

    public setNombre(nombre:string){
        this.nombre = nombre;
    }

    public getApellido():string{
        return this.apellido;
    }

    public setApellido(apellido:string){
        this.apellido = apellido;
    }
}


