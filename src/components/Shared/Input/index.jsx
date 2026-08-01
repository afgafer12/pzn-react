import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';

/**
* @author
* @function Input
**/

const Input = (props) => {

  let input = null;
  switch(props.type){
    case 'select':
      input = <Dropdown {...props} options={props.options} value={props.value}
                onChange={(e) => props.onChange({target: {
                  name: props.name, value: e.target.value ?? '', a11: e.target 
                }})} optionValue={props.optionValue} optionLabel={props.optionLabel} 
                showClear editable className="p-inputtext-sm w-100"
              />
      // input = <Form.Group controlId={props.name}>
      //           {props.label && <Form.Label>{props.label}</Form.Label>}
      //           <select name={props.name}
      //             className="form-select"
      //             value={props.value}
      //             onChange={props.onChange}
      //           >
      //             <option value="">{props.placeholder}</option>
      //             {
      //               props.options.length > 0 ?
      //               props.options.map((option, index) =>
      //                 <option key={index} value={option.value}>{option.name}</option>
      //               ) : null
      //             }
      //           </select>
      //       </Form.Group>
      break;
    case 'number':
      input = <InputNumber name={props.name} value={props.value} 
      onValueChange={(e) => props.onChange(e)} className="p-inputtext-sm w-100" inputClassName="form-control"/>
      // input = <InputNumber name={props.name} value={props.value} 
      // onValueChange={(e) => props.onChange({target: {
      //   name: props.name, value: e.target.value ?? '', a11: e.target 
      // }})} className="p-inputtext-sm"/>
      break;
    case 'text-group':
      input = <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                      {props.groupText}
                  </span>
                  <InputText name={props.name} value={props.value} id={props.name}
                  onChange={(e) => props.onChange(e)} className="p-inputtext-sm" {...props}/>
              </div>
      break;
    case 'password-group':
      input = <div className="p-inputgroup flex-1">
                  <span className="p-inputgroup-addon">
                      {props.groupText}
                  </span>
                  <Password name={props.name} value={props.value} id={props.name}
                  onChange={(e) => props.onChange(e)} feedback={false} tabIndex={1} />
              </div>
      break;
    case 'text':
    default:
      input = <InputText name={props.name} value={props.value} 
                  onChange={(e) => props.onChange(e)} className="p-inputtext-sm w-100"/>
      // input = <input type={'text'}  placeholder={props.placeholder}  value={props.value} onChange={props.onChange}  className="form-control"/>
                
  }


  // return <>
  // <Form.Group controlId={props.name}>
  //     {props.label && <Form.Label>{props.label}</Form.Label>}
  //     {input}
  //     <Form.Text className="text-danger">
  //       {props.errorMsg}
  //     </Form.Text>
  // </Form.Group>
  // </>;
  return <>
  <div className="form-group">
    {props.label && <label htmlFor={props.name} className="form-label">
      {props.label}
    </label>}
    {input}
    <div className="text-danger">
      {props.errorMsg}
    </div>
  </div>
  </>;

 }

export default Input