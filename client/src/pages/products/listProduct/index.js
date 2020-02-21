import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Table } from 'react-bootstrap'
import styled from 'styled-components'

const ActionButton = styled.a`
    cursor: pointer;
`

export const ListProduct = ({ products, updateItem, removeItem }) => {
    return (
        <Table hover size="sm">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Qtd</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.brand}
                                </td>
                                <td>
                                    {item.qtd}
                                </td>
                                <td>
                                    <ActionButton onClick={() => updateItem(item)} >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </ActionButton>
                                </td>
                                <td>
                                    <ActionButton onClick={() => removeItem(item.id)} >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </ActionButton>
                                </td>
                            </tr >
                        )
                    })
                }
            </tbody>
        </Table>
    );
}