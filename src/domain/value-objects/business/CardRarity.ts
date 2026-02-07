export enum RarityLevel {
    COMMON = 'COMMON',
    UNCOMMON = 'UNCOMMON',
    RARE = 'RARE',
    EPIC = 'EPIC',
    LEGENDARY = 'LEGENDARY',
}

export class CardRarity {
    private static readonly DROP_RATES: Record<RarityLevel, number> = {
        [RarityLevel.COMMON]:
        [RarityLevel.UNCOMMON]:
        [RarityLevel.RARE]:
        [RarityLevel.EPIC]:
        [RarityLevel.LEGENDARY]:
    }

}