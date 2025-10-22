import { makeAutoObservable, action, runInAction } from 'mobx';
import axios from 'axios';

class FunctionalDataStore {
  keypoints: any[]= [];
  parameters: any[]= [];

  constructor() {
    makeAutoObservable(this);
  }

  // getKeypoints = action(async () => {
  //   try {
  //     const response = await axios.get('/api/user/');
  //     // console.log('Response:', response.data);
  //     runInAction(() => {
  //       this.keypoints = response.data;
  //     });
  //   } catch (error) {
  //     console.error('Ошибка загрузки прав пользователя', error);
  //   } finally {
  //   }
  // });
  updateParameters = action((data: any[]) => {
    try {
      runInAction(() => {
        this.parameters = data;
      });
    } catch (error) {
      console.error('Ошибка загрузки прав пользователя', error);
    } finally {
    }
  });
  updateKeypoints = action((data: any[]) => {
    try {
      runInAction(() => {
        this.keypoints = data;
      });
    } catch (error) {
      console.error('Ошибка загрузки прав пользователя', error);
    } finally {
    }
  });
}

export default new FunctionalDataStore();
