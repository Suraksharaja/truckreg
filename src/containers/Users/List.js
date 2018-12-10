import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { Table } from 'antd';
import basicStyle from '../../settings/basicStyle';
import LayoutContentWrapper from "../../components/utility/layoutWrapper.js";
import { Card, Col, Row  } from 'antd';
import Button from '../../components/uielements/button';
import { rtl } from '../../settings/withDirection';
import './users.css';
import axios from '../../axios';

let lat =0;
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2FpQGdtYWlsLmNvbSIsInVzZXJJZCI6MzUsImRhdGUiOiIyMDE4LTEwLTE4VDExOjQ0OjE4LjcyM1oifSwiaWF0IjoxNTM5ODYzMDU4LCJleHAiOjE1NDUwNDcwNTh9.aI--gM5RUnit35NzZMeQ-Z1KC9UhvANAxx86Oz5eyLk";
let token = '';
export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
    value: [],
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
  this.props.history.push('/admin/category/add');
 }

  componentDidMount() {
    let self = this;
    if (localStorage.getItem('userDetails')) {
      console.log(1);
      const Existing = localStorage.getItem('userDetails');
      console.log(2);
      if (Existing != null) {
        console.log(3);
        const parseExisting = JSON.parse(Existing);
        if (parseExisting) {
          console.log(4);
           // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2FpQGdtYWlsLmNvbSIsInVzZXJJZCI6MzUsImRhdGUiOiIyMDE4LTEwLTE4VDExOjQ0OjE4LjcyM1oifSwiaWF0IjoxNTM5ODYzMDU4LCJleHAiOjE1NDUwNDcwNTh9.aI--gM5RUnit35NzZMeQ-Z1KC9UhvANAxx86Oz5eyLk';//
            token= parseExisting.userData.Token;
          // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic3VyZXNoLmVkZGFsYSsyQHlhaG9vLmNvbSIsInVzZXJJZCI6MjcsImRhdGUiOiIyMDE4LTEwLTE2VDA5OjM5OjIxLjg3OVoifSwiaWF0IjoxNTM5NjgyNzYxLCJleHAiOjE1NDQ4NjY3NjF9.5foRFL0EWHwsXBjqS2wyXUsUGy064mdfPStNnMirC5g';
            console.log(parseExisting.userData.Token);
              self.getUsers();
            
        }
      }
  
	  }
  }
  getUsers() {
    let self =this;
    console.log(token);
    axios.get('/api/admin/users',
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
        dataIndex: 'FirstName',
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
        title: 'Role',
        dataIndex: 'Role_Id',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'Action', 
       render: (record) => <Link to={{pathname:`/admin/users/edit`, state: { userinfo: record}}}> <Icon type="edit" className="isoEditIcon"/></Link>
      }
    ];
    return (
       
      <LayoutContentWrapper>
          <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={24} sm={24} xs={24} style={colStyle}>
       <Card title={<h2 style={{color: 'darkblue', 'font-weight': 'bold'}}>Users List</h2>}>
       <Button type="primary"   style={margin} >
                        
                         <Link to={'/admin/users/add'} className="near-white fw1 f7"> Add User</Link>
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
