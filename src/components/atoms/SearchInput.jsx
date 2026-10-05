import Form from 'react-bootstrap/Form';

function SearchInput({value, onChange,placeholder = "Buscar"}){
    return(
        <Form.Control 
        type= "text" 
        placeholder= {placeholder} 
        value = {value} 
        onChange={onChange}/>
     );
}

export default SearchInput;