import {useEffectOnce, useLocalStorage} from "react-use";
import {useEffect, useState} from "react";
import {alertConfirm, alertError, alertSuccess} from "../../lib/alert.js";
import {Link} from "react-router";
import { Card, Table } from "react-bootstrap";
import { getProdukList } from "../../lib/api/ProdukApi.js";
import { labelConfigs as lbl } from "../../util/LabelConfigs.js";
import ProdukForm from "./ProdukForm.jsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button as ButtonPrm } from "primereact/button";
import Button from 'react-bootstrap/Button';
import { formatNumber } from "../../util/ComponentUtil.js";
import { Dialog } from "primereact/dialog";

export default function ProdukCatalog() {

  const [token, _] = useLocalStorage("token", "");
  const [nama, setNama] = useState("");
  const [produkId, setProdukId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [produkList, setContacts] = useState([]);
  const [reload, setReload] = useState(false);
  const [visible, setVisible] = useState(false);

  async function fetchProduk() {
    const response = await getProdukList(token, {nama, page});
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setContacts(responseBody.data);
      // setTotalPage(responseBody.paging.total_page);
    } else {
      await alertError(responseBody.errors);
    }
  }

  const handleSubmitProduk = ()=>{
    console.log('fetchProduk');
    fetchProduk();
    setVisible(false);
  }

  useEffect(() => {
    fetchProduk()
      .then(() => console.log("Contacts fetched"));
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
    <Card>
      <Card.Header>
        Produk
      </Card.Header>
      <Card.Body>
        <Card.Title>Produk</Card.Title>
        
        <div className="row row-cols-1 row-cols-md-6 g-4">
          {Array.from({ length: 3 }, (_, i) => (
          produkList.map((produk, i) => (
          <div className="col">
            <a href={`${produk.id}/detil-selected`}>
            <div className="card">
              <img src="..." className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{produk.nama}</h5>
                <h5 className="card-title">Rp {produk.harga_jual}</h5>
                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
            </div>
            </a>
          </div>
          ))
          ))}
        </div>
      </Card.Body>
    </Card>
  </>
}