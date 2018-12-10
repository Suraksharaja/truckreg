import React, { Component } from 'react';
import { Icon } from 'antd';
import { Table } from 'antd';
import Form from '../../components/uielements/form';
import { PropTypes } from 'prop-types';
import Button from '../../components/uielements/button'; 
import Driver from './drivers';
import { Card } from 'antd';
import { rtl } from '../../settings/withDirection';
import axios from '../../axios';
import moment from 'moment';

let lat =0;
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2FpQGdtYWlsLmNvbSIsInVzZXJJZCI6MzUsImRhdGUiOiIyMDE4LTEwLTE4VDExOjQ0OjE4LjcyM1oifSwiaWF0IjoxNTM5ODYzMDU4LCJleHAiOjE1NDUwNDcwNTh9.aI--gM5RUnit35NzZMeQ-Z1KC9UhvANAxx86Oz5eyLk";
let token = '';
class DriversList extends Component {

  constructor(props) {
    super(props);
    this.state = {
    value: [{Name: 'aa'}],
    selectedRowKeys: [],
    pagination: {},
    loading: false,
    driverTable: false,
    driverForm: true,
    driverSave: true,
    driverSubmit: true,
    driverTitle: 'DRIVERS LIST',
    driver: []
  };

 }
 upadte() {
lat++;
return lat;
 }

 addDriver() {
  this.setState({
    driverForm: false,
    driverSubmit: false,
    driverTable: true,
    driverSave: true,
    driverTitle: 'ADD DRIVER' 
  });
}
cancelDriver() {
  this.setState({
    driverTable: false,
    driverForm: true,
    driverSave: true,
    driverSubmit: true,
    driverTitle: 'DRIVERS LIST'
  });
}
editDriver(val) {
  this.setState({
    driverForm: false,
    driverSubmit: true,
    driverTable: true,
    driverSave: false,
    driverTitle: 'EDIT DRIVER',
    driver: val
   
  });
  console.log('u r getting');
  console.log(val);
}

componentDidMount() {
  if (localStorage.getItem('userDetails')) {
    const Existing = localStorage.getItem('userDetails');
    if (Existing != null) {
      const parseExisting = JSON.parse(Existing);
      if (parseExisting) {
          token = parseExisting.userData.Token;
          this.getDriver();
      }
    }

  }
}
getDriver() {
 let self =this;
 axios.get('/api/admin/driver',
 {headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token }})
 .then(function (response) {
    self.setState({value: response.data });
 })
 .catch(function (error) {
   console.error(error);
 });
}

  render() {
   
    const margin = {
      margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
      marginTop: '5px'
    };
    const columns = [
      {
        title: 'Name',
        dataIndex: 'FirstName',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Name.localeCompare(b.Name)
      },    {
        title: 'DL',
        dataIndex: 'DL',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Name.localeCompare(b.Name)
      },    {
        title: 'DOB',
        dataIndex: 'DOB',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Name.localeCompare(b.Name),
        render: (record) => <div> {moment(record).format("DD/MM/YYYY")}</div>
      }, 
      {
        title: 'Phone',
        dataIndex: 'Phone',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'Issued State',
        dataIndex: 'IssuedState',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'Issued Date ',
        dataIndex: 'IssuedDate',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : '',
        render: (record) => <div> {moment(record).format("DD/MM/YYYY")}</div>
      },
      {
        title: 'Expiration Date ',
        dataIndex: 'ExpDate',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : '',
        render: (record) => <div> {moment(record).format("DD/MM/YYYY")}</div>
      },
      {
        title: 'Medical',
        dataIndex: 'Medical',
        // filters: [{
        //   text: 'active',
        //   value: 1,
        // }, {
        //   text: 'inactive',
        //   value: 0,
        // }], 
        // filterMultiple: false,
        // onFilter: (value, record) => record.isActive === JSON.parse(value),
        // render: (record) => <div> {record === 1 ? 'Yes' : 'No'}</div>
      },
      {
        title: 'Action', 
        render: (record) => <div style={{cursor:'pointer'}} onClick = {() =>this.editDriver(record) }> <Icon type="edit" className="isoEditIcon"/></div>
      }
    ];
    return (
      <Card title={<h4 style={{color: 'darkblue', 'font-weight': 'bold'}}>{this.state.driverTitle}</h4>}>
      <div hidden={this.state.driverTable}>

       <Button type="primary"  onClick={()=>{ this.addDriver() }} style={{float: 'right'}} >
                         Add Driver
                        </Button>
    
                        <br/><br/>
                        <div>
        <Table columns={columns} bordered dataSource={this.state.value} rowKey = {this.upadte}   pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleChange}/>
        </div>
        </div>
        <div  hidden={this.state.driverForm}>
        <span>
        { <Driver  add ={this.state.driverSubmit} update={this.state.driverSave} driver={this.state.driver} addressId= {this.props.addressId}/>}
       
                        <Button type='primary' htmlType="submit" style={margin} onClick={()=>{ this.cancelDriver() }}>
                          CANCEL
                        </Button>
                        </span>
          </div>
        
      </Card>

    );
  }
}
const WrappedFormWIthSubmissionButton = Form.create()(DriversList);
export default WrappedFormWIthSubmissionButton;
DriversList.contextTypes = {
    intl: PropTypes.object.isRequired,
  };
  