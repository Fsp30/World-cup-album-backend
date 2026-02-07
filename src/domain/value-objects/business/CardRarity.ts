export enum RarityLevel {
    COMMON = 'COMMON',
    UNCOMMON = 'UNCOMMON',
    RARE = 'RARE',
    EPIC = 'EPIC',
    LEGENDARY = 'LEGENDARY',
}

export class CardRarity {
    private static readonly DROP_RATES: Record<RarityLevel, number> = {
        [RarityLevel.COMMON]: 50, // 50%
        [RarityLevel.UNCOMMON]: 30, // 30%
        [RarityLevel.RARE]: 15, // 15%
        [RarityLevel.EPIC]: 4 ,// 4%
        [RarityLevel.LEGENDARY]: 1, //1%
    }

    private static readonly SALE_VALUES: Record<RarityLevel, number> = {
        [RarityLevel.COMMON]: 10,
        [RarityLevel.UNCOMMON]: 50,
        [RarityLevel.RARE]: 500,
        [RarityLevel.EPIC]: 800,
        [RarityLevel.LEGENDARY]: 5000,
    }

    private constructor(
        public readonly level: RarityLevel
    ){}

    static create(level: RarityLevel): CardRarity {
        return new CardRarity(level);
    }

    static random(): CardRarity{
        const drop: number = Math.random() * 100;

        const common = CardRarity.DROP_RATES[RarityLevel.COMMON];
        const uncommon = common + CardRarity.DROP_RATES[RarityLevel.UNCOMMON];
        const rare = uncommon + CardRarity.DROP_RATES[RarityLevel.RARE];
        const epic = rare + CardRarity.DROP_RATES[RarityLevel.EPIC];
        const legendary = epic + CardRarity.DROP_RATES[RarityLevel.LEGENDARY];
        if(legendary != 100) throw new Error("faixas de drop não completam 100%");
        
        if(drop <= common)                      return new CardRarity(RarityLevel.COMMON);
        if(common < drop && drop <= uncommon)   return new CardRarity(RarityLevel.UNCOMMON);
        if(uncommon < drop && drop <= rare)     return new CardRarity(RarityLevel.RARE);
        if(rare < drop && drop <= epic)         return new CardRarity(RarityLevel.EPIC);
        if(epic < drop && drop <= legendary)    return new CardRarity(RarityLevel.LEGENDARY);

        throw new Error(`Número gerado ${drop} não se encaixa nas faixas de drop`);
    }

    static fromString(level:string): CardRarity {
        const rarityStatus = level.toUpperCase() as RarityLevel;

        if(Object.values(RarityLevel).includes(rarityStatus)) return new CardRarity(rarityStatus);
        throw new Error(`Raridade inválida: ${level}`);
    }

    getDropRate(): number{
        return CardRarity.DROP_RATES[this.level];
    }

    getSaleValue(): number{
        return CardRarity.SALE_VALUES[this.level];
    }

    isMoreRareThan(other: CardRarity): boolean {
        return this.getDropRate() < other.getDropRate();
    }

    equals(other: CardRarity): boolean{
        return this.level === other.level;
    }

    toString():string {
        return `${this.level}`;
    }

    toJSON() {
        return {
            level: this.level,
            dropRate: this.getDropRate(),
            saleValue: this.getSaleValue(),
        };
    }
}