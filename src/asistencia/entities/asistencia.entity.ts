import { EstudianteClase } from "src/estudiante/entities/estudiante_clase.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('asistencia')
export class Asistencia {

    @PrimaryColumn({name:'claseAsistenciaId'})
    claseId:number;

    @PrimaryColumn({name:'estudianteAsistenciaId'})
    estudianteId:number;

    @Column()
    fecha:Date;

    @ManyToOne(()=>EstudianteClase,estudianteClase=>estudianteClase.asistencias)
    @JoinColumn()
    estudianteClase:EstudianteClase;

    constructor(claseId:number,estudianteId:number,fecha:Date){
        this.claseId = claseId;
        this.estudianteId = estudianteId;
        this.fecha = fecha
    }

   
}
