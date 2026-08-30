import React from "react";
import { tokoList } from "../../../lib/api/TokoApi";
import { Dropdown } from "primereact/dropdown";

export default function TokoSelectt(props) {
  const [dataList, setDataList] = React.useState([]);

  async function fetchData() {
    const response = await tokoList();
    const responseBody = await response.json();
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

  return (
    <Dropdown {...props} name={props.name} options={dataList} value={props.value}
      onChange={(e) => props.onChange({target: {
        name: props.name, value: e.target.value ?? '' 
      }})} optionValue={'id'} optionLabel={'nama'} 
      showClear clearIcon={'pi pi-times me-3'} editable variant={`${props.disabled ? 'filled' : ''}`} placeholder="-Pilih-" 
      className={`p-inputtext-sm w-100 ${props.disabled ? '' : ''}`}
    />
    // <select className="form-control" {...props}>
    //   <option value="">-Pilih-</option>
    //   {dataList.map(item => (
    //     <option key={item.id} value={item.id}>{item.nama}</option>
    //   ))}
    // </select>
  );
}