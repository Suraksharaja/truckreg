import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { Table, Card } from 'antd';
import Form from '../../components/uielements/form';
import { PropTypes } from 'prop-types';
import { rtl } from '../../settings/withDirection';
import Truck from './trucks';
import Button from '../../components/uielements/button'; 
import axios from '../../axios';
let lat =0;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2FpQGdtYWlsLmNvbSIsInVzZXJJZCI6MzUsImRhdGUiOiIyMDE4LTEwLTE4VDExOjQ0OjE4LjcyM1oifSwiaWF0IjoxNTM5ODYzMDU4LCJleHAiOjE1NDUwNDcwNTh9.aI--gM5RUnit35NzZMeQ-Z1KC9UhvANAxx86Oz5eyLk";
class TrucksList extends Component {

  constructor(props) {
    super(props);
    this.state = {
    value: [{Name: 'aa'}],
    selectedRowKeys: [],
    pagination: {},
    loading: false,
    truckTable: false,
    truckForm: true,
    truckSave: true,
    truckSubmit: true,
    truckTitle: 'TRUCKS LIST',
    truck: []

  };

 }
 addTruck() {
  this.setState({
    truckForm: false,
    truckSubmit: false,
    truckTable: true,
    truckSave: true,
    truckTitle: 'ADD TRUCK' 
  });
}
cancelTruck() {
  this.setState({
    truckTable: false,
    truckForm: true,
    truckSave: true,
    truckSubmit: true,
    truckTitle: 'TRUCKS LIST' 
  });
}
editTruck(val) {
  this.setState({
    truckForm: false,
    truckSubmit: true,
    truckTable: true,
    truckSave: false,
    truckTitle: 'EDIT TRUCK',
    truck: val
  });
}
 upadte() {
lat++;
return lat;
 }

 addCat() {
  this.props.history.push('/admin/category/add');
 }
 componentDidMount() {
  this.getTruck();
}
getTruck() {
 let self =this;
 axios.get('/api/admin/truck',
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
        title: 'Truck Number',
        dataIndex: 'TruckNumber',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Name.localeCompare(b.Name)
      }, 
      {
        title: 'VIN',
        dataIndex: 'VIN',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'License Plate ',
        dataIndex: 'LicensePlate',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'Registeterd State ',
        dataIndex: 'RegisteredState',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'Make',
        dataIndex: 'Make',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Name.localeCompare(b.Name)
      }, 
      {
        title: 'Year ',
        dataIndex: 'Year',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'Model',
        dataIndex: 'Model',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'RegisteredDate ',
        dataIndex: 'RegisteredDate',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'RenewalDate ',
        dataIndex: 'RenewalDate',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: '90DaysInspectionDate ',
        dataIndex: 'NinetyDaysInspectionDate',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      // {
      //   title: 'YearlyInspectionDate  ',
      //   dataIndex: 'Phone',
      //   onFilter: (value, record) => record.Name.indexOf(value) === 0,
      //   sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      // },
      
      {
        title: 'Action', 
      render: (record) => <div style={{cursor:'pointer'}} onClick = {() =>this.editTruck(record) }> <Icon type="edit" className="isoEditIcon"/></div>
      }
    ];
    return (
       
      <Card title={<h4 style={{color: 'darkblue', 'font-weight': 'bold'}}>{this.state.truckTitle}</h4>}>
      <div hidden={this.state.truckTable}>

       <Button type="primary"  onClick={()=>{ this.addTruck() }} style={{float: 'right'}} >
                         Add Truck
                        </Button>
    
                        <br/><br/>
                        <div>
        <Table columns={columns} bordered dataSource={this.state.value} rowKey = {this.upadte}   pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleChange}/>
        </div>
        </div>
        <div  hidden={this.state.truckForm}>
        <span>
        <Truck  add ={this.state.truckSubmit} update={this.state.truckSave} truck={this.state.truck}/>
       
                        <Button type='primary' htmlType="submit" style={margin} onClick={()=>{ this.cancelTruck() }}>
                          CANCEL
                        </Button>
                        </span>
          </div>
        
      </Card>


    );
  }
}
const WrappedFormWIthSubmissionButton = Form.create()(TrucksList);
export default WrappedFormWIthSubmissionButton;
TrucksList.contextTypes = {
    intl: PropTypes.object.isRequired,
  };
  