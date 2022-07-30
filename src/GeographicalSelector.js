import React, {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import FilterSelect from './FilterSelect'

const server="http://api.geonames.org/"
const username="evanprodromou"

async function getCountries() {
    const url = `http://api.geonames.org/countryInfoJSON?username=${username}`
    const response = await fetch(url)
    const data = await response.json()
    return data.geonames.map((country) => [country.countryCode, country.countryName])
}

async function getRegions(country) {
    const url = `http://api.geonames.org/searchJSON?country=${country}&fcode=ADM1&username=${username}`
    const response = await fetch(url)
    const data = await response.json()
    return data.geonames.map((region) => [region.countryCode+'-'+region.adminCode1, region.name])
}

async function getCities(region) {
    const [country, adm1] = region.split('-')
    const url=`http://api.geonames.org/searchJSON?featureClass=P&adminCode1=${adm1}&country=${country}&username=${username}`
    const response = await fetch(url)
    const data = await response.json()
    return data.geonames.map((city) => [city.geonameId, city.name])
}

function GeographicalSelector(props) {

    const {onSelect} = props
    
    const [countries, setCountries] = useState([])
    const [countriesLoading, setCountriesLoading] = useState(false)
    
    const [regions, setRegions] = useState([])
    const [regionsLoading, setRegionsLoading] = useState(false)
    const [regionsEnabled, setRegionsEnabled] = useState(false)

    const [cities, setCities] = useState([])
    const [citiesLoading, setCitiesLoading] = useState(false)
    const [citiesEnabled, setCitiesEnabled] = useState(false)

    // Initial state

    useEffect(() => {
        if (countries.length == 0 && !countriesLoading) {
            setCountriesLoading(true)
            getCountries().then((results) => {
                setCountries(results)
                setCountriesLoading(false)
            })
        }
    }, [countries, countriesLoading])

    const selectCountry = (id, name) => {
        setRegionsLoading(true)
        setCitiesEnabled(false)
        setCities([])
        getRegions(id).then((results) => {
            setRegions(results)
            setRegionsLoading(false)
            setRegionsEnabled(true)
        })
        onSelect(id, name, "country")
    }

    const selectRegion = (id, name) => {
        setCitiesLoading(true)
        getCities(id).then((results) => {
            setCities(results)
            setCitiesLoading(false)
            setCitiesEnabled(true)
        })
        onSelect(id, name, "region")
    }

    const selectCity = (id, name) => {
        onSelect(id, name, "city")
    }

    return <Form>
        <Container>
            <Row>
                <Col><FilterSelect id="countries" options={countries} loading={countriesLoading} enabled={true} onSelect={selectCountry} /></Col>
                <Col><FilterSelect id="regions" options={regions} loading={regionsLoading} enabled={regionsEnabled} onSelect={selectRegion} /></Col>
                <Col><FilterSelect id="cities" options={cities} loading={citiesLoading} enabled={citiesEnabled} onSelect={selectCity} /></Col>
            </Row>
        </Container>
    </Form>
        
}

export default GeographicalSelector