import { makeAutoObservable, action, runInAction } from 'mobx';
import axios from 'axios';

class KeypointsStore {
  keypoints = [];

  constructor(parameters) {
    makeAutoObservable(this);
  }

  getKeypoints = action(async () => {
    try {
      const response = await axios.get('/api/user/');
      // console.log('Response:', response.data);
      runInAction(() => {
        this.keypoints = response.data;
      });
    } catch (error) {
      console.error('Ошибка загрузки прав пользователя', error);
    } finally {
    }
  });
}

export default new KeypointsStore();
