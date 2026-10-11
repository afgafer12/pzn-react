import React from "react";
import { getStatusJualList } from "../../../lib/api/StatusJualApi";
import { Dropdown } from "primereact/dropdown";

export default function StatusJualSelect(props) {
  const [dataList, setDataList] = React.useState([]);

  async function fetchData() {
    try{
      const response = await getStatusJualList();
      if (response.status === 200) {
        const data = response.data.data;
        setDataList(data);
      }
    } catch(err) {
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
      className={`p-inputtext-sm w-100 ${props.disabled ? '' : ''}`} loading={true}
    />
  </>
}