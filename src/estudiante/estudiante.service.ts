import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Clase } from 'src/clases/entities/clase.entity';
import { EstudianteClase } from './entities/estudiante_clase.entity';

@Injectable()
export class EstudianteService {

  constructor(@InjectRepository(Estudiante)
              private estudianteRepository:Repository<Estudiante>,
              @InjectRepository(Clase)
              private claseRepository:Repository<Clase>,
              @InjectRepository(EstudianteClase)
              private estudianteClaseRepository:Repository<EstudianteClase>)
  {}        


  async create(estudianteDto: EstudianteDto):Promise<String> {
    try{
      const estudiante : Estudiante = await this.estudianteRepository.save(new Estudiante(estudianteDto.nombre,estudianteDto.apellido,estudianteDto.fechaNacimiento))
      if(!estudiante)
       throw new Error('no se encontro el estudiante');
      else
        return `Se creo estudiante ${estudiante.nombre}`
    }
    catch(error){
      throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error:'Error en Estudiante - ' + error
      },HttpStatus.NOT_FOUND)
    }  
  }

  async addClase(body):Promise<any>{
    try{
      const {claseId,estudianteId} = body;
      const estudiante = await this.estudianteRepository.findOne({where:{id:estudianteId}})

      if(!estudiante)
        return `error - no se encontre el estudiante con id ${estudianteId}`;
      const clase = await this.claseRepository.findOne({where:{id:claseId}})
      if(!clase)
        return 'error - no se encontro esa clase';
      const clase_estudiante = await this.estudianteClaseRepository.findOne({where:{claseId:claseId,estudianteId:estudianteId}})
      if(clase_estudiante)
        return 'error - el estudiante ya tiene asignada esa clase';
      return await this.estudianteClaseRepository.save(new EstudianteClase(estudianteId,claseId));
    }
    catch(error){
      throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error:'Error en Estudiante - ' + error
      },HttpStatus.NOT_FOUND)
    }  
  }

  async findAll():Promise<EstudianteDto[]> {
   return await this.estudianteRepository.find()
  }

  async findOne(id: number):Promise<EstudianteDto> {
    try{
      const criterio : FindOneOptions = {where:{id:id}}
      let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);
      if(!estudiante)
        throw new Error('no se encontro el estudiante');
      else
        return estudiante ;
    }
    catch(error){
      throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error:'Error en Estudiante - ' + error
      },HttpStatus.NOT_FOUND)
    }     
  }

  async update(id: number, estudianteDto: EstudianteDto):Promise<String> {
    try{
      const criterio : FindOneOptions = {where:{id:id}};
      let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);
    
      if(!estudiante){
        throw new Error('no se pudo encontrar el estudiante para actualizar')
      }
      else{
        let nombreViejo = estudiante.getNombre();
        if(estudianteDto.nombre != undefined && estudianteDto.apellido != undefined && estudianteDto.fechaNacimiento != null)
          
          estudiante.setNombre(estudianteDto.nombre) ;
          estudiante.setApellido(estudianteDto.apellido); 
          estudiante.setFechaNacimiento(estudianteDto.fechaNacimiento) 

          estudiante = await this.estudianteRepository.save(estudiante);
        return `Se reemplazo: ${nombreViejo} --> ${estudiante.getNombre(),estudiante.getApellido(),estudiante.getFechaNacimiento()}`
      }
    }  
    catch(error){
      throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error:'Error en Estudiante - ' + error
      },HttpStatus.NOT_FOUND)
    }  
  }

  async remove(id: number):Promise<any> {
    try{
      const criterio : FindOneOptions = {where:{id:id}};
      let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);
  
      if(!estudiante){
        throw new Error('No se encontro estudiante para eliminar');
      }else{
        await this.estudianteRepository.remove(estudiante);
        return { id:id,
                 message:'se elimino exitosamente'
               }
      }  
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error:'Problemas en Estudiantes - ' + error
      },HttpStatus.NOT_FOUND)
    }
  }
}
