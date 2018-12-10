import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { Table } from 'antd';
import basicStyle from '../../settings/basicStyle';
import LayoutContentWrapper from "../../components/utility/layoutWrapper.js";
import { Card, Col, Row  } from 'antd';
import Button from '../../components/uielements/button';
import { rtl } from '../../settings/withDirection';
import './customers.css';
import axios from '../../axios';
let lat =0;
let token = '';
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2FpQGdtYWlsLmNvbSIsInVzZXJJZCI6MzUsImRhdGUiOiIyMDE4LTEwLTE4VDExOjQ0OjE4LjcyM1oifSwiaWF0IjoxNTM5ODYzMDU4LCJleHAiOjE1NDUwNDcwNTh9.aI--gM5RUnit35NzZMeQ-Z1KC9UhvANAxx86Oz5eyLk";
export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
    value: [{Name: 'aa'}],
    selectedRowKeys: [],
    pagination: {},
    loading: false,

  };

 }
 upadte() {
lat++;
return lat;
 }

 addCat() {
  this.props.history.push('/admin/customers/addInfo');
 }

 componentDidMount() {
  let self = this;
  if (localStorage.getItem('userDetails')) {
    const Existing = localStorage.getItem('userDetails');
    if (Existing != null) {
      const parseExisting = JSON.parse(Existing);
      if (parseExisting) {
          token = parseExisting.userData.Token;
          self.getCustomer();
      }
    }
  }
}
 getCustomer() {
  let self =this;
  axios.get('/api/admin/customer',
  {headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token }})
  .then(function (response) {
    console.log('here');
    console.log(response)
    // let manufList = _.where(response.data, {Active: true});
     self.setState({value: response.data });
  })
  .catch(function (error) {
    console.error(error);
  });
}

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const margin = {    float: 'right',
      margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0'
    };
    const columns = [
      {
        title: 'Name',
        dataIndex: 'Name',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Name.localeCompare(b.Name)
      }, 
      {
        title: 'Email',
        dataIndex: 'Email',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'Phone',
        dataIndex: 'Phone',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'Contact Person',
        dataIndex: 'ContactPerson',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      // {
      //   title: 'Active',
      //   dataIndex: 'isActive',
      //   filters: [{
      //     text: 'active',
      //     value: 1,
      //   }, {
      //     text: 'inactive',
      //     value: 0,
      //   }], 
      //   filterMultiple: false,
      //   onFilter: (value, record) => record.isActive === JSON.parse(value),
      //   render: (record) => <div> {record === 1 ? 'Yes' : 'No'}</div>
      // },
      {
        title: 'Action', 
        render: (record) => <Link  to={{pathname:`/admin/customers/edit/1`, state: { info: record}}}> <Icon type="edit" className="isoEditIcon"/></Link>
      }
    ];
    return (
       
      <LayoutContentWrapper>
          <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} sm={24} xs={24} style={colStyle}>
       <Card title={<h2 style={{color: 'darkblue', 'font-weight': 'bold'}}>Customer List</h2>}>
       <Button type="primary"  onClick={()=>{ this.addCat() }} style={margin} >
                         Add Customer Info
                        </Button>
                        <br/>
        <Table columns={columns} bordered dataSource={this.state.value} rowKey = {this.upadte}   pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleChange}/>
        </Card>
      </Col>
      </Row>

      </LayoutContentWrapper>

    );
  }
}
