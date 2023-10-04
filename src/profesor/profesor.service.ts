import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Profesor } from './entities/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProfesorService {

  constructor(
    @InjectRepository(Profesor) 
    private profesorRepository:Repository<Profesor>
  ){}


  async create(profesorDto: CreateProfesorDto):Promise<String> {
    try{
      const profesor : Profesor = await this.profesorRepository.save(new Profesor(profesorDto.nombre,profesorDto.apellido))
      if(!profesor)
        throw new Error('no se pudo crear el profesor'); 
      else
        return `Se creo profesor ${profesor.nombre}`;
    }
    catch(error){
      throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error:'Error en Profesor - ' + error
      },HttpStatus.NOT_FOUND)
    }    
  }

  async findAll():Promise<CreateProfesorDto[]> {
    return await this.profesorRepository.find()
  }

  async findOne(id: number):Promise<CreateProfesorDto> {
    try{
      const criterio : FindOneOptions = {where:{id:id}}
      let profesor : Profesor = await this.profesorRepository.findOne(criterio)
      if(!profesor)
        throw new Error('no se pudo encontrar al profesor');
      else
        return profesor ; 
    }
    catch(error){
      throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error:'Error en Profesor - ' + error
      },HttpStatus.NOT_FOUND)
    }   
  }

  async update(id: number, profesorDto: CreateProfesorDto):Promise<String> {
    try{
      const criterio : FindOneOptions = {where:{id:id}};
      let profesor : Profesor = await this.profesorRepository.findOne(criterio);

      if(!profesor){
        throw new Error('no se pudo encontrar el profesor');
      }else{
        let nombreViejo = profesor.getNombre();

        if(profesorDto.nombre != null && profesorDto.apellido != undefined)
          
          profesor.setNombre(profesorDto.nombre) ;
          profesor.setApellido(profesorDto.apellido);

          profesor = await this.profesorRepository.save(profesor);
        return `Se reemplazo: ${nombreViejo} --> ${profesorDto.nombre,profesorDto.apellido}`
      }
    }
    catch(error){
      throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error:'Error en Profesor - ' + error
      },HttpStatus.NOT_FOUND)
    }    
  }

  async remove(id: number):Promise<any> {
    try{
      const criterio : FindOneOptions = {where:{id:id}};
      let profesor : Profesor = await this.profesorRepository.findOne(criterio);
  
      if(!profesor){
        throw new Error('No se encontro clase para eliminar');
      }else{
        await this.profesorRepository.remove(profesor);
        return true;
      }  
    }catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error:'Error en Profesor - ' + error
      },HttpStatus.NOT_FOUND)
    }
  }

}
