import React from 'react';
import logo from './logo.svg';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/arya-orange/theme.css'
import { Menubar } from 'primereact/menubar';


const CustomMenu = () => {

    const items = [
        {
            label: 'About Me',
            icon: 'pi pi-user',
            url: './about'
        },
        {
            label: 'Resume',
            icon: 'pi pi-file-pdf',
        },
        {
            label: 'Work Samples',
            icon: 'pi pi-file-edit'
        }
    ];

    return (
        <div className="Menu">
            <Menubar model={items} className='mb-2' />
        </div>
    );
}
export default CustomMenu;