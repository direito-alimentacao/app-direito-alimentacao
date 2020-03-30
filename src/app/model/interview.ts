export enum STATUS {
    TO_SEND = 0,
    SENT
};

export class Interview {

    constructor() {
        this.status = STATUS.TO_SEND;
        this.createdAt = new Date();
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