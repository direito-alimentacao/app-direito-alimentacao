import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { storage_constants } from '../constants';
import { Interview } from '../model/interview';
import 'rxjs/Rx';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private storage: Storage) { }

  async getInterviews(): Promise<Interview[]> {
    return this.storage.get(storage_constants.INTERVIEWS_STORAGE_KEY).then((val: any) => {
      const items: any[] = val ? val : [];
      return items.map(
        (item: any) => {
          return new Interview(item);
        }
      )
    });
  }

  async getUser(): Promise<User> {
    return this.storage.get(storage_constants.USER_STORAGE_KEY).then((val: any) => {
      return val ? new User(val) : new User();
    });
  }

  async saveUser(user: User): Promise<any> {
    return this.storage.set(storage_constants.USER_STORAGE_KEY, user);
  }

  async saveInterviews(interviews: Interview[]): Promise<any> {
    return this.storage.set(storage_constants.INTERVIEWS_STORAGE_KEY, interviews);
  }

  async addInterview(interview: Interview): Promise<any> {
    const interviews: Interview[] = await this.getInterviews();
    interviews.push(interview);
    return this.storage.set(storage_constants.INTERVIEWS_STORAGE_KEY, interviews);
  }

}
