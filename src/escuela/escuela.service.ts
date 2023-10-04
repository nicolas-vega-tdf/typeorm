import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { UpdateEscuelaDto } from './dto/update-escuela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Escuela } from './entities/escuela.entity';

@Injectable()
export class EscuelaService {

  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository:Repository<Estudiante>,
    @InjectRepository(Escuela)
    private escuelaRepository:Repository<Escuela>
    ){}



    // async createEstudiante(estudianteDto: Estudiante):Promise<boolean>{
    //   let estudiante:Estudiante ;
      
    //   if(estudiante)
    //     return true;
    //   else
    //     return false;
    // }


    async create(escuelaDto: CreateEscuelaDto):Promise<String> {
      try{
        const escuela : Escuela = await this.escuelaRepository.save(new Escuela(escuelaDto.nombre,escuelaDto.domicilio))
        if(!escuela)
          throw new Error('no se encontro la escuela');
        else
          return `Se creo escuela ${escuela.nombre} en ${escuela.domicilio}`
      }
      catch(error){
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Escuela - ' + error
        },HttpStatus.NOT_FOUND)
      }   
    }



 
    async findAll():Promise<CreateEscuelaDto[]> {
     return await this.escuelaRepository.find()
    }

    async findOne(id: number):Promise<CreateEscuelaDto> {
      try{
        const criterio : FindOneOptions = {where:{id:id}}
        let escuela : Escuela = await this.escuelaRepository.findOne(criterio)
      
        if(!escuela)
          throw new Error('no se encotro la escuela');
        else
          return escuela ;
      }
      catch(error){
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Escuela - ' + error
        },HttpStatus.NOT_FOUND)
      }  
    }

    async update(id: number, escuelaDto: CreateEscuelaDto):Promise<String> {
      try{
        const criterio : FindOneOptions = {where:{id:id}};
        let escuela : Escuela = await this.escuelaRepository.findOne(criterio);
      

        if(!escuela){
          throw new Error('no se puedo encontrar la escuela');
        }else{
        let nombreViejo = escuela.getNombre();
        if(escuela.nombre !=null && escuela.domicilio!= undefined)
          escuela.setNombre(escuelaDto.nombre) ;
          escuela.setDomicilio(escuelaDto.domicilio); 
          escuela = await this.estudianteRepository.save(escuela);
        return `Se reemplazo: ${nombreViejo} --> ${escuela.getNombre(),escuela.getDomicilio()}`
        }
      }
      catch(error){
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Escuela - ' + error
        },HttpStatus.NOT_FOUND)
      }  
    }

    async remove(id: number):Promise<any> {
      try{
        const criterio : FindOneOptions = {where:{id:id}};
        let escuela : Escuela = await this.escuelaRepository.findOne(criterio);

       if(!escuela){
        throw new Error('No se encontro estudiante para eliminar');
        }else{
        await this.escuelaRepository.remove(escuela);
        return { id:id,
                 message:'se elimino exitosamente'
               }
      }  
      }catch(error){
      throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error:'Problemas en Escuela - ' + error
      },HttpStatus.NOT_FOUND)
    }
  }

}
