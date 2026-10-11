import axios from "../axios";
const pathRsc = '/status-jual';

export const getStatusJualList = async (jual = {}) => {
  return await axios.get(pathRsc, {params: jual});
}