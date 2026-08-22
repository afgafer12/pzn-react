import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {contactDetail, contactUpdate} from "../../lib/api/ContactApi.js";
import {useEffectOnce, useLocalStorage} from "react-use";
import {alertError, alertSuccess} from "../../lib/alert.js";
import { produkCreate, produkDetil, produkUpdate } from "../../lib/api/ProdukApi.js";
import { Card } from "react-bootstrap";
import { labelConfigs as lbl } from "../../util/LabelConfigs.js";
import Input from "../Shared/Input/index.jsx";
import TokoSelect from "../Shared/TokoSelect/TokoSelect.jsx";
// import ProdukList from "./ProdukList.jsx";

export default function ProdukForm(props) {

  const [token, _] = useLocalStorage("token", "");
  // const {id} = useParams();
  const { id: urlId } = useParams();
  const id = props.id ?? urlId;
  // const [id, setProdukId] = useState(props.id);
  const [produkForm, setProdukForm] = useState({
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

  const handleChange = (e) => {
    // console.log('e11');
    // console.log(e.target);
    // console.log(e);
    
    setProdukForm({
      ...produkForm,
      [e.target.name]: e.target.value
    });
  };
  // const handleChangeTarget = (name, value) => {
  //   console.log('name');
  //   console.log(name);
  //   console.log(value);
    
  //   setProdukForm({
  //     ...produkForm,
  //     [name]: value
  //   });
  // };

  const handleProdukVariant = (index, e) => {
    setProdukForm((prev) => ({
      ...produkForm,
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

  async function fetchProduk() {
    const response = await produkDetil(id);
    const responseBody = await response.json();
    // console.log(responseBody);
    if (response.status === 200) {
      setProdukForm(responseBody.data);
      // console.log(produkForm);
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function create() {
    const response = await produkCreate(token, produkForm);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Contact created successfully");
      props.onSubmit();
    } else {
      await alertError(responseBody.message);
    }
  }
  async function update() {
    const response = await produkUpdate(token, produkForm);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Contact updated successfully");
      props.onSubmit();
    } else {
      await alertError(responseBody.errors);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if(!produkForm.id){
      create();
    }else{
      update();
    }
  }

  const handleAddProdukVarian = () => {
    //  setProdukForm({...produkForm, produk_varian: [...produkForm?.produk_varian, {
    //   "id": "", "produk_id": "", "kd_produk": "", 
    //   "stok": "", "harga_jual": "", "harga_beli": "", "warna": "", "ukuran": "",
    //  }]})
    if(!produkForm?.produk_varian){
      setProdukForm({...produkForm, produk_varian: [{
        "id": "", "produk_id": "", "kd_produk": "", 
        "stok": "", "harga_jual": "", "harga_beli": "", "warna": "", "ukuran": "",
      }]});
    }else{
      setProdukForm({...produkForm, produk_varian: [...produkForm?.produk_varian, {
        "id": "", "produk_id": "", "kd_produk": "", 
        "stok": "", "harga_jual": "", "harga_beli": "", "warna": "", "ukuran": "",
      }]})
    }
    // setProdukForm({...produkForm, produk_varian: produkForm?.produk_varian == [] ? [{
    //     "id": "", "produk_id": "", "kd_produk": "", 
    //     "stok": "", "harga_jual": "", "harga_beli": "", "warna": "", "ukuran": "",
    //   }] : [...produkForm?.produk_varian, {
    //     "id": "", "produk_id": "", "kd_produk": "", 
    //     "stok": "", "harga_jual": "", "harga_beli": "", "warna": "", "ukuran": "",
    //   }]
    // });
  }
  const handleDeleteProdukVarian = (i) => {
   setProdukForm(prev => ({
      ...produkForm,
      produk_varian: prev?.produk_varian?.filter((_, index) => index !== i)
    }));
  }

  useEffectOnce(() => {
    const statusList = [
      {id: 1, nama: 'Aktif'},
      {id: 0, nama: 'Non aktif'},
    ];
    setStatusList(statusList);
    let idVar = props?.id ?? id;
    // setProdukId(idVar);
    // setProdukId(3);
    console.log('props');
    console.log(props?.id ?? id);
    console.log(idVar);
    console.log(id);
    if(idVar){
      fetchProduk().then(() => console.log("Contact detail fetched successfully"));
    }else{
      handleAddProdukVarian();
    }
  })
  // const onStatusChange = (e) => {
  //   const status = statusList.find(category => category.value == e.target.value);
  //   console.log(e.target);
  //   handleChange(e);
  //   console.log(e.target.name);
  //   console.log(e.target.value);
    
  //   // setProdukForm({
  //   //   ...produkForm,
  //   //   status_id: e.target.value,
  //   //   status: e.target.value,
  //   // });
  // }

  return <>
    <Card>
      <Card.Body>
        <Card.Title>Produk</Card.Title>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="toko_id" className="form-label">toko_id</label>
              {/* <input type="text" id="toko_id" name="toko_id"
                value={produkForm?.toko_id} onChange={handleChange}
                className="form-control" disabled/> */}
              <TokoSelect value={produkForm?.toko_id} onChange={handleChange} disabled></TokoSelect>
              <TokoSelect name="toko_id" value={produkForm?.toko_id} onChange={handleChange}></TokoSelect>
            </div>
            <div className="col-12"></div>
            <div className="col-sm-6">
              {/* <label htmlFor="nama" className="form-label">nama</label> */}
              <Input name="nama" label="nama" className=""
                value={produkForm?.nama} onChange={handleChange} 
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="slug" className="form-label">slug</label>
              <Input type="text" id="slug" name="slug"
                value={produkForm?.slug} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="harga_jual" className="form-label">harga_jual</label>
              {/* <input type="number" id="harga_jual" name="harga_jual"
                value={produkForm?.harga_jual ?? ''} onChange={handleChange}
                className="form-control" /> */}
              <Input type="number" name="harga_jual" label=""
                value={produkForm?.harga_jual ?? ''} onChange={handleChange} 
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="harga_beli" className="form-label">harga_beli</label>
              <Input type="number" id="harga_beli" name="harga_beli"
                value={produkForm?.harga_beli} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="kategori_id" className="form-label">kategori_id</label>
              <Input type="text" id="kategori_id" name="kategori_id"
                value={produkForm?.kategori_id} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="brand_id" className="form-label">brand_id</label>
              <Input type="text" id="brand_id" name="brand_id"
                value={produkForm?.brand_id} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="satuan" className="form-label">satuan</label>
              <Input type="text" id="satuan" name="satuan"
                value={produkForm?.satuan ?? ''} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="status" className="form-label">status</label>
              <Input 
                type="select"
                name="status"
                value={produkForm?.status}
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
                value={produkForm?.deskripsi ?? ''} onChange={handleChange}
                className="form-control"></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Card className="mt-3">
                <Card.Body>
                  <div className="row justify-content-end">
                    <div className="col-sm-auto">
                      <button type="button" onClick={handleAddProdukVarian} className={`${lbl.add.btn}`}>
                        <i className={`${lbl.add.icon} me-1`}></i>
                        {lbl.add.lbl} Produk Varian
                      </button>
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
                          <th>Harga Beli</th>
                          <th>Ukuran</th>
                          <th>Warna</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {produkForm?.produk_varian?.map((varian, i) => (
                          <tr key={i}>
                            <td>{i+1}.</td>
                            <td>
                              <Input type="text" id={`kd_produk_${i}`} name="kd_produk"
                                value={varian?.kd_produk} onChange={(e) => handleProdukVariant(i, e)}
                                className="form-control" />
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
                            <td>
                              <Input type="number" name="harga_beli"
                                value={varian?.harga_beli} onChange={(e) => handleProdukVariant(i, e)}
                                className="form-control" />
                            </td>
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
                            <td>
                              <button type="button" onClick={(e) => handleDeleteProdukVarian(i)} className={`${lbl.delete.btnIcon} btn-smx`}>
                                <i className={lbl.delete.icon}></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="row justify-content-end mt-3 g-1">
            <div className="col-md-2">
              <button type="submit" className={`${lbl.submitForm.btn}`}>
                <i className={`${lbl.submitForm.icon} me-1`}></i>
                {produkForm?.id ? 'Ubah' : 'Tambah'}
              </button>    
            </div>
            <div className="col-md-2">
              <button type="button" onClick={create} className={`${lbl.submitForm.btn} me-1`}>
                <i className={`${lbl.submitForm.icon} me-1`}></i>
                {lbl.create.lbl}
              </button>    
            </div>
          </div>

        </form>
        <pre>
          {JSON.stringify(produkForm, null, 2)}
        </pre>

        {/* <ProdukList/> */}
      </Card.Body>
    </Card>
  </>
}