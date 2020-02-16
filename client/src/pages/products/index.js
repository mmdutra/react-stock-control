import React, { useEffect, useState } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import Content from '../../components/content';
import { ProductService } from './../../services/products.service'

export const Products = () => {

    const service = new ProductService()
    const [products, setProducts] = useState([])

    useEffect(() => {
        service.read().then((res) => {
            const data = res.data
            const productRows = data.map((item, index) => {
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
                    </tr>
                )
            })

            setProducts(productRows)
        })
    })

    return (
        <Content>
            <Row>
                <Col>
                    <h1>Products!</h1>
                    <Table hover size="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Qtd</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Content>
    );
}