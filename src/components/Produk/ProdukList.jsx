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

export default function ProdukList() {

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
    // const responseBody = await response.json();
    // console.log(responseBody);

    if (response.status === 200) {
      const responseBody = response.data;
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
            <Link to={`/produk/${produk.id}/edit`} target="_blank" className={lbl.edit.btnIcon+`btn-smx border me-1`}>
              <i className={`${lbl.edit.icon} me-1`}></i>
            </Link>
            <Button label="Show" variant={lbl.detil.btnIconVrnt} className={`btn-smx border me-1`} onClick={() => {setVisible(true); setProdukId(produk.id)}}>
              <i className={`${lbl.detil.icon} me-1`}></i>
            </Button>
            </>;
  };

  return <>
    <Card>
      {/* <Card.Header>
        Produk
      </Card.Header> */}
      <Card.Body>
        <Card.Title>Produk</Card.Title>
        
        <div className="text-end mb-3">
          <Link to={`/produk/create`} target="_blank" className={lbl.create.btn}>
            <i className={`${lbl.create.icon} me-1`}></i>
            {lbl.create.lbl}
          </Link>
        </div>

        
        <DataTable value={produkList} size="small"
          paginator rows={10} rowsPerPageOptions={[3, 1, 10]}
        >
            <Column header="No." body={(data, options) => options.rowIndex + 1}></Column>
            <Column field="nama" header="nama"></Column>
            <Column field="harga_jual" header="harga_jual" body={(rowData) => formatNumber(rowData.harga_jual)}></Column>
            <Column field="harga_beli" header="harga_beli" body={(rowData) => formatNumber(rowData.harga_beli)}></Column>
            <Column field="stok" header="stok"></Column>
            <Column field="status" header="status"></Column>
            <Column header="aksi" body={buttonAksi}></Column>
            <Column field="toko_id" header="toko_id"></Column>
            <Column field="kategori_id" header="kategori_id"></Column>
            <Column field="brand_id" header="brand_id"></Column>
        </DataTable>
        <ButtonPrm label="Secondary" severity="primary" raised />

      </Card.Body>
    </Card>
    <Card className="mt-3">
      <Card.Body>
        {/* <ProdukForm/> */}

        <Table striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Harga Jual</th>
              <th>Harga Beli</th>
              <th>Stok</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {produkList.map((produk, i) => (
            <tr key={i}>
              <td>{i+1}.</td>
              <td>{produk.nama}</td>
              <td>{produk.harga_jual}</td>
              <td>{produk.harga_beli}</td>
              <td>{produk.stok}</td>
              <td>{produk.is_aktif}</td>
              <td>
                <Link to={`/dashboard/produk/${produk.id}/edit`} target="_blank" className={lbl.edit.btnIcon}>
                  <i className={`${lbl.edit.icon} me-1`}></i>
                </Link>
              </td>
            </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
    <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
      <ProdukForm id={produkId} onSubmit={handleSubmitProduk}/>
      {/* {visible && <ProdukForm id={produkId} onSubmit={handleSubmitProduk}/>} */}
    </Dialog>
  </>
}