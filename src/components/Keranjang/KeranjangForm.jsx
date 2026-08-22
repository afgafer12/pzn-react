import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {useEffectOnce, useLocalStorage} from "react-use";
import {alertError, alertSuccess} from "../../lib/alert.js";
import { Card } from "react-bootstrap";
import { labelConfigs as lbl } from "../../util/LabelConfigs.js";
import Input from "../Shared/Input/index.jsx";
import TokoSelect from "../Shared/TokoSelect/TokoSelect.jsx";
import ProdukVarianSelect from "../Shared/ProdukVarianSelect/ProdukVarianSelect.jsx";
import { jualCreate, jualDetil, jualUpdate } from "../../lib/api/JualApi.js";
import { keranjangDetil } from "../../lib/api/KeranjangApi.js";

export default function KeranjangForm(props) {

  // const [token, _] = useLocalStorage("token", "");
  // const {id} = useParams();
  // const [produkId, setProdukId] = useState(props.id);
  const [keranjangForm, setKeranjangForm] = useState({
    "keranjang_id" : "",
    "keranjang_produk" : []
  });
  const [keranjang, setKeranjang] = useState({
    "id" : "",
    "keranjang_produk" : []
  });

  async function fetchKeranjangDetil() {
    const response = await keranjangDetil();
    const responseBody = await response.json();
    console.log(responseBody);
    if (response.status === 200) {
      // setKeranjang(responseBody.data);
      setKeranjangForm(responseBody.data);
    } else {
      await alertError(responseBody.errors);
    }
  }

  const handleChange = (e) => {
    // console.log('e11');
    // console.log(e.target);
    // console.log(e);
    
    setKeranjangForm({
      ...keranjangForm,
      [e.target.name]: e.target.value
    });
  };

  const handleKeranjangProduk = (index, e) => {
    // console.log('event');
    // console.log(e);
    setKeranjangForm((prev) => ({
      ...keranjangForm,
      keranjang_produk: prev?.keranjang_produk?.map((variant, i) =>
        i === index ? { ...variant, [e.target.name]: e.target.value } : variant
      ),
    }));
  };

  async function create() {
    const payload = {
      "keranjang_id" : keranjangForm.id,
      "bayar_metode_id" : 1,
      "total_bayar" : 0,
      "tgl_bayar" : "2026-11-11",
      "jual_produk" : []
    };
    keranjangForm.keranjang_produk?.forEach(produk => {
      payload.jual_produk.push({
        "produk_varian_id": produk.produk_varian_id,
        "jumlah": produk.jumlah,
        "diskon": produk.diskon ?? 0,
      });
    });

    const response = await jualCreate(payload);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Contact created successfully");
      props.onSubmit();
    } else {
      await alertError(responseBody.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    create();
  }

  const handleDeleteProdukVarian = (i) => {

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
                        {keranjangForm?.keranjang_produk?.map((varian, i) => (
                          <tr key={i} class="align-middle">
                            <td>{i+1}.</td>
                            <td>
                              {varian.produk_varian.kd_produk}&nbsp;-&nbsp;
                              {varian.produk_varian_id}
                            </td>
                            <td></td>
                            <td>
                              {varian.jumlah}
                            </td>
                            <td>
                              {/* {varian.produk_varian.harga_jual} */}
                              {varian.produk_varian.harga_jual.toLocaleString("id-ID")}
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
                                value={(varian?.jumlah * varian.produk_varian.harga_jual * varian?.diskon / 100)} 
                                className="form-control"/> */}
                            </td>
                            <td>
                              <Input type="number" name="sub_total"
                                value={(varian?.jumlah * varian.produk_varian.harga_jual * varian?.diskon)} onChange={(e) => handleKeranjangProduk(i, e)}
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
                                value={keranjangForm?.total ?? ''} onChange={handleChange} 
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
          <hr />
          {JSON.stringify(keranjangForm, null, 2)}
        </pre>
  </>

  if(props.wrapper == 'none'){
    return formKeranjang;
  }
  return <>
    <Card>
      <Card.Header as="h5">
        {/* {lbl.keranjangForm.lbl} */}
      </Card.Header>
      <Card.Body>
        {formKeranjang}
      </Card.Body>
    </Card>
  </>
}