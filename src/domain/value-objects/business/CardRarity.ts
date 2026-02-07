export enum RarityLevel {
    COMMON = 'COMMON',
    UNCOMMON = 'UNCOMMON',
    RARE = 'RARE',
    EPIC = 'EPIC',
    LEGENDARY = 'LEGENDARY',
}

export class CardRarity {
    private static readonly DROP_RATES: Record<RarityLevel, number> = {
        [RarityLevel.COMMON]: 1,
        [RarityLevel.UNCOMMON]: 2,
        [RarityLevel.RARE]: 3,
        [RarityLevel.EPIC]: 4,
        [RarityLevel.LEGENDARY]: 5,
    }

    private static readonly SALE_VALUES: Record<RarityLevel, number> = {
        [RarityLevel.COMMON]: 1,
        [RarityLevel.UNCOMMON]: 2,
        [RarityLevel.RARE]: 3,
        [RarityLevel.EPIC]: 4,
        [RarityLevel.LEGENDARY]: 5,
    }

}