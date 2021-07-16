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
}

export interface Business {
    id:        number;
    name:      string;
    street:    string;
    city:      string;
    state:     string;
    zip:       string;
    createdAt: Date;
    updatedAt: Date;
    userId:    number;
}

export interface User {
    id:        number;
    email:     string;
    firstName: string;
    lastName:  string;
    role:      string;
}

export interface Session {
    token: string;
    user?: User;
  }
  