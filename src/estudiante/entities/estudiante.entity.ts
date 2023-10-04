import { Clase } from "src/clases/entities/clase.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EstudianteClase } from "./estudiante_clase.entity";
import { CiudadEstudiante } from "src/ciudad/entities/ciudad_estudiante.entity";

@Entity({name:'estudiante'})
export class Estudiante {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre: string;
  
    @Column()
    apellido: string;

    @Column()
    fechaNacimiento:Date;

    @OneToMany(()=>EstudianteClase,estudianteclases=>estudianteclases.estudiante)
    estudianteClases:EstudianteClase[];

    @OneToMany(()=>CiudadEstudiante,domicilios=>domicilios.ciudad)
    domicilios:CiudadEstudiante[];

    constructor(nombre:string,apellido:string,fechaNacimiento:Date){
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
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

    public getFechaNacimiento():Date{
        return this.fechaNacimiento;
    }

    public setFechaNacimiento(fechaNacimiento:Date){
        this.fechaNacimiento = fechaNacimiento;
    }
}
