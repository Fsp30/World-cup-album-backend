export enum TradeStatusType {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export class TradeStatus {
  private constructor(
    public readonly status: TradeStatusType,
    public readonly updatedAt: Date
  ) {}

  static createPending(): TradeStatus {
    return new TradeStatus(TradeStatusType.PENDING, new Date());
  }

  static createAccepted(): TradeStatus {
    return new TradeStatus(TradeStatusType.ACCEPTED, new Date());
  }

  static createRejected(): TradeStatus {
    return new TradeStatus(TradeStatusType.REJECTED, new Date());
  }

  static createCancelled(): TradeStatus {
    return new TradeStatus(TradeStatusType.CANCELLED, new Date());
  }

  static createExpired(): TradeStatus {
    return new TradeStatus(TradeStatusType.EXPIRED, new Date());
  }

  fromString(status: string): TradeStatus {
    const statusType = status.toUpperCase() as TradeStatusType;

    if (!Object.values(TradeStatusType).includes(statusType)) {
      throw new Error(`Status da troca inválido: ${status}`);
    }

    return new TradeStatus(statusType, new Date());
  }

  isPending(): boolean {
    return this.status === TradeStatusType.PENDING;
  }

  isAccepted(): boolean {
    return this.status === TradeStatusType.ACCEPTED;
  }

  isRejected(): boolean {
    return this.status === TradeStatusType.REJECTED;
  }

  isCancelled(): boolean {
    return this.status === TradeStatusType.CANCELLED;
  }

  isExpired(): boolean {
    return this.status === TradeStatusType.EXPIRED;
  }

  isFinalized(): boolean {
    return (
      this.isAccepted() ||
      this.isCancelled() ||
      this.isRejected() ||
      this.isExpired()
    );
  }

  canBeModified(): boolean {
    return this.isPending();
  }

  equals(other: TradeStatus): boolean {
    return this.status === other.status;
  }

  toString(): string {
    return this.status;
  }

  toJSON() {
    return {
      status: this.status,
      isPending: this.isPending(),
      isFinalized: this.isFinalized(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
