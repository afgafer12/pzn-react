import {useEffectOnce, useLocalStorage} from "react-use";
import {useEffect, useState} from "react";
import {alertConfirm, alertError, alertSuccess} from "../../lib/alert.js";
import {Link} from "react-router";
import { Button, Card, Table } from "react-bootstrap";
import { getProdukList } from "../../lib/api/ProdukApi.js";
import { labelConfigs as lbl } from "../../helper/LabelConfigs.js";

export default function ProdukList() {

  const [token, _] = useLocalStorage("token", "");
  const [nama, setNama] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [produkList, setContacts] = useState([]);
  const [reload, setReload] = useState(false);

  async function fetchContacts() {
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
    fetchContacts()
      .then(() => console.log("Contacts fetched"));
  }, [reload])

  useEffectOnce(() => {
  })

  return <>
     <Card>
      <Card.Body>
        <Card.Title>Produk</Card.Title>
        
        <Table striped bordered hover>
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
            <tr>
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
  </>
}