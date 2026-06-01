import {useEffectOnce, useLocalStorage} from "react-use";
import {useEffect, useState} from "react";
import {alertConfirm, alertError, alertSuccess} from "../../lib/alert.js";
import {Link} from "react-router";
import { Card, Table } from "react-bootstrap";
import { getProdukList } from "../../lib/api/ProdukApi.js";
import { labelConfigs as lbl } from "../../helper/LabelConfigs.js";
import ProdukForm from "./ProdukForm.jsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function ProdukList() {

  const [token, _] = useLocalStorage("token", "");
  const [nama, setNama] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [produkList, setContacts] = useState([]);
  const [reload, setReload] = useState(false);

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

  useEffect(() => {
    fetchProduk()
      .then(() => console.log("Contacts fetched"));
  }, [reload])

  useEffectOnce(() => {
  })

  const buttonAksi = (produk) => {
    return  (<Link to={`/dashboard/produk/${produk.id}/edit`} target="_blank" className={lbl.edit.btnIcon}>
              <i className={`${lbl.edit.icon} me-1`}></i>
            </Link>);
  };

  return <>
     <Card>
      <Card.Header>
        Produk
      </Card.Header>
      <Card.Body>
        <Card.Title>Produk</Card.Title>
        
        <div className="text-end mb-3">
          <Link to={`/dashboard/produk/create`} target="_blank" className={lbl.create.btn}>
            <i className={`${lbl.create.icon} me-1`}></i>
            {lbl.create.lbl}
          </Link>
        </div>

        
        <DataTable value={produkList}
          paginator rows={10} rowsPerPageOptions={[3, 1, 10]}
        >
            <Column header="No." body={(data, options) => options.rowIndex + 1}></Column>
            <Column field="nama" header="Nama"></Column>
            <Column field="harga_jual" header="harga_jual"></Column>
            <Column field="harga_beli" header="harga_beli"></Column>
            <Column field="stok" header="stok"></Column>
            <Column field="status" header="status"></Column>
            <Column header="aksi" body={buttonAksi}></Column>
        </DataTable>
        <Button label="Secondary" severity="primary" raised />

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
    <Card className="mt-3">
      <Card.Body>
        <ProdukForm/>
      </Card.Body>
    </Card>
  </>
}