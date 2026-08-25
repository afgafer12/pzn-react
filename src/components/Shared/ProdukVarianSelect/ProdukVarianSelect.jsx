import React from "react";
import { Dropdown } from "primereact/dropdown";
import { produkVarianList } from "../../../lib/api/ProdukVarianApi";

export default function ProdukVarianSelect(props) {
  const [dataList, setDataList] = React.useState([]);

  async function fetchData() {
    const response = await produkVarianList();
    const responseBody = response.data;
    // console.log(responseBody);
    if (response.status === 200) {
      setDataList(responseBody.data);
    } else {
      await alertError(responseBody.errors);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return <>
    <Dropdown name={props.name} options={dataList} value={props.value}
      onChange={(e) => props.onChange({target: {
        name: props.name, value: e.target.value ?? null
      }})} optionValue={props.optionValue} optionLabel={ props.optionLabel ?? 'kd_produk'} 
      showClear={true} clearIcon={'pi pi-times me-3'} dropdownIcon={''} editable variant={`${props.disabled ? 'filled' : ''}`} placeholder="-Pilih-" 
      className={`p-inputtext-sm w-100 ${props.disabled ? '' : ''}`}
    />
    {/* <select className="form-control">
      <option value="">-Pilih-</option>
      {dataList.map(item => (
        <option key={item.id} value={item.id}>{item.nama}</option>
      ))}
    </select> */}
  </>;
}