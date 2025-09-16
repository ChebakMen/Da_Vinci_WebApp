import { makeAutoObservable, action, runInAction } from 'mobx';
import axios from 'axios';

class UserStore {
  constructor(parameters) {
    makeAutoObservable(this);
  }
}

export default new UserStore();
