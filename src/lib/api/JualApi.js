export const jualCreate = async (token, jual) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/jual`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(jual)
  })
}

export const jualList = async (token, {nama, page}) => {
  const url = new URL(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/jual`);

  if (nama) url.searchParams.append('nama', nama);
  // url.searchParams.append('with_jual_varian', 1);
  // url.searchParams.append('with_jual_stok', 1);

  return await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}

export const jualDelete = async (token, id) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/jual/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}

export const jualDetil = async (token, id) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/jual/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': token
    }
  })
}

export const jualUpdate = async (token, jual) => {
  return await fetch(`${import.meta.env.VITE_API_ECOMMERCE_PATH}/jual/${jual.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(jual)
  })
}