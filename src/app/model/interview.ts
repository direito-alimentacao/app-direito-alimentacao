export enum STATUS {
    TO_SEND = 0,
    SENT
};

export class Interview {

    constructor(value: any, isNew: boolean) {
        Object.assign(this, value);

        if (isNew) {
            this.status = STATUS.TO_SEND;
            this.createdAt = new Date();
        }
    }

    public hasSent(): boolean {
        return this.status == STATUS.SENT;
    }

    status: STATUS;
    createdAt: Date;
    agentName: string;

    familyLeader: string;
    familyAddress: string;
    familyPhoneNumber: string;
    familyNIS: string;
    familyIncome: number;
    familyMembers: number;

    riskGroup: boolean;
    children0To2: boolean;
    children2To5: boolean;
    pregnant: boolean;
    disabledPeople: boolean;
    oldPeople: boolean;
}