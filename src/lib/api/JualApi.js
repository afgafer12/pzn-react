import axios from "../axios";
const pathRsc = '/jual';

export const jualCreate = async (jual) => {
  return await axios.post(`/jual`, jual);
}

export const getJualList = async (jual = {}) => {
  return await axios.get(pathRsc, {params: jual});
}

export const jualDelete = async (id) => {
  return await axios.delete(pathRsc+`/${id}`);
}

export const jualDetil = async (id) => {
  return await axios.get(pathRsc+`/${id}`);
}

export const jualUpdate = async (id, jual) => {
  const response = await axios.put(pathRsc+`/${id}`, jual);
  return response.data;
}