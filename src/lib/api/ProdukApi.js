export const produkCreate = async (token, produk) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/produk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(produk)
  })
}

export const getProdukList = async (token2, {nama, page}) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const url = new URL(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/produk`);

  if (nama) url.searchParams.append('nama', nama);
  url.searchParams.append('with_produk_varian', 1);
  url.searchParams.append('with_produk_stok', 1);

  console.log('a12');
  // console.log(token2);
  console.log(token);
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      // 'Authorization': token2
      'Authorization': token
    }
  })
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
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/produk/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}

export const produkUpdate = async (token, produk) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/produk/${produk.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(produk)
  })
}