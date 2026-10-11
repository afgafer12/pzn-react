import {useEffectOnce, useLocalStorage} from "react-use";
import {useEffect, useState} from "react";
import {alertConfirm, alertError, alertSuccess} from "../../lib/alert.js";
import {Link} from "react-router";
import { Card, Table } from "react-bootstrap";
import { getProdukList, getReadyProdukList } from "../../lib/api/ProdukApi.js";
// import { labelConfigs as lbl } from "../../util/LabelConfigs.js";
import ProdukForm from "./ProdukForm.jsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button as ButtonPrm } from "primereact/button";
import Button from 'react-bootstrap/Button';
import { formatNumber } from "../../util/ComponentUtil.js";
import { Dialog } from "primereact/dialog";
import lbl from '../../util/LabelConfigs2.js';

export default function ProdukCatalog() {

  const [token, _] = useLocalStorage("token", "");
  const [nama, setNama] = useState("");
  const [produkId, setProdukId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [produkList, setPordukList] = useState([]);
  const [reload, setReload] = useState(false);
  const [visible, setVisible] = useState(false);

  async function fetchProduk() {
    // getProdukList({nama, page}).then((resp) => {
    getReadyProdukList({nama, page}).then((resp) => {
      const responseBody = resp.data;
      setPordukList(responseBody?.data);
    }).catch((err) => {
      console.log(err);
      const msg = err.response?.data?.message ?? err; 
      // alertError(msg);
    });
  }

  const handleSubmitProduk = ()=>{
    fetchProduk();
    setVisible(false);
  }

  useEffect(() => {
    fetchProduk();
  }, [reload])

  const buttonAksi = (produk) => {
    return  <>
            <Link to={`/dashboard/produk/${produk.id}/edit`} target="_blank" className={lbl.edit.btnIcon+`btn-smx border me-1`}>
              <i className={`${lbl.edit.icon} me-1`}></i>
            </Link>
            <Button label="Show" variant={lbl.detil.btnIconVrnt} className={`btn-smx border me-1`} onClick={() => {setVisible(true); setProdukId(produk.id)}}>
              <i className={`${lbl.detil.icon} me-1`}></i>
            </Button>
            </>;
  };

  return <>
    {/* <Card>
      <Card.Body>
        <Card.Title>Produk</Card.Title> */}
        {/* <div className="h-5 fw-bold">PRODUK</div> */}
        <div className="card mb-2">
          <div className="card-header">
            <div className="h5 fw-bold">PRODUK</div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-3 row-cols-md-6 row-cols-md-6 g-2">
          {Array.from({ length: 4 }, (_, j) => (
          produkList.map((produk, i) => (
          <div key={i} className="col">
            <a href={`${produk.id}/detil-selected`} className="text-decoration-none">
            <div className="card h-100">
              <img src={produk.gambar_link} className="card-img-top" alt={produk.gambar}/>
              <div className="card-body p-1">
                {/* <hr className={lbl.bg.primary}/> */}
                <div className="h-5 fw-bold">{produk.nama}</div>
                <div className={lbl.text.primary+" fw-bold"}>Rp {produk.harga_jual.toLocaleString("id-ID")}</div>
                {/* <div className="mb-1">Stok : {produk.stok}</div>
                <div className="mb-1">Terjual : {produk.total_jual}</div> */}
                <div className="row g-0">
                  <div className="col-sm">Terjual</div>
                  <div className="col-auto">:&nbsp;</div>
                  <div className="col-sm-8">{produk.stok}</div>
                  <div className="col-12"></div>
                  <div className="col-sm">Stok</div>
                  <div className="col-auto">:&nbsp;</div>
                  <div className="col-sm-8">{produk.stok}</div>
                </div>
                <p className="card-text" style={{ textAlign: "justify" }}>
                  {produk.deskripsi?.split(" ")?.slice(0,10)?.join(" ")}&nbsp;
                  {produk.deskripsi?.split(" ")?.length > 10 && <span>...</span>}
                  {/* {j > 1 && <span>
                    {'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.'?.split(" ")?.slice(0,10)?.join(" ")} ...
                  </span>} */}
                </p>
                {/* {JSON.stringify(produk.deskripsi?.split(" "))} */}
              </div>
              {/* <div className={lbl.bg.primary+` mt-3`} style={{height: '4px'}}></div> */}
              <div className={`card-footer bg-whitesmokex bg-orange ${lbl.bg.primary}`}>
              </div>
            </div>
            </a>
          </div>
          ))
          ))}
        </div>

      {/* </Card.Body>
    </Card> */}
  </>
}