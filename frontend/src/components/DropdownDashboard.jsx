import { Dropdown } from 'react-bootstrap';
import { createContext, useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
export default function DropBar(props){
  const [selected, setSelected] = useState("Select");
  const [selected2, setSelected2] = useState("Select")
  const Ddlhandle=(e)=>{
    setSelected(e);
  }
  const Ddlhandle2=(e)=>{
    setSelected2(e);
  }

  return(
    <>

      <DropdownButton
        onSelect={Ddlhandle}
        id="dropdown-button-dark"
        variant="dark"
        menuVariant="dark"
        title={selected}
        className="mt-2"
        >
        <Dropdown.ItemText href="#/select" >Select a country</Dropdown.ItemText>
        <Dropdown.Divider />
        <Dropdown.Item href="#/action-1">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Something else</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Separated link</Dropdown.Item>
      </DropdownButton>


    {props.flag && selected==props.flag2 && 
      <DropdownButton
        onSelect={Ddlhandle2}
        id="dropdown-button-dark"
        variant="dark"
        menuVariant="dark"
        title={selected2}
        className="mt-2"
        >
        <Dropdown.ItemText href="#/select" >Select a country</Dropdown.ItemText>
        <Dropdown.Divider />
        <Dropdown.Item href="#/action-1">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Something else</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Separated link</Dropdown.Item>
      </DropdownButton>
    }
    </>
  )
}