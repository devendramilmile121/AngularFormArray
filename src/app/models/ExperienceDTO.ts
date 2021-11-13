import { AchivementDTO } from './AchivementDTO';
export class ExperienceDTO {
    id: number = 0;
    companyName: string = '';
    experienceInYears: number = 0;
    achivements: AchivementDTO[] = Array<AchivementDTO>();
}