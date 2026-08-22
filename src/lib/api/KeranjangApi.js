const token = localStorage.getItem("token");
export const keranjangAddUpdate = async (produkVarian) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/keranjang/add-update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(produkVarian)
  })
}
export const keranjangAdd = async (produkVarian) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/keranjang`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(produkVarian)
  })
}

export const keranjangList = async (token, {nama, page}) => {
  const url = new URL(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/keranjang`);

  if (nama) url.searchParams.append('nama', nama);
  url.searchParams.append('with_keranjang_varian', 1);
  url.searchParams.append('with_keranjang_stok', 1);

  return await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}

export const keranjangDelete = async (token, id) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/keranjang/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}

export const keranjangDetil = async () => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/keranjang/user`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}

export const keranjangUpdate = async (token, keranjang) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/keranjang/${keranjang.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(keranjang)
  })
}