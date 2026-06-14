import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

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
      onValueChange={(e) => props.onChange(e)} className="p-inputtext-sm w-100"/>
      // input = <InputNumber name={props.name} value={props.value} 
      // onValueChange={(e) => props.onChange({target: {
      //   name: props.name, value: e.target.value ?? '', a11: e.target 
      // }})} className="p-inputtext-sm"/>
      break;
    case 'text':
    default:
      input = <Form.Group controlId={props.name}>
                {props.label && <Form.Label>{props.label}</Form.Label>}
                {/* <Form.Control
                    type={props.type} 
                    placeholder={props.placeholder} 
                    value={props.value}
                    onChange={props.onChange}
                    {...props}
                /> */}
                <InputText name={props.name} value={props.value} 
                  onChange={(e) => props.onChange(e)} className="p-inputtext-sm w-100"/>
                <Form.Text className="text-muted">
                  {props.errorMessage}
                </Form.Text>
            </Form.Group>
  }


  return input;

 }

export default Input