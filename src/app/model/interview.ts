export class Interview {

    constructor(value?: any) {
        this.contemplated = false;
        if (value) {
            Object.assign(this, value);
            if (!this.interviewDate) {
                this.wasSent = false;
                this.interviewDate = new Date();
            }
        } else {
            this.agentName = '';
            this.familyLeader = '';
            this.familyLeaderDocument = '';
            this.familyAddress = '';
            this.familyPhoneNumber = '';
            this.familyCelphoneNumber = '';
            this.familyNIS = null;
            this.familyIncome = null;
            this.familyMembers = null;
            this.members0To2 = "0";
            this.members2To5 = "0";
            this.members5To18 = "0";
            this.pregnant = "0";
            this.disabledPeople = "0";
            this.oldPeople = "0";
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
            this.wasSent = false;
            this.interviewDate = null;
            this.idAgent = null;
        }
    }

    wasSent: boolean;
    interviewDate: Date;
    idAgent: string;
    contemplated : boolean;
    agentName: string;

    // Identification
    familyLeader: string;
    familyLeaderDocument: string;
    familyAddress: string;
    familyPhoneNumber: string;
    familyCelphoneNumber: string;
    familyNIS: number;
    familyIncome: number;
    familyMembers: number;

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