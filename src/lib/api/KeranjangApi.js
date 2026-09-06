import axios from "../axios";

export const keranjangCreateUpdate = async (produkVarian) => {
  return await axios.post(`/keranjang/create-update`, produkVarian);
}

export const keranjangDetil = async () => {
  return await axios.get(`/keranjang/user`);
}

export const keranjangDelete = async (id) => {
  return await axios.delete(`/keranjang/produk/${id}`);
}
