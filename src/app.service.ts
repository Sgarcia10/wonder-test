import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as math from 'mathjs'
import { Antena } from './models/antenaDto';


@Injectable()
export class AppService {

  antena1 = [-25, -10]
  antena2 = [5, -5]
  antena3 = [25, 5]

  infoAntena1: Antena = null
  infoAntena2: Antena = null
  infoAntena3: Antena = null

  constructor() {}


  //Algorith based on paper:
  //Indoor Positioning System by using Triangulation Algorithm
  //Ebru Alp, Tamer Dag, Taner Arsan
  getLocation(d1: number, d2: number, d3: number) {

    const b = [
      (Math.pow(d1,2) - Math.pow(d2,2)) + (Math.pow(this.antena2[0],2) + Math.pow(this.antena2[1],2) - Math.pow(this.antena1[0],2) - Math.pow(this.antena1[1],2)),
      (Math.pow(d1,2) - Math.pow(d3,2)) + (Math.pow(this.antena3[0],2) + Math.pow(this.antena3[1],2) - Math.pow(this.antena1[0],2) - Math.pow(this.antena1[1],2))
    ]
  
    const U = [
      [2*(this.antena2[0]-this.antena1[0]), 2*(this.antena2[1]-this.antena1[1])],
      [2*(this.antena3[0]-this.antena1[0]), 2*(this.antena3[1]-this.antena1[1])]
    ]

    const res = math.lusolve(U, b)

    return [res[0][0], res[1][0]]
  }


  getLocationByParts() {
    if(this.infoAntena1 && this.infoAntena2 && this.infoAntena3) {
      return this.getLocation(this.infoAntena1.distance, this.infoAntena2.distance, this.infoAntena3.distance)
    } else {
      throw new HttpException('No hay suficientes antenas definidas', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  createLocationByParts(antena: Antena) {
    switch (antena.name) {
      case 'wonderfulAntena1':
        this.infoAntena1 = antena
        break;
      case 'wonderfulAntena2':
        this.infoAntena2 = antena
        break;
      case 'wonderfulAntena3':
        this.infoAntena3 = antena
        break;
      default:
        break;
    }
  }

  getMessage(m1: string[], m2: string[], m3: string[]) {
    const messageArr = []
    for (let i = 0; i < m1.length; i++) {
      const m = m1[i] || m2[i] || m3[i];
      messageArr.push(m)
    }

    return messageArr.join(' ')
  }
}
