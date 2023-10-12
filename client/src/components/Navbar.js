import React, { useState } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@chakra-ui/react'

export default function Navbar() {
    const links = ['Home', 'Employees', 'Groups', 'Rooms', 'Schedules']
    return (
        <Breadcrumb className='nav' p='8'>
            {links.map((link) => (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className='nav-a'
                        href={'#' + link.toLowerCase()}
                    >
                        {link}
                    </BreadcrumbLink>
                </BreadcrumbItem>

            ))}
        </Breadcrumb>
    );
};