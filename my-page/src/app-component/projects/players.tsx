import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { player } from '../../classes/player';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { useLanguageContext } from '../../contexts/language-context';
import { getTextFromJSON } from '../../utils/languageUtils';


const Players = () => {

    const context = useLanguageContext();


    const tableHeader = getTextFromJSON(context.language, "table_headers.header");
    const firstName = getTextFromJSON(context.language, "table_headers.first_name");
    const lastName = getTextFromJSON(context.language, "table_headers.last_name");
    const position = getTextFromJSON(context.language, "table_headers.position");
    const total = getTextFromJSON(context.language, "table_headers.num_awards");
    const years = getTextFromJSON(context.language, "table_headers.years");
    const search = getTextFromJSON(context.language, "table_headers.search")
    const empty = getTextFromJSON(context.language, "table_headers.empty");


    const api = "https://8ufqphbskd.execute-api.us-east-1.amazonaws.com/firstDeploy/";


    const [playersData, setData]: [any[], Dispatch<SetStateAction<any>>] = useState([]);
    const [loading, setLoading] = useState(true);


    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        years: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div>
                <div className='flex justify-content-start'>
                    <span>{tableHeader}</span>
                </div>
                <div className="flex justify-content-end">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder={search} />
                    </span>
                </div>
            </div>
        );
    };

    useEffect(() => {
        const getPlayers = () => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `${api}/BallonDor`);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const parsedData = JSON.parse(xhr.responseText);
                    updatePlayers(parsedData);
                    setLoading(false);
                }
            };
            xhr.send();
        };
    
        const updatePlayers = (players: player[]) => {
            // Modify player positions
            const updatedPlayers = players.map(player => {
                switch (player.position) {
                    case "attacker":
                        return { ...player, positionFr: "attaquant" };
                    case "midfielder":
                        return { ...player, positionFr: "milieu de terrain" };
                    case "defender":
                        return { ...player, positionFr: "défenseur" };
                    case "goalkeeper":
                        return { ...player, positionFr: "gardien de but" };
                    default:
                        console.log("Unknown position:", player.position);
                        return player;
                }
            });
            setData(updatedPlayers);
        };
    
        getPlayers();
    
    }, []);
    



    const header = renderHeader();


    return (
        <DataTable value={playersData} tableStyle={{ minWidth: '50rem' }} filters={filters} filterDisplay="row" paginator rows={10}
            globalFilterFields={['firstName', 'lastName', 'years']} header={header} loading={loading} emptyMessage={empty}>
            <Column field="firstName" header={firstName} sortable style={{ width: '20%' }}></Column>
            <Column field="lastName" header={lastName} sortable style={{ width: '20%' }}></Column>
            <Column field={context.language === "en" ? "position" : "positionFr"} header={position} sortable style={{ width: '20%' }}></Column>
            <Column field="total" header={total} sortable style={{ width: '20%' }}></Column>
            <Column field="years" header={years} sortable style={{ width: '20%' }} body={(rowData) => rowData.years.join(', ')}></Column>
        </DataTable>
    )


}

export default Players;
