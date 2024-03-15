export class player{
    firstName: string;
    lastName: string;
    position: string;
    positionFr? : string;
    years: number[];
    total : number;

    constructor(firstName: string, lastName: string, position: string, years: number[], total: number, positionFr?: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.positionFr = positionFr
        this.years = years;
        this.total = total;
    }

}