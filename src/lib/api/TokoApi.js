export const tokoList = async () => {
  const url = new URL(`${import.meta.env.VITE_API_PATH}/toko`);

  // if (nama) url.searchParams.append('nama', nama);
  // url.searchParams.append('with_produk_varian', 1);
  // url.searchParams.append('with_produk_stok', 1);

  return await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
}
