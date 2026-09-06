import axios from "../axios";

export const produkCreate = async (produk) => {
  return await axios.post(`/produk`, produk);
}

export const getProdukListFetch = async (token2, {nama, page}) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const url = new URL(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/produk`);

  if (nama) url.searchParams.append('nama', nama);
  url.searchParams.append('with_produk_varian', 1);
  url.searchParams.append('with_produk_stok', 1);

  return await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}

export const getProdukList = async ({nama, page}) => {

  // if (nama) url.searchParams.append('nama', nama);
  // url.searchParams.append('with_produk_varian', 1);
  // url.searchParams.append('with_produk_stok', 1);
  const params = {
    'nama': nama,
    'with_produk_varian': 1,
    'with_produk_stok': 1,
  };

  return await axios.get(`/produk`, {params: params});
}

export const produkList = async (token, {nama, page}) => {
  const url = new URL(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/produk`);

  if (nama) url.searchParams.append('nama', nama);
  url.searchParams.append('with_produk_varian', 1);
  url.searchParams.append('with_produk_stok', 1);

  return await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}

export const produkDelete = async (token, id) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/produk/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}

export const produkDetil = async (id) => {
  return await axios.get(`produk/${id}`);
}

export const produkUpdate = async (produk) => {
  const image = await fetch('http://localhost:5173/vite.svg');
  const blob = await image.blob();

  const file = new File(
    [blob],
    'dummy.jpg',
    { type: blob.type }
  );
  // console.log(file);
  const formData = new FormData();
  formData.append("nama", produk.nama);
  formData.append("kd_produk", produk.kd_produk);
  formData.append("slug", produk.slug);
  formData.append("kategori_id", produk.kategori_id);
  formData.append("toko_id", produk.toko_id);
  formData.append("harga_jual", produk.harga_jual);
  formData.append("harga_beli", produk.harga_beli);
  // formData.append("brand_id", produk.brand_id);
  formData.append("deskripsi", produk.deskripsi);
  // formData.append("gambar", file);
  // formData.append("gambar", produk.gambar);
  formData.append("gambar", produk.gambar_file);
  formData.append("status_id", produk.status_id);
  // formData.append("satuan", produk.satuan);
  produk.produk_varian.forEach((varian, index) => {
    formData.append(
      `produk_varian[${index}][id]`,
      varian.id
    );
    formData.append(
      `produk_varian[${index}][produk_id]`,
      varian.produk_id
    );
    formData.append(
      `produk_varian[${index}][kd_produk_varian]`,
      varian.kd_produk_varian
    );
    formData.append(
      `produk_varian[${index}][varian]`,
      varian.varian
    );
    formData.append(
      `produk_varian[${index}][stok]`,
      varian.stok
    );
    formData.append(
      `produk_varian[${index}][harga_jual]`,
      varian.harga_jual
    );
    formData.append(
      `produk_varian[${index}][harga_beli]`,
      varian.harga_beli
    );
    formData.append(
      `produk_varian[${index}][warna]`,
      varian.warna
    );
    formData.append(
      `produk_varian[${index}][ukuran]`,
      varian.ukuran
    );
  });
  return await axios.post(`/produk/${produk.id}`, formData);
}