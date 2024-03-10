export class player{
    firstName: string;
    lastName: string;
    position: string;
    years: number[];
    total : number;

    constructor(firstName: string, lastName: string, position: string, years: number[], total: number){
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.years = years;
        this.total = total;
    }

}