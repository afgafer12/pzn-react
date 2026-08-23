export const produkVarianCreate = async (token, produkVarian) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/produk-varian`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(produkVarian)
  })
}

export const produkVarianList = async ({nama, page} = {}) => {
  const url = new URL(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/produk-varian`);

  // if (nama) url.searchParams.append('nama', nama);
  // url.searchParams.append('with_produkVarian_varian', 1);
  // url.searchParams.append('with_produkVarian_stok', 1);

  return await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}

export const produkVarianDelete = async (token, id) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/produk-varian/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}

export const produkVarianDetil = async (token, id) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/produk-varian/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}

export const produkVarianUpdate = async (token, produkVarian) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/produk-varian/${produkVarian.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(produkVarian)
  })
}