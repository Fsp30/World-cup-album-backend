export class PlayerStats {
    private constructor(
        public readonly overall: number,
        public readonly pace: number,
        public readonly shooting: number,
        public readonly passing: number,
        public readonly dribbling: number,
        public readonly defending: number,
        public readonly physical: number
    ) {
        this.validate();
    }

    private validate() {
        for(const stat of Object.values(this)) {
            if(stat < 1 || stat > 99) {
                throw new Error('Estatísticas devem estar entre 1 e 99');
            }

            if(!Number.isInteger(stat)) {
                throw new Error('Estatísticas devem ser números inteiros');
            }
        }
    }
}