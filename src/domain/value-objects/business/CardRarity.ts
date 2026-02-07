export enum RarityLevel {
    COMMON = 'COMMON',
    UNCOMMON = 'UNCOMMON',
    RARE = 'RARE',
    EPIC = 'EPIC',
    LEGENDARY = 'LEGENDARY',
}

export class CardRarity {
    private static readonly DROP_RATES: Record<RarityLevel, number> = {
        [RarityLevel.COMMON]: 0, // 50%
        [RarityLevel.UNCOMMON]: 0.5, // 30%
        [RarityLevel.RARE]: 0.8, // 15%
        [RarityLevel.EPIC]: 0.95, // 4,5%
        [RarityLevel.LEGENDARY]: 0.995 //0,5%
    }

    private static readonly SALE_VALUES: Record<RarityLevel, number> = {
        [RarityLevel.COMMON]: 1,
        [RarityLevel.UNCOMMON]: 2,
        [RarityLevel.RARE]: 3,
        [RarityLevel.EPIC]: 4,
        [RarityLevel.LEGENDARY]: 5,
    }

    private constructor(
        public readonly level: RarityLevel
    ){}

    static create(level: RarityLevel): CardRarity {
        return new CardRarity(level);
    }

    static random(): CardRarity{
        const drop: number = Math.random();
        
        if(CardRarity.DROP_RATES[RarityLevel.COMMON] <= drop && drop < CardRarity.DROP_RATES[RarityLevel.UNCOMMON])     return new CardRarity(RarityLevel.COMMON);
        if(CardRarity.DROP_RATES[RarityLevel.UNCOMMON] <= drop && drop < CardRarity.DROP_RATES[RarityLevel.UNCOMMON])   return new CardRarity(RarityLevel.UNCOMMON);
        if(CardRarity.DROP_RATES[RarityLevel.RARE] <= drop && drop < CardRarity.DROP_RATES[RarityLevel.UNCOMMON])       return new CardRarity(RarityLevel.RARE);
        if(CardRarity.DROP_RATES[RarityLevel.EPIC] <= drop && drop < CardRarity.DROP_RATES[RarityLevel.UNCOMMON])       return new CardRarity(RarityLevel.EPIC);
        if(CardRarity.DROP_RATES[RarityLevel.LEGENDARY] <= drop && drop < 1)                                            return new CardRarity(RarityLevel.LEGENDARY);
        throw new Error(`Número gerado ${drop} não se encaixa nas faixas de drop`);
    }

    static fromString(level:string): CardRarity {
        const rarityStatus = level.toUpperCase() as RarityLevel;

        if(Object.values(RarityLevel).includes(rarityStatus)) return new CardRarity(rarityStatus);
        throw new Error("");
    }

    getDropRate(): number{
        return CardRarity.DROP_RATES[this.level];
    }

    getSaleValue(): number{
        return CardRarity.SALE_VALUES[this.level];
    }

    isMoreRareThan(other: CardRarity): boolean {
        return CardRarity.DROP_RATES[this.level] > CardRarity.DROP_RATES[other.level];
    }

    toString():string {
        return `${this.level}`;
    }

    toJSON() {
        return {
            level: this.level,
        };
    }
}