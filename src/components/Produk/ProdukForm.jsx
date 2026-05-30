import {Link, useParams} from "react-router";
import {useState} from "react";
import {contactDetail, contactUpdate} from "../../lib/api/ContactApi.js";
import {useEffectOnce, useLocalStorage} from "react-use";
import {alertError, alertSuccess} from "../../lib/alert.js";
import { produkCreate, produkDetil } from "../../lib/api/ProdukApi.js";
import { Card } from "react-bootstrap";

export default function ProdukForm() {

  const [token, _] = useLocalStorage("token", "");
  const {id} = useParams();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [produkForm, setProdukForm] = useState({});
  const [varianFormArr, setVarianFormArr] = useState([]);

  const handleChange = (e) => {
    setProdukForm({
      ...produkForm,
      [e.target.name]: e.target.value
    });
  };


  async function fetchContact() {
    const response = await produkDetil(token, id);
    const responseBody = await response.json();
    // console.log(responseBody);

    if (response.status === 200) {
      // setFirstName(responseBody.data.nama);
      // setLastName(responseBody.data.last_name);
      // setEmail(responseBody.data.email);
      // setPhone(responseBody.data.phone);
      setProdukForm(responseBody.data);
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function create() {
    const response = await produkCreate(token, produkForm);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Contact created successfully");
    } else {
      await alertError(responseBody.errors);
    }
  }
  async function update() {
    // const response = await produkUpdate(token, produkForm);
    // const responseBody = await response.json();
    // console.log(responseBody);

    // if (response.status === 200) {
    //   await alertSuccess("Contact updated successfully");
    // } else {
    //   await alertError(responseBody.errors);
    // }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if(!produkForm.id){
      create()
    }else{
      update()
    }
  }

  useEffectOnce(() => {
    fetchContact()
      .then(() => console.log("Contact detail fetched successfully"));
  })

  return <>
    <Card>
      <Card.Body>
        <Card.Title>Produk</Card.Title>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <label className="form-label">toko_id</label>
              <input type="text" id="toko_id" name="toko_id"
                value={produkForm?.toko_id} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-12"></div>
            <div className="col-sm-6">
              <label className="form-label">nama</label>
              <input type="text" id="nama" name="nama"
                value={produkForm?.nama} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label">kd_produk</label>
              <input type="text" id="kd_produk" name="kd_produk"
                value={produkForm?.kd_produk} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label">slug</label>
              <input type="text" id="slug" name="slug"
                value={produkForm?.slug} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label">kategori_id</label>
              <input type="text" id="kategori_id" name="kategori_id"
                value={produkForm?.kategori_id} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label">kategori_id</label>
              <input type="text" id="kategori_id" name="kategori_id"
                value={produkForm?.kategori_id} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label">brand_id</label>
              <input type="text" id="brand_id" name="brand_id"
                value={produkForm?.brand_id} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label">satuan</label>
              <input type="text" id="satuan" name="satuan"
                value={produkForm?.satuan} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-sm-6">
              <label className="form-label">status</label>
              <input type="text" id="status" name="status"
                value={produkForm?.status} onChange={handleChange}
                className="form-control" />
            </div>
            <div className="col-12"></div>
            <div className="col-sm-6">
              <label className="form-label">deskripsi</label>
              <textarea id="deskripsi" name="deskripsi"
                value={produkForm?.deskripsi} onChange={handleChange}
                className="form-control"></textarea>
            </div>
            <div className="col-12">
              <Card className="mt-3">
                <Card.Body>
                  <table className="table table-bodered table-sm">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>kd_produk</th>
                        <th>stok</th>
                        <th>harga_jual</th>
                        <th>harga_beli</th>
                        <th>warna</th>
                        <th>ukuran</th>
                      </tr>
                    </thead>
                    <tbody>
                      {produkForm?.produk_varian?.map((varian, i) => (
                        <tr>
                          <td>{i+1}.</td>
                          <td>
                            <input type="text" id="kd_produk" name="kd_produk"
                              value={varian?.kd_produk} onChange={handleChange}
                              className="form-control" />
                          </td>
                          <td>
                            <input type="number" id="stok" name="stok"
                              value={varian?.stok} onChange={handleChange}
                              className="form-control" />
                          </td>
                          <td>
                            <input type="number" id="harga_jual" name="harga_jual"
                              value={varian?.harga_jual} onChange={handleChange}
                              className="form-control" />
                          </td>
                          <td>
                            <input type="number" id="harga_beli" name="harga_beli"
                              value={varian?.harga_beli} onChange={handleChange}
                              className="form-control" />
                          </td>
                          <td>
                            <input type="text" id="warna" name="warna"
                              value={varian?.warna} onChange={handleChange}
                              className="form-control" />
                          </td>
                          <td>
                            <input type="text" id="ukuran" name="ukuran"
                              value={varian?.ukuran} onChange={handleChange}
                              className="form-control" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="row justify-content-end mt-3">
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">
                {produkForm?.id ? 'Ubah' : 'Tambah'}
              </button>    
            </div>
          </div>

        </form>
        <pre>
          {JSON.stringify(produkForm, null, 2)}
        </pre>
      </Card.Body>
    </Card>
  </>
}