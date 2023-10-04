import { Body, Controller , Delete, Get, Param, Post, Put} from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDTO } from './dto/ciudad.dto';

@Controller('ciudad')
export class CiudadController {

    constructor(private readonly ciudadService: CiudadService){}

    @Get('raw')
    async getAllRaw():Promise<CiudadDTO[]>{
        return this.ciudadService.findAllRaw();
    }

    @Get('orm')
    async getAllOrm():Promise<Ciudad[]>{
        return await this.ciudadService.findAllOrm()
    }

    @Get(':id')//los dos puntos significa que puede haber cualquier cosa
    async getId(@Param('id')id:number) : Promise<CiudadDTO>{
        return await this.ciudadService.findById(id);
    }

    @Post('crear')
    async crearCiudad(@Body() ciudadDTO:CiudadDTO):Promise<CiudadDTO>{
        return this.ciudadService.create(ciudadDTO);
    }

    @Put('actualizar/:id')
    async actualizarCiudad(@Body() ciudadDTO:CiudadDTO, @Param('id') id:number):Promise<String>{
        return this.ciudadService.update(ciudadDTO,id);
    }

    @Delete('eliminar/:id')
    async eliminarCiudad(@Param('id')id:number) : Promise<CiudadDTO>{
        return await this.ciudadService.delete(id);
    }    

}
