import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {useEffectOnce, useLocalStorage} from "react-use";
import {alertError, alertSuccess} from "../../lib/alert.js";
import { produkCreate, produkDetil, produkUpdate } from "../../lib/api/ProdukApi.js";
import { Card } from "react-bootstrap";
import Input from "../Shared/Input/index.jsx";
import TokoSelect from "../Shared/TokoSelect/TokoSelect.jsx";
import lbl from '../../util/LabelConfigs2.js';
import { keranjangCreateUpdate } from "../../lib/api/KeranjangApi.js";

export default function ProdukDetilSelected(props) {
  const navigate = useNavigate();
  const entitas = 'Produk';
  const { id: urlId } = useParams();
  const id = props.id ?? urlId;
  const [produk, setProduk] = useState({
    // "id" : null,
    "nama" : "",
    "slug" : "",
    "harga_jual" : "",
    "harga_beli" : "",
    "kategori_id" : "",
    "toko_id" : "",
    "brand_id" : "",
    "deskripsi" : "",
    "image" : "",
    "status" : "",
    "satuan" : "",
    "produk_varian" : []
  });
  const [statusList, setStatusList] = useState([]);
  const [keranjang, setKeranjang] = useState({
    "user_id": null,
    "status_id": null,
    "keranjang_produk": []
  });
  const [produkKeranjang, setProdukKeranjang] = useState({
    "produk_varian_id": null,
    // "jumlah": null,
    "jumlah": 0,
  })

  const handleChangeProdukKeranjang = (e) => {
    setProdukKeranjang({
      ...produkKeranjang,
      [e.target.name]: Number(e.target.value)
    });
  };
  const handleChange = (e) => {
    setProduk({
      ...produk,
      [e.target.name]: e.target.value
    });
  };

  const handleProdukVariant = (index, e) => {
    setProduk((prev) => ({
      ...produk,
      produk_varian: prev?.produk_varian?.map((variant, i) =>
        i === index
          ? {
            ...variant,
            [e.target.name]: e.target.value
          }
          : variant
      ),
    }));
  };

  async function fetchProdukDetil() {
    produkDetil(id).then((resp) => {
      setProduk(resp.data);
    }).catch((err) => {
      console.log(err);
      const msg = err.response?.data?.message ?? err; 
      alertError(msg);
    });
  }

  async function create() {
    keranjang.keranjang_produk.push(produkKeranjang)
    try{
    const response = await keranjangCreateUpdate(keranjang);
    if (response.status === 200) {
      const responseBody = response.data;
      keranjang.keranjang_produk = [];
      await alertSuccess(`${entitas} ${lbl.add.success}`);
      // await navigate({
      //   pathname: `/keranjang/form`
      // });
    }
    }catch(error){
      console.log(error);
      keranjang.keranjang_produk = [];
      const msg = error.response?.data?.message ?? error; 
      await alertError(msg);
    }

  }
  async function handleSubmit(e) {
    e.preventDefault();
    create();
  }

  const handleAddProdukVarian = () => {
    if(!produk?.produk_varian){
      setProduk({...produk, produk_varian: [{
        "id": null, "produk_id": "", "kd_produk": "", 
        "stok": "", "harga_jual": "", "harga_beli": "", "warna": "", "ukuran": "",
      }]});
    }else{
      setProduk({...produk, produk_varian: [...produk?.produk_varian, {
        "id": null, "produk_id": "", "kd_produk": "", 
        "stok": "", "harga_jual": "", "harga_beli": "", "warna": "", "ukuran": "",
      }]})
    }
  }

  useEffectOnce(() => {
    const statusList = [
      {id: 1, nama: 'Aktif'},
      {id: 0, nama: 'Non aktif'},
    ];
    setStatusList(statusList);
    let idVar = props?.id ?? id;
    if(idVar){
      fetchProdukDetil();
    }else{
      handleAddProdukVarian();
    }
  })

  return <>
    <Card>
      <Card.Body>
        <Card.Title>Produk</Card.Title>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {produk.gambar && <div className="col-auto">
              <div className="card">
                <div className="card-body">
                  <img src={produk.gambar_link} height={`240px`} alt={produk.gambar} className="rounded-3 img-fluidx" />
                </div>
              </div>
            </div>}
            {/* <div className="col-12"></div>
            <div className="col-sm-6">
              <label htmlFor="deskripsi" className="form-label">{lbl.image.lbl}</label>
              <div className="input-group">
                <input type="file" name="gambar" onChange={handleChangeGambar} className="form-control"/>
              </div>
            </div> */}
            <div className="col-12"></div>
            <div className="col-sm-6">
              <label htmlFor="toko_id" className="form-label">toko_id</label>
              <TokoSelect name="toko_id" value={produk?.toko_id} onChange={handleChange}></TokoSelect>
            </div>
            <div className="col-12"></div>
            <div className="col-sm-6">
              <Input name="nama" label="nama" className=""
                value={produk?.nama} onChange={handleChange} 
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="slug" className="form-label">slug</label>
              <Input type="text" id="slug" name="slug"
                value={produk?.slug} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="harga_jual" className="form-label">harga_jual</label>
              <Input type="number" name="harga_jual" label=""
                value={produk?.harga_jual ?? ''} onChange={handleChange} 
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="harga_beli" className="form-label">harga_beli</label>
              <Input type="number" id="harga_beli" name="harga_beli"
                value={produk?.harga_beli} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="kategori_id" className="form-label">kategori_id</label>
              <Input type="text" id="kategori_id" name="kategori_id"
                value={produk?.kategori_id} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="brand_id" className="form-label">brand_id</label>
              <Input type="text" id="brand_id" name="brand_id"
                value={produk?.brand_id} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="satuan" className="form-label">satuan</label>
              <Input type="text" id="satuan" name="satuan"
                value={produk?.satuan ?? ''} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <Input 
                type="select"
                name="status_id"
                value={produk?.status_id}
                onChange={handleChange}
                options={statusList}
                placeholder={'-Pilih-'}
                label="status"
                optionValue="id"
                optionLabel="nama"
              />
            </div>
            <div className="col-12"></div>
            <div className="col-sm-6">
              <label htmlFor="deskripsi" className="form-label">deskripsi</label>
              <textarea id="deskripsi" name="deskripsi"
                value={produk?.deskripsi ?? ''} onChange={handleChange}
                className="form-control"></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Card className="mt-3">
                <Card.Body>
                  <div className="row justify-content-end">
                    <div className="col-sm-auto">
                      {/* <button type="button" onClick={handleAddProdukVarian} className={`${lbl.add.btn}`}>
                        <i className={`${lbl.add.icon} me-1`}></i>
                        {lbl.add.lbl} Produk Varian
                      </button> */}
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className={`${lbl.table.class} mt-3`}>
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Produk</th>
                          <th>Stok</th>
                          <th>Harga Jual</th>
                          {/* <th>Harga Beli</th> */}
                          <th>Ukuran</th>
                          <th>Warna</th>
                          {/* <th>Aksi</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {produk?.produk_varian?.map((varian, i) => (
                          <tr key={i}>
                            <td>{i+1}.</td>
                            <td>
                              <div className="row">
                                <div className="col-auto">
                                  <input type="radio" name="produk_varian_id" value={varian.id} 
                                  onChange={handleChangeProdukKeranjang} className="form-check-input" checked={varian.id == produkKeranjang.produk_varian_id}/>
                                </div>
                                <div className="col-auto">
                                  <Input type="text" id={`varian_${i}`} name="varian"
                                    value={varian?.varian} onChange={(e) => handleProdukVariant(i, e)}
                                    className="form-control" />
                                </div>
                              </div>
                            </td>
                            <td>
                              <Input type="number" name="stok"
                                value={varian?.stok} onChange={(e) => handleProdukVariant(i, e)}
                                className="form-control" />
                            </td>
                            <td>
                              <Input type="number" name="harga_jual"
                                value={varian?.harga_jual} onChange={(e) => handleProdukVariant(i, e)}
                                className="form-control" />
                              
                            </td>
                            {/* <td>
                              <Input type="number" name="harga_beli"
                                value={varian?.harga_beli} onChange={(e) => handleProdukVariant(i, e)}
                                className="form-control" />
                            </td> */}
                            <td>
                              <Input type="text" name="ukuran"
                                value={varian?.ukuran ?? ''} onChange={(e) => handleProdukVariant(i, e)}
                                className="form-control" />
                            </td>
                            <td>
                              <Input type="text" name="warna"
                                value={varian?.warna ?? ''} onChange={(e) => handleProdukVariant(i, e)}
                                className="form-control" />
                            </td>
                            {/* <td>
                              <button type="button" onClick={(e) => handleDeleteProdukVarian(i)} className={`${lbl.delete.btnIcon} btn-smx`}>
                                <i className={lbl.delete.icon}></i>
                              </button>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="row justify-content-end">
                    <div className="col-auto">
                      <label htmlFor="jumlah" className="form-label">Jumlah</label>
                      <Input type="number" name="jumlah" value={produkKeranjang.jumlah} onChange={handleChangeProdukKeranjang}/>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="row justify-content-end mt-3 g-1">
            <div className="col-md-2">
              <button type="submit" className={`${lbl.submitForm.btn}`}>
                <i className={`${lbl.cart.icon} me-1`}></i>
                {lbl.add.lbl} {lbl.cart.lbl}
              </button>    
            </div>
            <div className="col-md-2">
              <button type="button" className={`${lbl.submitForm.btn} me-1`}>
                <i className={`${lbl.order.icon} me-1`}></i>
                {lbl.order.lbl}
              </button>    
            </div>
          </div>

        </form>
        <pre>
          {JSON.stringify(produkKeranjang, null, 2)}
          <hr />
          {JSON.stringify(produk, null, 2)}
        </pre>

        {/* <ProdukList/> */}
      </Card.Body>
    </Card>
  </>
}