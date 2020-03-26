export interface IJob {
    id?: string;
    requiredSkills: Array<string>, 
    jobPosition: string, 
    salary: number, 
    jobCategory: string, 
    degree: string, 
    englishLevel: string,
    advantages?: string,
    authorId?: string,
    authorName?: string,
    createdAt?: string;
}