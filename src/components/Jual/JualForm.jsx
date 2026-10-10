import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {useEffectOnce, useLocalStorage} from "react-use";
import {alertError, alertSuccess} from "../../lib/alert.js";
import { Card } from "react-bootstrap";
// import { labelConfigs as lbl } from "../../util/LabelConfigs.js";
import Input from "../Shared/Input/index.jsx";
import TokoSelect from "../Shared/TokoSelect/TokoSelect.jsx";
import ProdukVarianSelect from "../Shared/ProdukVarianSelect/ProdukVarianSelect.jsx";
import { jualCreate, jualDetil, jualUpdate } from "../../lib/api/JualApi.js";
import lbl from "../../util/LabelConfigs2.js";
import { produkVarianDetil } from "../../lib/api/ProdukVarianApi.js";
import { useImmer } from "use-immer";

export default function JualForm({id, onSubmit, wrapper}) {
  const entitas = 'Penjualan';
  const { id: urlId } = useParams();
  // const id = id ?? urlId;
  id = id ?? urlId;
  const [jual, setJual] = useImmer({
    "no_trans" : "",
    "status_id": "",
    "total_bayar": null,
    "toko_id": null,
    "user_id": null,
    "bayar_metode_id": null,
    "tgl_bayar": null,
    "rek_id": null,
    "status_kirim_id": null,
    "kurir_id": null,
    "img_bayar": "",
    "deskripsi": "",
    "total": null,
    "total_diskon_harga": null,
    "jual_produk" : []
  });
  const [statusList, setStatusList] = useState([]);

  const handleChange = (e) => {
    setJual(draft => {
      draft[e.target.name]= e.target.value;
    });
  };

  const handleJualProduk = (index, e) => {
    // console.log('event');
    // console.log(e);
    setJual(draft => {
      draft.jual_produk[index][e.target.name] = e.target.value;  
    });
    const triggerKeys = ['jumlah', 'harga', 'diskon', 'diskon_harga'] 
    if(triggerKeys.includes(e.target.name)){
      handleSubTotal(index);
    }
    // setJualForm((prev) => ({
    //   ...jualForm,
    //   jual_produk: prev?.jual_produk?.map((variant, i) =>
    //     i === index
    //       ? {
    //         ...variant,
    //         [e.target.name]: e.target.value
    //       }
    //       : variant
    //   ),
    // }));
  };

  const handleSubTotal = (index) => {
    setJual(draft => {
      const item = draft.jual_produk[index];
      const totalSub = item?.jumlah * item?.harga;
      const diskonNilai = (item?.jumlah * item?.harga * item?.diskon / 100) + item.diskon_harga;
      item.diskon_nilai = diskonNilai;  
      item.sub_total = totalSub - diskonNilai;
      handleTotal();
    });
  };
  const handleTotal = () => {
    console.log('x12');
    setJual(draft => {
      let total = 0;
      draft.jual_produk.forEach(val => {
        total+= val.sub_total;
      });
      draft.total = total;
    });
  }

  const handleSelectProdukVrnt = (index, e) => {
    const produk_varian_id = e.target.value;
    produkVarianDetil(produk_varian_id).then((resp) => {
        handleJualProduk(index,e);
        setJual(draft => {
          const jual_produk = draft.jual_produk[index];
          if (jual_produk) {
            const varian = resp.data
            jual_produk.harga = varian.harga_jual;
            jual_produk.produk_varian_id = varian.id;
            jual_produk.varian = varian.varian;
            jual_produk.produk_id = varian.produk.id;
            jual_produk.produk_nama = varian.produk.nama;
          }
        });
        // alertSuccess(`Produk ${lbl.edit.success}`);
    }).catch((err) => {
      console.log(err);
      const msg = err.response?.data?.message ?? err; 
      alertError(msg);
    });
  };

  async function fetchJual() {
    const response = await jualDetil(id);
    if (response.status === 200) {
      const responseBody = response.data;
      setJual(responseBody.data);
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function create() {
    const response = await jualCreate(token, jual);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("created successfully");
      if(onSubmit)onSubmit();
    } else {
      await alertError(responseBody.message);
    }
  }
  async function update() {
    jualUpdate(id, jual).then((resp) => {
      alertSuccess(`${entitas} ${lbl.edit.success}`);
      if(onSubmit)onSubmit();
    }).catch((err) => {
      console.log(err);
      const msg = err.response?.data?.message ?? err; 
      alertError(msg);
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if(!jual.id){
      create();
    }else{
      update();
    }
  }

  const handleAddProdukVarian = () => {
    setJual(draft => {
      draft.jual_produk.push({
        "id": "", "jual_id": "", "produk_id": "", "produk_varian_id": null, "varian": "", "produk_nama": "", 
        "harga": null, "jumlah": null, "diskon": 0, "diskon_harga": 0, "diskon_nilai": 0, "sub_total": 0, "satuan": null,
      });
    })
    // if(!jualForm?.jual_produk){
    //   setJualForm({...jualForm, jual_produk: [{
    //     "id": "", "jual_id": "", "produk_id": "", "produk_varian_id": null, "produk_nama": "", 
    //     "harga": null, "jumlah": null, "diskon": null, "sub_total": null, "satuan": null,
    //   }]});
    // }else{
    //   setJualForm({...jualForm, jual_produk: [...jualForm?.jual_produk, {
    //     "id": "", "jual_id": "", "produk_id": "", "produk_varian_id": null, "produk_nama": "", 
    //     "harga": null, "jumlah": null, "diskon": null, "sub_total": null, "satuan": null,
    //   }]})
    //   setJualForm(draft => {
    //     draft.jual_produk.push({
    //     "id": "", "jual_id": "", "produk_id": "", "produk_varian_id": null, "produk_nama": "", 
    //     "harga": null, "jumlah": null, "diskon": null, "sub_total": null, "satuan": null,
    //     });
    //   })
    // }
  }
  const handleDeleteProdukVarian = (i) => {
    console.log('index');
    console.log(i);
    
    //  setJualForm(prev => ({
    //     ...jualForm,
    //     jual_produk: prev?.jual_produk?.filter((_, index) => index !== i)
    //   }));
    setJual(draft => {
      draft.jual_produk.splice(i,1);
    });
    handleTotal();
  }

  useEffectOnce(() => {
    const statusList = [
      {id: 1, nama: 'Aktif'},
      {id: 0, nama: 'Non aktif'},
    ];
    setStatusList(statusList);
    // const idVar = props?.id ?? id;
    const idVar = id;
    if(idVar){
      fetchJual();
    }else{
      handleAddProdukVarian();
    }
  })
  const formJual = <>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <Input name="no_trans" label="no_trans" className=""
                value={jual?.no_trans} onChange={handleChange} 
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="toko_id" className="form-label">toko_id</label>
              <TokoSelect name="toko_id" value={jual?.toko_id} onChange={handleChange}></TokoSelect>
            </div>
            <div className="col-12"></div>
            <div className="col-sm-6">
              <Input name="user_id" label="user_id" className=""
                value={jual?.user_id} onChange={handleChange} 
              />
            </div>
            {/* <div className="col-12"></div> */}
            <div className="col-sm-6">
              <Input name="status_id" label="status_id"
                value={jual?.status_id ?? ''} onChange={handleChange} 
              />
            </div>
            <div className="col-12"></div>
            {/* <div className="col-sm-6">
              <Input type="number" name="total" label="total"
                value={jual?.total ?? ''} onChange={handleChange} 
              />
            </div> */}
            <div className="col-12"></div>
            <div className="col-sm-6">
              <label htmlFor="deskripsi" className="form-label">deskripsi</label>
              <textarea id="deskripsi" name="deskripsi"
                value={jual?.deskripsi ?? ''} onChange={handleChange}
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
                          <th>Jumlah</th>
                          <th>Harga</th>
                          <th>Diskon (%)</th>
                          <th>Diskon Harga (Rp)</th>
                          <th>Sub Total</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jual?.jual_produk?.map((item, i) => (
                          <tr key={i}>
                            <td>{i+1}.</td>
                            <td>
                              {/* <Input type="number" id={`produk_varian_id_${i}`} name="produk_varian_id"
                                value={item?.produk_varian_id} onChange={(e) => handleJualProduk(i, e)}
                                className="form-control" /> */}
                              <div style={{'minWidth': '200px'}}>
                                {/* <ProdukVarianSelect name="produk_varian_id" value={item?.produk_varian_id} onChange={(e) => handleJualProduk(i, e)} optionValue={'id'}></ProdukVarianSelect> */}
                                <ProdukVarianSelect name="produk_varian_id" value={item?.produk_varian_id} onChange={(e) => handleSelectProdukVrnt(i, e)} optionValue={'id'}></ProdukVarianSelect>
                              </div>
                            </td>
                            <td>
                              <Input type="text" name="satuan"/>
                            </td>
                            <td>
                                <Input type="number" name="jumlah"
                                value={item?.jumlah} onChange={(e) => handleJualProduk(i, e)}
                                className="form-control" />
                            </td>
                            <td>
                              <Input type="number" name="harga"
                                value={item?.harga} onChange={(e) => handleJualProduk(i, e)}
                                className="form-control" />
                              
                            </td>
                            <td>
                              <div style={{"minWidth":"5%"}}>  
                                <Input type="number" name="diskon"
                                  value={item?.diskon} onChange={(e) => handleJualProduk(i, e)}
                                  className="form-control" />
                              </div>
                            </td>
                            <td>
                              <Input type="number" name="diskon_harga"
                                value={item?.diskon_harga} onChange={(e) => handleJualProduk(i, e)} 
                                className="form-control"/>
                              {/* <Input type="number" name="diskon_nilai"
                                value={item?.diskon_nilai} onChange={(e) => handleJualProduk(i, e)} 
                                className="form-control" disabled/> */}
                            </td>
                            <td>
                              <Input type="number" name="sub_total"
                                value={item?.sub_total} onChange={(e) => handleJualProduk(i, e)}
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
                                value={jual?.total ?? ''} onChange={handleChange} 
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
                {jual?.id ? 'Ubah' : 'Tambah'}
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
          {JSON.stringify(jual, null, 2)}
        </pre>
  </>

  if(wrapper == 'none'){
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