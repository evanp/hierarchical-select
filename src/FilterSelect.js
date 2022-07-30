import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import FormSelect from 'react-bootstrap/FormSelect'
import FormControl from 'react-bootstrap/FormControl'

function FilterSelect(props) {
    const {options, loading, enabled, onSelect} = props

    const [filter, setFilter] = useState('')

    const filteredOptions = (filter.length === 0) ?
        options :
        options.filter((option) => option[1].toLowerCase().includes(filter.toLowerCase()))

    const onFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const onSelectChange = (event) => {
        setFilter('')
        onSelect(event.target.value)
    }

    useEffect(() => {
        setFilter('')
    }, [options, loading])

    return <Container>
        <Row>
        {
            loading &&
            <FormControl id="filter" disabled={true} value="Loading..." />
        }
        {
            !loading &&
            <FormControl id="filter" disabled={!enabled} value={filter} onChange={onFilterChange} />
        }
        </Row>
        <Row>
        {
            loading &&
            <FormSelect id="places" disabled={true}>
                <option key="loading" value="loading">Loading...</option>
            </FormSelect>
        }
        {
            !loading &&
            <FormSelect id="places" disabled={!enabled} onChange={onSelectChange}>
                {filteredOptions.map((option) => <option key={option[0]} value={option[0]}>{option[1]}</option>)}
            </FormSelect>
        }
        </Row>
    </Container>
}

export default FilterSelect