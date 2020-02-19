import React, { useEffect, useState } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import Content from '../../components/content';
import { ProductService } from './../../services/products.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import { CreateProductModal } from './createProduct';

const ActionButton = styled.a`
    cursor: pointer;
`

export const Products = () => {

    const service = new ProductService()
    const [products, setProducts] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    const update = (e) => {
        console.log(e)
    }

    const deleteItem = (id) => {
        service.delete(id)
            .then(res => {
                console.log("sucesso!")
            })
            .catch(err => console.log(err))
    }

    const showModal = () => {
        setModalVisible(true)
    }

    const hideModal = () => {
        setModalVisible(false)
    }

    const getProducts = async () => {
        await service.read()
            .then((res) => {
                const data = res.data
                setProducts(data)
            })
    }

    const h1 = {
        "float": "left",
        "display": "inline"
    }

    const addButton = {
        "float": "right",
        "display": "inline",
        "marginTop": "15px",
        "padding": "5px 15px 5px 15px",
        "background": "#343a40",
        "color": "#fff",
        "borderRadius": "8px"
    }

    useEffect(() => {
        getProducts()
    }, [products])

    return (
        <Content>
            <Row>
                <Col>
                    <div>
                        <h1 style={h1}>Products!</h1>
                        <CreateProductModal show={modalVisible} handleClose={hideModal} />
                        <ActionButton style={addButton} onClick={() => showModal()}>
                            <FontAwesomeIcon icon={faPlus} />
                        </ActionButton>
                    </div>
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
                                                <ActionButton onClick={() => update(item)} >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </ActionButton>
                                            </td>
                                            <td>
                                                <ActionButton onClick={() => deleteItem(item.id)} >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </ActionButton>
                                            </td>
                                        </tr >
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Content>
    );
}