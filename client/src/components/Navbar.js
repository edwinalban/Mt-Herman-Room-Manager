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
        <Breadcrumb className='nav'>
            {links.map((link, index) => (
                <BreadcrumbItem key={index}>
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