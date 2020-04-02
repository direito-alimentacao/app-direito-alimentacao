export enum STATUS {
    TO_SEND = 0,
    SENT = 1
};

export class Interview {

    constructor(value?: any) {
        if (value) {
            Object.assign(this, value);
            if (!this.createdAt) {
                this.status = STATUS.TO_SEND;
                this.createdAt = new Date();
            }
        } else {
            this.familyLeader = '';
            this.familyLeaderDocument = '';
            this.familyAddress = '';
            this.familyPhoneNumber = '';
            this.familyCelphoneNumber = '';
            this.familyNIS = '';
            this.familyIncome = '';
            this.familyMembers = '';
            this.members0To2 = '';
            this.members2To5 = '';
            this.members5To18 = '';
            this.pregnant = '';
            this.disabledPeople = '';
            this.oldPeople = '';
            this.assistanceBPC = false;
            this.assistanceBF = false;
            this.assistanceDeath = false;
            this.assistanceFood = false;
            this.assistanceOthers = '';
            this.fsg1q1 = false;
            this.fsg1q2 = false;
            this.fsg1q3 = false;
            this.fsg1q4 = false;
            this.fsg2q1 = false;
            this.fsg2q2 = false;
            this.fsg2q3 = false;
            this.fsg2q4 = false;
            this.fsg3q1 = false;
            this.fsg3q2 = false;
            this.fsg3q3 = false;
            this.fsg3q4 = false;
            this.fsg3q5 = false;
            this.fsg3q6 = false;

            this.status = STATUS.TO_SEND;
            this.createdAt = null;
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
    familyCelphoneNumber: string;
    familyNIS: string;
    familyIncome: string;
    familyMembers: string;

    // Risk group
    members0To2: string;
    members2To5: string;
    members5To18: string;
    pregnant: string;
    disabledPeople: string;
    oldPeople: string;

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