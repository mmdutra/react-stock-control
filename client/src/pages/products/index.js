import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Content from '../../components/content'
import { ProductService } from './../../services/products.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { CreateProductModal } from './createProduct'
import { ListProduct } from './listProduct'

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

    const removeItem = (id) => {
        service.delete(id)
            .then(res => {
                console.log(res)
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
                    <ListProduct products={products} updateItem={update} removeItem={removeItem} />
                </Col>
            </Row>
        </Content>
    );
}