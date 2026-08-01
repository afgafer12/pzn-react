import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {useEffectOnce, useLocalStorage} from "react-use";
import {alertError, alertSuccess} from "../../lib/alert.js";
import { Card } from "react-bootstrap";
import { labelConfigs as lbl } from "../../helper/LabelConfigs.js";
import Input from "../Shared/Input/index.jsx";
import TokoSelect from "../Shared/TokoSelect/TokoSelect.jsx";
import ProdukVarianSelect from "../Shared/ProdukVarianSelect/ProdukVarianSelect.jsx";
import { jualCreate, jualDetil, jualUpdate } from "../../lib/api/JualApi.js";
// import ProdukList from "./ProdukList.jsx";

export default function JualForm(props) {

  const [token, _] = useLocalStorage("token", "");
  const {id} = useParams();
  const [produkId, setProdukId] = useState(props.id);
  const [jualForm, setProdukForm] = useState({
    "no_trans" : "",
    "status_id": "",
    "total_bayar": null,
    "toko_id": null,
    "user_id": "",
    "bayar_metode_id": "",
    "tgl_bayar": "",
    "rek_id": "",
    "status_kirim_id": "",
    "pengiriman_id": "",
    "img_bayar": "",
    "deskripsi": "",
    "total": null,
    "total_diskon_harga": null,
    

    "jual_produk" : []
  });
  const [statusList, setStatusList] = useState([]);

  const handleChange = (e) => {
    // console.log('e11');
    // console.log(e.target);
    // console.log(e);
    
    setProdukForm({
      ...jualForm,
      [e.target.name]: e.target.value
    });
  };
  // const handleChangeTarget = (name, value) => {
  //   console.log('name');
  //   console.log(name);
  //   console.log(value);
    
  //   setProdukForm({
  //     ...jualForm,
  //     [name]: value
  //   });
  // };

  const handleJualProduk = (index, e) => {
    console.log('event');
    console.log(e);
    setProdukForm((prev) => ({
      ...jualForm,
      jual_produk: prev?.jual_produk?.map((variant, i) =>
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
    const response = await jualDetil(token, produkId);
    const responseBody = await response.json();
    console.log(responseBody);
    if (response.status === 200) {
      setProdukForm(responseBody.data);
      // console.log(jualForm);
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function create() {
    const response = await jualCreate(token, jualForm);
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
    const response = await jualUpdate(token, jualForm);
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
    if(!jualForm.id){
      create();
    }else{
      update();
    }
  }

  const handleAddProdukVarian = () => {
    if(!jualForm?.jual_produk){
      setProdukForm({...jualForm, jual_produk: [{
        "id": "", "jual_id": "", "produk_id": "", "produk_varian_id": null, "produk_nama": "", 
        "harga": null, "qty": null, "diskon": null, "sub_total": null, "satuan": null,
      }]});
    }else{
      setProdukForm({...jualForm, jual_produk: [...jualForm?.jual_produk, {
        "id": "", "jual_id": "", "produk_id": "", "produk_varian_id": null, "produk_nama": "", 
        "harga": null, "qty": null, "diskon": null, "sub_total": null, "satuan": null,
      }]})
    }
  }
  const handleDeleteProdukVarian = (i) => {
   setProdukForm(prev => ({
      ...jualForm,
      jual_produk: prev?.jual_produk?.filter((_, index) => index !== i)
    }));
  }

  useEffect(() => {
    const statusList = [
      {id: 1, nama: 'Aktif'},
      {id: 0, nama: 'Non aktif'},
    ];
    setStatusList(statusList);
    // setProdukId(props?.id ?? id);
    setProdukId(3);
    console.log('useEffect props');
    console.log(props?.id ?? id);
    console.log(produkId);
    if(produkId){
      fetchProduk().then(() => console.log("Contact detail fetched successfully"));
    }else{
      handleAddProdukVarian();
    }
  }, [])
  // const onStatusChange = (e) => {
  //   const status = statusList.find(category => category.value == e.target.value);
  //   console.log(e.target);
  //   handleChange(e);
  //   console.log(e.target.name);
  //   console.log(e.target.value);
    
  //   // setProdukForm({
  //   //   ...jualForm,
  //   //   status_id: e.target.value,
  //   //   status: e.target.value,
  //   // });
  // }
  const formJual = <>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <Input name="no_trans" label="no_trans" className=""
                value={jualForm?.no_trans} onChange={handleChange} 
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="toko_id" className="form-label">toko_id</label>
              <TokoSelect name="toko_id" value={jualForm?.toko_id} onChange={handleChange}></TokoSelect>
            </div>
            <div className="col-12"></div>
            <div className="col-sm-6">
              <Input name="user_id" label="user_id" className=""
                value={jualForm?.user_id} onChange={handleChange} 
              />
            </div>
            {/* <div className="col-12"></div> */}
            <div className="col-sm-6">
              <Input name="status_id" label="status_id"
                value={jualForm?.status_id ?? ''} onChange={handleChange} 
              />
            </div>
            <div className="col-12"></div>
            {/* <div className="col-sm-6">
              <Input type="number" name="total" label="total"
                value={jualForm?.total ?? ''} onChange={handleChange} 
              />
            </div> */}
            <div className="col-12"></div>
            <div className="col-sm-6">
              <label htmlFor="deskripsi" className="form-label">deskripsi</label>
              <textarea id="deskripsi" name="deskripsi"
                value={jualForm?.deskripsi ?? ''} onChange={handleChange}
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
                          <th>Satuan</th>
                          <th>Qty</th>
                          <th>Harga</th>
                          <th>Diskon (%)</th>
                          <th>Diskon Nilai</th>
                          <th>Sub Total</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jualForm?.jual_produk?.map((varian, i) => (
                          <tr key={i}>
                            <td>{i+1}.</td>
                            <td>
                              {/* <Input type="number" id={`produk_varian_id_${i}`} name="produk_varian_id"
                                value={varian?.produk_varian_id} onChange={(e) => handleJualProduk(i, e)}
                                className="form-control" /> */}
                              <div style={{'minWidth': '200px'}}>
                                <ProdukVarianSelect name="produk_varian_id" value={varian?.produk_varian_id} onChange={(e) => handleJualProduk(i, e)} optionValue={'id'}></ProdukVarianSelect>
                              </div>
                            </td>
                            <td>
                              <Input type="text" name="satuan"/>
                            </td>
                            <td>
                                <Input type="number" name="qty"
                                value={varian?.qty} onChange={(e) => handleJualProduk(i, e)}
                                className="form-control" />
                            </td>
                            <td>
                              <Input type="number" name="harga"
                                value={varian?.harga} onChange={(e) => handleJualProduk(i, e)}
                                className="form-control" />
                              
                            </td>
                            <td>
                              <div style={{"minWidth":"5%"}}>  
                                <Input type="number" name="diskon"
                                  value={varian?.diskon} onChange={(e) => handleJualProduk(i, e)}
                                  className="form-control" />
                              </div>
                            </td>
                            <td>
                              <Input type="number"
                                value={ (varian?.qty * varian?.harga * varian?.diskon / 100) } 
                                className="form-control"/>
                            </td>
                            <td>
                              <Input type="number" name="sub_total"
                                value={varian?.sub_total} onChange={(e) => handleJualProduk(i, e)}
                                className="form-control" />
                            </td>
                            <td>
                              <button type="button" onClick={(e) => handleDeleteProdukVarian(i)} className={`${lbl.delete.btnIcon} btn-smx`}>
                                <i className={lbl.delete.icon}></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={6} className={''}></td>
                          <td className={'fw-bold'}>
                            Total
                          </td>
                          <td>
                              <Input type="number" name="total" label=""
                                value={jualForm?.total ?? ''} onChange={handleChange} 
                              />
                          </td>
                          <td></td>
                        </tr>
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
                {jualForm?.id ? 'Ubah' : 'Tambah'}
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
          {JSON.stringify(jualForm, null, 2)}
        </pre>
  </>

  if(props.wrapper == 'none'){
    return formJual;
  }
  return <>
    <Card>
      <Card.Header as="h5">
        {lbl.jual.lbl}
      </Card.Header>
      <Card.Body>
        {formJual}
      </Card.Body>
    </Card>
  </>
}