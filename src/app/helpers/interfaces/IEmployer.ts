export interface IEmployer {
    eid?: string;
    name: string;
    email: string;
    phone: string;
    logo: string;
    moreInfo: string;
    role?: string;
    applicationsSubmitted?: Array<Object>
    jobsPositions?: Array<Object>
}