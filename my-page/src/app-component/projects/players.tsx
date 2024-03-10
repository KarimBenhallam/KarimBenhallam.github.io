import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { player } from '../../classes/player';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';


const Players = () => {

    const api = "https://localhost:7183";

    const [playersData, setData]: [any[], Dispatch<SetStateAction<any>>] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        years: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e : any) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
                </span>
            </div>
        );
    };

    useEffect(() =>{
        const getPlayers = () => {
            console.log(" yeh");
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `${api}/BallonDor`);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    setData(JSON.parse(xhr.responseText));
                }
            };
            xhr.send();
        }

        getPlayers();

    }, [])

    

    const header = renderHeader();

    



    return(
    <DataTable value={playersData} tableStyle={{ minWidth: '50rem' }} filters={filters} filterDisplay="row" paginator rows={10}
    globalFilterFields={['firstName', 'lastName', 'years']} header={header} emptyMessage="No player found.">
        <Column field="firstName" header="First name" sortable style={{ width: '20%' }}></Column>
        <Column field="lastName" header="Last Name" sortable style={{ width: '20%' }}></Column>
        <Column field="position" header="Position" sortable style={{ width: '20%' }}></Column>
        <Column field="total" header="Number of awards" sortable style={{ width: '20%' }}></Column>
        <Column field="years" header="Winning years" style={{ width: '20%' }} body={(rowData) => rowData.years.join(', ')}></Column>
    </DataTable>
    )


}

export default Players;
