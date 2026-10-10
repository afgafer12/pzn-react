import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {useEffectOnce, useLocalStorage} from "react-use";
import {alertError, alertSuccess} from "../../lib/alert.js";
import { Card } from "react-bootstrap";
import Input from "../Shared/Input/index.jsx";
import { jualCreate, jualDetil, jualUpdate } from "../../lib/api/JualApi.js";
import { keranjangDelete, keranjangDetil } from "../../lib/api/KeranjangApi.js";
import lbl from '../../util/LabelConfigs2.js';
import { useImmer } from "use-immer";

export default function KeranjangForm(props) {

  const [entitas, setEntitas] = useState(lbl.order.lbl);
  const [keranjang, setKeranjang] = useImmer({
    "keranjang_id" : null,
    "keranjang_id" : null,
    "total" : null,
    "keranjang_produk" : [],
    "created_at" : null,
  });

  async function fetchKeranjangDetil() {
    const response = await keranjangDetil();
    if (response.status === 200) {
      const responseBody = response.data;
      const data = responseBody.data;
      setKeranjang(responseBody.data);
      console.log(responseBody.data);
      console.log('keranjang_produk');
      console.log(keranjang.keranjang_produk);
      console.log(keranjang);
      data.keranjang_produk.forEach((v,k) => {
        setKeranjang(draft => {
          draft.keranjang_produk[k]['harga'] = v.produk_varian.harga_jual;  
          draft.keranjang_produk[k]['diskon'] = 0;  
          draft.keranjang_produk[k]['diskon_harga'] = 0;  
        });    
        handleSubTotal(k);
      });
    } else {
      await alertError(responseBody.errors);
    }
  }

  const handleChange = (e) => {
    setKeranjang(draft => {
      draft[e.target.name]= e.target.value;
    });
  };

  const handleKeranjangProduk = (index, e) => {
    // setKeranjang((prev) => ({
    //   ...keranjang,
    //   keranjang_produk: prev?.keranjang_produk?.map((variant, i) =>
    //     i === index ? { ...variant, [e.target.name]: e.target.value } : variant
    //   ),
    // }));
    setKeranjang(draft => {
      draft.keranjang_produk[index][e.target.name] = e.target.value;  
    });
    const triggerKeys = ['jumlah', 'harga', 'diskon', 'diskon_harga'] 
    if(triggerKeys.includes(e.target.name)){
      handleSubTotal(index);
    }
  };

  const handleSubTotal = (index) => {
    setKeranjang(draft => {
      const item = draft.keranjang_produk[index];
      const totalSub = item?.jumlah * item?.harga;
      const diskonNilai = (item?.jumlah * item?.harga * item?.diskon / 100) + item.diskon_harga;
      item.diskon_nilai = diskonNilai;  
      item.sub_total = totalSub - diskonNilai;
      // console.log('item.sub_total');
      // console.log(item.sub_total);
      handleTotal();
    });
  };
  const handleTotal = () => {
    setKeranjang(draft => {
      let total = 0;
      draft.keranjang_produk.forEach(val => {
        total+= val.sub_total;
      });
      draft.total = total;
    });
  }

  async function create() {
    const payload = {
      "toko_id": null,
      "keranjang_id" : keranjang.id,
      "total_bayar" : 0,
      "bayar_metode_id" : 1,
      "deskripsi" : "",
      "jual_produk" : []
    };
    keranjang.keranjang_produk?.forEach(produk => {
      payload.jual_produk.push({
        "produk_varian_id": produk.produk_varian_id,
        "jumlah": produk.jumlah,
        "diskon": produk.diskon,
        "diskon_harga": produk.diskon_harga,
        "diskon_nilai": produk.diskon_nilai,
        "sub_total": produk.sub_total,
      });
    });

    try{
    const response = await jualCreate(payload);
    if (response.status === 200) {
      const responseBody = response.data;
      await alertSuccess(`${entitas} ${lbl.add.success}`);
      fetchKeranjangDetil();
    }
    }catch(error){
      console.log(error);
      // keranjang.keranjang_produk = [];
      const msg = error.response?.data?.message ?? error; 
      await alertError(msg);
    }

  }

  async function handleSubmit(e) {
    e.preventDefault();
    create();
  }

  async function handleDeleteProdukVarian(id){
    const response = await keranjangDelete(id);
    if (response.status === 200) {
      fetchKeranjangDetil();
      await alertSuccess(`${entitas} ${lbl.delete.success}`);
    } else {
      await alertError(`${entitas} ${lbl.delete.failed}`);
    }
  }

  useEffectOnce(() => {
    fetchKeranjangDetil();
  })

  const formKeranjang = <>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12">
              <Card className="mt-3">
                <Card.Body>
                  <div className="table-responsive">
                    <table className={`${lbl.table.class} mt-3`}>
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Produk</th>
                          <th>Satuan</th>
                          <th className="text-center">Jumlah</th>
                          <th>Harga</th>
                          <th>Diskon (%)</th>
                          <th>Diskon Harga (Rp)</th>
                          <th>Sub Total</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {keranjang?.keranjang_produk?.map((produkKrj, i) => (
                          <tr key={i} className="align-middle">
                            <td>{i+1}.</td>
                            <td>
                              {produkKrj.produk_varian.produk_id}&nbsp;-&nbsp;
                              {produkKrj.produk_varian_id}&nbsp;
                              {produkKrj.produk_varian.produk?.nama}&nbsp;-&nbsp;
                              {produkKrj.produk_varian.varian}
                            </td>
                            <td></td>
                            <td>
                              <div className="row g-1">
                                <div className="col-auto">
                                  <button type="button" className={lbl.plus.btn}>
                                    <i className={lbl.plus.icon}></i>
                                  </button>
                                </div>
                                <div className="col-md">
                                  <Input type="number" name="jumlah"
                                  value={produkKrj.jumlah} onChange={(e) => handleKeranjangProduk(i, e)}
                                  className="form-control"/>
                                </div>
                                <div className="col-auto">
                                  <button type="button" className={lbl.minus.btn}>
                                    <i className={lbl.minus.icon}></i>
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <Input type="number" name="harga"
                                  value={produkKrj.harga} onChange={(e) => handleKeranjangProduk(i, e)}
                                  className="form-control" />
                            </td>
                            <td>
                              <div style={{"minWidth":"5%"}}>  
                                <Input type="number" name="diskon"
                                  value={produkKrj.diskon} onChange={(e) => handleKeranjangProduk(i, e)}
                                  className="form-control" />
                              </div>
                            </td>
                            <td>
                              <Input type="number" name="diskon_harga"
                                  value={produkKrj.diskon_harga} onChange={(e) => handleKeranjangProduk(i, e)}
                                  className="form-control" />
                            </td>
                            <td>
                              <Input type="number" name="sub_total"
                                value={produkKrj?.sub_total} onChange={(e) => handleKeranjangProduk(i, e)}
                                className="form-control" />
                            </td>
                            <td>
                              <button type="button" onClick={(e) => handleDeleteProdukVarian(produkKrj.id)} className={`${lbl.delete.btnIcon} btn-smx`}>
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
                                value={keranjang?.total ?? ''} onChange={handleChange} 
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
                {lbl.order.lbl}
              </button>    
            </div>
          </div>

        </form>
        <pre>
          {JSON.stringify(keranjang, null, 2)}
        </pre>
  </>

  // if(props.wrapper == 'none'){
  //   return formKeranjang;
  // }
  return <>
    <Card>
      {/* <Card.Header as="h5">
        {lbl.keranjang.lbl}
      </Card.Header> */}
      <Card.Body>
        <Card.Title>{lbl.cart.lbl}</Card.Title>
        {formKeranjang}
      </Card.Body>
    </Card>
  </>
}