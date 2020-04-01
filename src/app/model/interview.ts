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

    // Identification
    familyLeader: string;
    familyLeaderDocument: string;
    familyAddress: string;
    familyPhoneNumber: string;
    familyNIS: string;
    familyIncome: number;
    familyMembers: number;

    // Risk group
    members0To2: number;
    members2To5: number;
    members5To18: number;
    pregnant: number;
    disabledPeople: number;
    oldPeople: number;

    // Assistance
    assistanceBPC: boolean;
    assistanceBF: boolean;
    assistanceDeath: boolean;
    assistanceFood: boolean;
    assistanceOthers: string;
    
    // EBIA  
    fsg1q1: boolean;
    fsg1q2: boolean;
    fsg1q3: boolean;
    fsg1q4: boolean;
    fsg2q1: boolean;
    fsg2q2: boolean;
    fsg2q3: boolean;
    fsg2q4: boolean;
    fsg3q1: boolean;
    fsg3q2: boolean;
    fsg3q3: boolean;
    fsg3q4: boolean;
    fsg3q5: boolean;
    fsg3q6: boolean;

}