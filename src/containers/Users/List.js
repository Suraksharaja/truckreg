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


let lat =0;

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
        title: 'Role',
        dataIndex: 'Role',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'Active',
        dataIndex: 'isActive',
        filters: [{
          text: 'active',
          value: 1,
        }, {
          text: 'inactive',
          value: 0,
        }], 
        filterMultiple: false,
        onFilter: (value, record) => record.isActive === JSON.parse(value),
        render: (record) => <div> {record === 1 ? 'Yes' : 'No'}</div>
      },
      {
        title: 'Action', 
       render: (record) => <Link to={`/admin/category/edit/${record.id}/${record.ParentId}`}> <Icon type="edit" className="isoEditIcon"/></Link>
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
