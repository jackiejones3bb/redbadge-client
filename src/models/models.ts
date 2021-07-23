export interface Customer {
    id:        number;
    street:    string;
    city:      string;
    state:     string;
    zip:       string;
    phone:     string;
    createdAt: Date;
    updatedAt: Date;
    userId:    number;
    user?: User;
    businesses?: Business[]
}

export interface Business {
    id:        number;
    name:      string;
    street:    string;
    city:      string;
    state:     string;
    zip:       string;
    userId:    number;
    loyalty_program?: LoyaltyProgram;
    memberships?: Membership;
}

export interface User {
    id:        number;
    email:     string;
    firstName: string;
    lastName:  string;
    role:      string;
    businessId?: number; 
    customerId?: number;
}

export interface Session {
    token: string;
    user?: User;
  }
  
  export const rewardTypes = [
    {
      value: 1,
      label: '$ Off',
    },
    {
      value: 2,
      label: '% Off',
    },
    {
      value: 3,
      label: 'Free Product',
    },
   
  ];



export interface LoyaltyProgram {
    id:           number;
    name:         string;
    numOfPunches: number;
    rewardType:   number;
    rewardAmount: null;
    createdAt:    Date;
    updatedAt:    Date;
    businessId:   number;
}

export interface Membership {
    id: number;
    customerId: number;
    businessId: number;
    numPunches: number;
}

