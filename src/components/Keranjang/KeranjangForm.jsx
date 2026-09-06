import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {useEffectOnce, useLocalStorage} from "react-use";
import {alertError, alertSuccess} from "../../lib/alert.js";
import { Card } from "react-bootstrap";
import Input from "../Shared/Input/index.jsx";
import { jualCreate, jualDetil, jualUpdate } from "../../lib/api/JualApi.js";
import { keranjangDelete, keranjangDetil } from "../../lib/api/KeranjangApi.js";
import lbl from '../../util/LabelConfigs2.js';

export default function KeranjangForm(props) {

  const [entitas, setEntitas] = useState(lbl.order.lbl);
  const [keranjang, setKeranjang] = useState({
    "keranjang_id" : "",
    "keranjang_produk" : []
  });

  async function fetchKeranjangDetil() {
    const response = await keranjangDetil();
    if (response.status === 200) {
      const responseBody = response.data;
      setKeranjang(responseBody.data);
    } else {
      await alertError(responseBody.errors);
    }
  }

  const handleChange = (e) => {
    setKeranjang({
      ...keranjang,
      [e.target.name]: e.target.value
    });
  };

  const handleKeranjangProduk = (index, e) => {
    setKeranjang((prev) => ({
      ...keranjang,
      keranjang_produk: prev?.keranjang_produk?.map((variant, i) =>
        i === index ? { ...variant, [e.target.name]: e.target.value } : variant
      ),
    }));
  };

  async function create() {
    const payload = {
      "keranjang_id" : keranjang.id,
      "bayar_metode_id" : 1,
      "total_bayar" : 0,
      "tgl_bayar" : "2026-11-11",
      "jual_produk" : []
    };
    keranjang.keranjang_produk?.forEach(produk => {
      payload.jual_produk.push({
        "produk_varian_id": produk.produk_varian_id,
        "jumlah": produk.jumlah,
        "diskon": produk.diskon ?? 0,
      });
    });

    try{
    const response = await jualCreate(payload);
    if (response.status === 200) {
      const responseBody = response.data;
      await alertSuccess(`${entitas} ${lbl.add.success}`);
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
                          <th>Qty</th>
                          <th>Harga</th>
                          <th>Diskon (%)</th>
                          <th>Diskon Nilai</th>
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
                              {produkKrj.produk_varian.varian}
                            </td>
                            <td></td>
                            <td>
                              {produkKrj.jumlah}
                            </td>
                            <td>
                              {/* {produkKrj.produk_varian.harga_jual} */}
                              {produkKrj.produk_varian.harga_jual.toLocaleString("id-ID")}
                            </td>
                            <td>
                              <div style={{"minWidth":"5%"}}>  
                                <Input type="number" name="diskon"
                                  value={10} onChange={(e) => handleKeranjangProduk(i, e)}
                                  className="form-control" />
                              </div>
                            </td>
                            <td>
                              {/* <Input type="number"
                                value={(produkKrj?.jumlah * produkKrj.produk_varian.harga_jual * produkKrj?.diskon / 100)} 
                                className="form-control"/> */}
                            </td>
                            <td>
                              <Input type="number" name="sub_total"
                                value={(produkKrj?.jumlah * produkKrj.produk_varian.harga_jual * produkKrj?.diskon)} onChange={(e) => handleKeranjangProduk(i, e)}
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
      <Card.Header as="h5">
        {/* {lbl.keranjang.lbl} */}
      </Card.Header>
      <Card.Body>
        {formKeranjang}
      </Card.Body>
    </Card>
  </>
}