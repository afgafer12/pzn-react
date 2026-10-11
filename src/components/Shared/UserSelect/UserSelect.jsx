import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { getUserList } from "../../../lib/api/UserApi";

export default function UserSelect(props) {
  const [dataList, setDataList] = React.useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try{
      setLoading(true);
      const response = await getUserList();
      if (response.status === 200) {
        const data = response.data.data;
        setDataList(data);
      }
    } catch(err) {
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return <>
    {/* {JSON.stringify(dataList)} */}
    <Dropdown {...props} name={props.name} options={dataList} value={props.value}
      onChange={(e) => props.onChange({target: {
        name: props.name, value: e.target.value ?? '' 
      }})} optionValue={'id'} optionLabel={props.optionLabel ?? 'nama'} 
      showClear clearIcon={'pi pi-times me-3'} editable variant={`${props.disabled ? 'filled' : ''}`} placeholder="Pilih" 
      className={`p-inputtext-sm w-100 ${props.disabled ? '' : ''}`} loading={loading}
    />
  </>
}