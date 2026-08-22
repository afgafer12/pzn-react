import {useEffectOnce, useLocalStorage} from "react-use";
import {useEffect, useState} from "react";
import {alertConfirm, alertError, alertSuccess} from "../../lib/alert.js";
import {Link} from "react-router";
import { Card, Table } from "react-bootstrap";
import { getProdukList } from "../../lib/api/ProdukApi.js";
import { labelConfigs as lbl } from "../../util/LabelConfigs.js";
import JualForm from "./JualForm.jsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button as ButtonPrm } from "primereact/button";
import Button from 'react-bootstrap/Button';
import { formatNumber } from "../../util/ComponentUtil.js";
import { Dialog } from "primereact/dialog";
import { jualList } from "../../lib/api/JualApi.js";

export default function JualList() {

  const [token, _] = useLocalStorage("token", "");
  const [nama, setNama] = useState("");
  const [jualId, setJualId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [produkList, setContacts] = useState([]);
  const [reload, setReload] = useState(false);
  const [visible, setVisible] = useState(false);

  async function fetchProduk() {
    const response = await jualList(token, {nama, page});
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

    setJualId(1);
  }, [reload])

  useEffectOnce(() => {
  })

  const buttonAksi = (produk) => {
    return  <>
            <Link to={`/jual/${produk.id}/edit`} target="_blank" className={lbl.edit.btnIcon+`btn-smx border me-1`}>
              <i className={`${lbl.edit.icon} me-1`}></i>
            </Link>
            <Button label="Show" variant={lbl.detil.btnIconVrnt} className={`btn-smx border me-1`} onClick={() => {setVisible(true); setJualId(produk.id)}}>
              <i className={`${lbl.detil.icon} me-1`}></i>
            </Button>
            </>;
  };

  return <>
    <Card>
      <Card.Header>
        {/* Produk */}
        <Card.Title>{lbl.jual.lbl}</Card.Title>
      </Card.Header>
      <Card.Body>
        {/* <Card.Title>Produk</Card.Title> */}
        
        <div className="text-end mb-3">
          <Link to={`/dashboard/jual/create`} target="_blank" className={lbl.create.btn}>
            <i className={`${lbl.create.icon} me-1`}></i>
            {lbl.create.lbl}
          </Link>
        </div>

        
        <DataTable value={produkList} size="small"
          paginator rows={10} rowsPerPageOptions={[3, 1, 10]}
        >
            <Column header="No." body={(data, options) => options.rowIndex + 1 + `.`}></Column>
            <Column field="no_trans" header="no_trans"></Column>
            <Column field="user_id" header="user_id"></Column>
            <Column field="status_id" header="status_id"></Column>
            <Column field="bayar_metode_id" header="bayar_metode_id"></Column>
            <Column field="total" header="total" body={(rowData) => formatNumber(rowData.total)}></Column>
            <Column field="tgl_bayar" header="tgl_bayar"></Column>
            {/* <Column header="aksi" body={buttonAksi}></Column> */}
            <Column header="aksi" body={(produk) => {
              return <>
                {/* <Link to={`/dashboard/jual/${produk.id}/edit`} target="_blank" className={lbl.edit.btnIcon+`btn-smx border me-1`}>
                  <i className={`${lbl.edit.icon} me-1`}></i>
                </Link> */}
                <button type="button" className={lbl.edit.btnIcon+` me-1`} onClick={() => {setVisible(true); setJualId(produk.id)}}>
                  <i className={`${lbl.edit.icon} me-1`}></i>
                </button>
                <Button label="Show" variant={lbl.detil.btnIconVrnt} className={`btn-smx border me-1`} onClick={() => {setVisible(true); setJualId(produk.id)}}>
                  <i className={`${lbl.detil.icon} me-1`}></i>
                </Button>
              </>
            }}></Column>
            {/* <Column field="toko_id" header="toko_id"></Column> */}
        </DataTable>

      </Card.Body>
    </Card>
    
    <Dialog header="Header" visible={visible} style={{ width: '75vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
      <JualForm id={jualId} onSubmit={handleSubmitProduk} wrapper={'none'}/>
      {/* {visible && <ProdukForm id={jualId} onSubmit={handleSubmitProduk}/>} */}
    </Dialog>
  </>
}