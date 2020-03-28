export interface IUser {
    uid?: string;
    username?: string;
    email?: string;
    gender: string;
    phone: string;
    profilePicture: string;
    role?: string;
    profession: string;
    experience: string;
    availability: string;
    preferedWayOfCommunication?: string;
    englishLevel: string;
    totalProjects: number;
    projectsLink: string;
    moreInfo: string;
    techSkills?: Object;
    applications?: Array<string>;
    applicationsId?: Array<string>;
}