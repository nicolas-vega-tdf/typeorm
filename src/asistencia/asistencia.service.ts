import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { EstudianteClase } from 'src/estudiante/entities/estudiante_clase.entity';
import { Clase } from 'src/clases/entities/clase.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';


@Injectable()
export class AsistenciaService {

  constructor(@InjectRepository(Asistencia)
              private readonly asistenciaRepository:Repository<Asistencia>,
              @InjectRepository(EstudianteClase)
              private readonly estudianteRepository:Repository<EstudianteClase>
  ){}

  async create(asistenciaDto: CreateAsistenciaDto):Promise<any> {
    try{
      const {estudianteId,claseId} = asistenciaDto
      const asistencia  = await this.estudianteRepository.findOne({where:{estudianteId:estudianteId,claseId:claseId}});
    //si la clase y el alumno existe 
      if(!asistencia)
        return 'no existe estudiante/clase'
      return await this.asistenciaRepository.save(new Asistencia(claseId,estudianteId,new Date()));
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en asistencia - ' + error
      },HttpStatus.NOT_FOUND)
  }  

  }

  async findAll():Promise<CreateAsistenciaDto[]> {
    return await this.asistenciaRepository.find()
  }

  async findOne(id: number):Promise<CreateAsistenciaDto> {
    try{
      const criterio : FindOneOptions = {where:{id:id}};
      const asistencia : CreateAsistenciaDto = await this.asistenciaRepository.findOne(criterio);

      if(!asistencia)
        throw new Error('no se encuentra la asistencia ')
      else 
        return asistencia
    }
    catch(error){
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en asistencia - ' + error
        },HttpStatus.NOT_FOUND)
    }  
  }

  async update(id: number, asistenciaDto: CreateAsistenciaDto):Promise<any> {
    try{
      const criterio : FindOneOptions = {where:{id:id}};
      const {estudianteId,claseId} = asistenciaDto
      let asistencia : Asistencia = await this.asistenciaRepository.findOne(criterio);
    
      if(!asistencia)
        throw new Error('no se pudo encontrar la asistencia');
      else{
        return await this.asistenciaRepository.save(new Asistencia(claseId,estudianteId,new Date()));
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en asistencia - ' + error
      },HttpStatus.NOT_FOUND)
    }  
  }

  async remove(id: number):Promise<any> {
    try{
      const criterio : FindOneOptions = {where:{id:id}};
      let asistencia : Asistencia = await this.asistenciaRepository.findOne(criterio);

      if(!asistencia)
        throw new Error('no se encontro asistencia');
      else{
          await this.asistenciaRepository.remove(asistencia);
          return{id:id,
                  message:'se elimino exitosamente'
          }
     }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en asistencia - ' + error
      },HttpStatus.NOT_FOUND)
    }  
  }
}
