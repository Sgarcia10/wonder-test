import * as math from 'mathjs'


class Antenas {
  antena1 = [-25, -10]
  antena2 = [5, -5]
  antena3 = [25, 5]

  getLocation(d1: number, d2: number, d3: number) {

    console.log({d1, d2, d3});
    

    const b = [
      (Math.pow(d1,2) - Math.pow(d2,2)) + (Math.pow(this.antena2[0],2) + Math.pow(this.antena2[1],2) - Math.pow(this.antena1[0],2) - Math.pow(this.antena1[1],2)),
      (Math.pow(d1,2) - Math.pow(d3,2)) + (Math.pow(this.antena3[0],2) + Math.pow(this.antena3[1],2) - Math.pow(this.antena1[0],2) - Math.pow(this.antena1[1],2))
    ]
  
    const U = [
      [2*(this.antena2[0]-this.antena1[0]), 2*(this.antena2[1]-this.antena1[1])],
      [2*(this.antena3[0]-this.antena1[0]), 2*(this.antena3[1]-this.antena1[1])]
    ]

    console.log({b, U});
    

    const res = math.lusolve(U, b)

    return [res[0][0], res[1][0]]
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

const antenas = new Antenas()
const distances = [10.1, 15.6, 12.9]

//this.appService.getLocation.apply(this, distances)

console.log(antenas.getLocation.apply(antenas, distances));
const m1 = ['', 'tengo', '', 'y', 'hambre']
const m2 = ['ayuda', '', 'frío', 'y', '']
const m3 = ['ayuda', '', '', '', 'hambre']
console.log(antenas.getMessage(m1, m2, m3));

