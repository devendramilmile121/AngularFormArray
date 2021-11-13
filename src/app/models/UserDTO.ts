import { ExperienceDTO } from './ExperienceDTO';
export class UserDTO {
    id: number = 0;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    totalExperience?: number = 0;
    experienceHistory: ExperienceDTO[] = Array<ExperienceDTO>();
}