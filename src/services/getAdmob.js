import axios from 'axios';
import {link_admob} from '../config/config';

export const getAdmobData = async () => {
  try {
    let data = await axios.get(link_admob);
    return data.data;
  } catch (error) {
    return null;
  }
};
