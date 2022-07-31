import {useState} from 'react'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'
import FormGroup from 'react-bootstrap/FormGroup'
import { useEffect } from 'react'

function FilterSelect(props) {

    const {id, label, options, loading, enabled, onSelect} = props
    const listId = `${id}-list`
    const inputId = `${id}-input`

    const [content, setContent] = useState('')

    const onSelectEvent = (event) => {
        const value = event.target.value
        setContent(value)
        const option = options.find((option) => option[1] === value)
        if (option) {
            onSelect(option[0], option[1])
        }
    }

    useEffect(() => {
        if (loading || !enabled) {
            setContent('')
        }
    }, [loading, enabled])

    return <FormGroup>
            <FormLabel htmlFor={inputId}>{label}</FormLabel>
            <FormControl id={inputId} list={listId} disabled={!enabled || loading} placeholder={(loading) ? "Loading..." : "Type to choose"} onChange={onSelectEvent} value={content}/>
            <datalist id={listId}>
                {options.map((option) => <option key={option[0]} value={option[1]} label={option[1]} />)}
            </datalist>
        </FormGroup>
}

export default FilterSelect