import {useEffectOnce, useLocalStorage} from "react-use";
import {useEffect, useState} from "react";
import {alertConfirm, alertError, alertSuccess} from "../../lib/alert.js";
import {Link} from "react-router";
import { Card, Table } from "react-bootstrap";
import { getProdukList } from "../../lib/api/ProdukApi.js";
// import { labelConfigs as lbl } from "../../util/LabelConfigs.js";
import JualForm from "./JualForm.jsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button as ButtonPrm } from "primereact/button";
import Button from 'react-bootstrap/Button';
import { formatNumber } from "../../util/ComponentUtil.js";
import { Dialog } from "primereact/dialog";
import { jualDelete, getJualList } from "../../lib/api/JualApi.js";
import lbl from "../../util/LabelConfigs2.js";

export default function JualList() {

  const entitas = 'Penjualan';
  const [jualId, setJualId] = useState("");
  const [jualList, setJualList] = useState([]);
  const [reload, setReload] = useState(false);
  const [visible, setVisible] = useState(false);

  async function fetchJual() {
    const response = await getJualList();
    if (response.status === 200) {
      const responseBody = response.data;
      setJualList(responseBody.data);
      // setTotalPage(responseBody.paging.total_page);
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function deleteProduk(jualId) {
    const isConfirm = await alertConfirm(`Apakah anda yakin ${lbl.delete.lbl} ${entitas}?`)
    if(!isConfirm) return;
    const response = await jualDelete(jualId);
    if (response.status === 200) {
      // const responseBody = response.data;
      fetchJual();
    } else {
      await alertError(responseBody.errors);
    }
  }

  const handleSubmitProduk = ()=>{
    fetchJual();
    setVisible(false);
  }

  useEffect(() => {
    fetchJual()
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

        
        <DataTable value={jualList} size="small"
          paginator rows={10} rowsPerPageOptions={[3, 1, 10]}
        >
            <Column header="No." body={(data, options) => options.rowIndex + 1 + `.`}></Column>
            <Column field="created_at" header="created_at" body={(rowData) => new Date(rowData.created_at)?.toLocaleString()}></Column>
            {/* <Column field="created_at" header="created_at" body={(rowData) => rowData.created_at.toLocaleDateString("id-ID")}></Column> */}
            <Column field="no_trans" header="no_trans"></Column>
            <Column field="user_id" header="user_id"></Column>
            <Column field="status_id" header="status_id"></Column>
            <Column field="bayar_metode_id" header="bayar_metode_id"></Column>
            <Column field="total" header="total" body={(rowData) => formatNumber(rowData.total)}></Column>
            <Column field="tgl_bayar" header="tgl_bayar"></Column>
            {/* <Column header="aksi" body={buttonAksi}></Column> */}
            <Column header="aksi" body={(produk) => {
              return <>
                <Link to={`/jual/${produk.id}/edit`} target="_blank" className={lbl.edit.btnIcon+`btn-smx border me-1`}>
                  <i className={`${lbl.edit.icon} me-1`}></i>
                </Link>
                {/* <button type="button" className={lbl.edit.btnIcon+` me-1`} onClick={() => {setVisible(true); setJualId(produk.id)}}>
                  <i className={`${lbl.edit.icon}`}></i>
                </button> */}
                <Button label="Show" variant={lbl.detil.btnIconVrnt} className={`btn-smx border me-1`} onClick={() => {setVisible(true); setJualId(produk.id)}}>
                  <i className={`${lbl.view.icon}`}></i>
                </Button>
                <button type="button" className={lbl.delete.btnIcon+` me-1`} onClick={() => {deleteProduk(produk.id)}}>
                  <i className={`${lbl.delete.icon}`}></i>
                </button>
              </>
            }}></Column>
            {/* <Column field="toko_id" header="toko_id"></Column> */}
        </DataTable>

      </Card.Body>
    </Card>
    
    <Dialog header="Header" visible={visible} style={{ width: '75vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
      <JualForm id={jualId} onSubmit={handleSubmitProduk} wrapper={'none'}/>
    </Dialog>
  </>
}