import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Antena } from './models/antenaDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('localizacion')
  location(@Body() body: {antenas: Antena[]}): {} {
    if(!body || !Array.isArray(body.antenas) || body.antenas.length<3) {
      throw new HttpException('Antenas invalidas', HttpStatus.BAD_REQUEST)
    }
    const d1 = body.antenas.find(a => a.name === 'wonderfulAntena1').distance
    const d2 = body.antenas.find(a => a.name === 'wonderfulAntena2').distance
    const d3 = body.antenas.find(a => a.name === 'wonderfulAntena3').distance
    const messages = body.antenas.map(a => a.message)
    try {
      const position = this.appService.getLocation(d1, d2, d3);
      const message = this.appService.getMessage(messages[0], messages[1], messages[2])
      const res = {position, message}
      return res
    } catch (error) {
      throw new HttpException('La posición de JP no puede ser calculada', HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }

  @Post('/localizacion_por_partes/:nombre_antena')
  createLocationByParts(@Param('nombre_antena') name: string, @Body() antena: Partial<Antena>): void {
    return this.appService.createLocationByParts({distance: antena.distance, message: antena.message, name})
  }

  @Get('/localizacion_por_partes/')
  getLocationByParts(): {} {
    return this.appService.getLocationByParts();
  }
}
