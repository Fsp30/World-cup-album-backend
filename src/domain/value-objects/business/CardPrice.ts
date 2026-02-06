import { Credits } from "./Credits";

export class CardPrice {
  private constructor(
    public readonly credits: Credits
  ){
    this.validate()
  }

    validate(){
        if(this.credits.amount < 0){
            throw new Error("");
        }
    }

    static create(amount: number): CardPrice{
        const price: Credits = Credits.create(amount);

        return new CardPrice(price);
    }

    applyDiscount(percentage:number): CardPrice{
        if(percentage > 100 || percentage < 0){
            throw new Error("");
        }
        const discount = (100 - percentage)/100;
        const newCredit = Credits.create(this.credits.amount * discount);

        return new CardPrice(newCredit);
    }
    
    multiply(mult: number):CardPrice{
        if(mult <= 0){
            throw new Error("");
        }

        const newCredit = Credits.create(this.credits.amount * mult);

        return new CardPrice(newCredit);
    }

    equals(other: CardPrice):boolean{
        return this.credits === other.credits;
    }

    isGreatThan(other:CardPrice):boolean{
        return this.credits > other.credits;
    }

    format(): string{
        return `${this.credits.amount.toLocaleString('pt-BR')}`;
    }

    fromCredits(credits: Credits): CardPrice{
        return CardPrice.create(credits.amount);
    }

    toString(){
        return this.credits.toString();
    }

    toJSON(){
        return {
            price: this.credits,
            formatted: this.format()
        };
    }
}