import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserDTO } from './models/UserDTO';
import { ExperienceDTO } from './models/ExperienceDTO';
import { AchivementDTO } from './models/AchivementDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'FormArray Boiler Plate';
  userDetailsForm: FormGroup = new FormGroup({});
  userId: number = 1;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initilizeForm();
    if (this.userId) {
      this.getUserDetails();
    }
  }

  getUserDetails() {
    const user = new UserDTO();
    user.firstName = 'Matthew';
    user.lastName = 'Cardenas';
    user.email = 'MatthewDCardenas@armyspy.com';
    user.totalExperience = 6;

    const achivement1 = [
      {
        id: 1,
        achivementName: 'The Star Employee',
      },
      {
        id: 2,
        achivementName: 'Best Customer Centricity',
      },
    ];

    const achivement2 = [
      {
        id: 4,
        achivementName: 'Stand out Performer',
      },
    ];

    user.experienceHistory = [
      {
        id: 1,
        companyName: 'SumatoSoft',
        experienceInYears: 4,
        achivements: achivement1,
      },
      {
        id: 2,
        companyName: 'Google Inc',
        experienceInYears: 2,
        achivements: achivement2,
      },
    ];
    this.initilizeForm(user);
  }

  initilizeForm(user?: UserDTO) {
    this.userDetailsForm = this.formBuilder.group({
      id: [user?.id],
      firstName: [user?.firstName],
      lastName: [user?.lastName],
      email: [user?.email, [Validators.email]],
      totalExperience: [user?.totalExperience],
      experienceHistory: this.formBuilder.array([]),
    });

    user?.experienceHistory?.map((exp) => {
      this.addExperience(exp);
    });
  }

  get userForm() {
    return this.userDetailsForm;
  }

  addExperience(experience?: ExperienceDTO) {
    const exp = this.getExperienceFormArray();
    exp.push(
      this.formBuilder.group({
        id: [experience?.id],
        companyName: [experience?.companyName],
        experienceInYears: [experience?.experienceInYears],
        achivements: this.formBuilder.array([]),
      })
    );

    const index = exp.length - 1;
    experience?.achivements?.map((achivement) => {
      this.addAchivement(index, achivement);
    });
  }

  addAchivement(indexExp: number, achivement?: AchivementDTO) {
    const ach = this.getAchivementFormArray(indexExp);
    ach.push(
      this.formBuilder.group({
        id: [achivement?.id],
        achivementName: [achivement?.achivementName],
      })
    );
  }

  getExperienceFormArray() {
    const exp = <FormArray>this.userDetailsForm.get('experienceHistory');
    return exp;
  }

  getAchivementFormArray(indexExp: number) {
    const exp = this.getExperienceFormArray();
    const expAtIndex = exp.at(indexExp);
    const ach = <FormArray>expAtIndex.get('achivements');
    return ach;
  }

  removeExperience(index: number) {
    const exper = this.getExperienceFormArray();
    exper.removeAt(index);
  }

  removeAchivement(indexExp: number, indexAch: number) {
    const achiv = this.getAchivementFormArray(indexExp);
    achiv.removeAt(indexAch);
  }

  onSubmit() {
    console.log('Form Value 👉', this.userDetailsForm.value);
  }
}
