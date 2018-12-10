import React, { Component } from 'react';
import { Icon, Card } from 'antd';
import { Table } from 'antd';
import Form from '../../components/uielements/form';
import { PropTypes } from 'prop-types';
import Button from '../../components/uielements/button';
import { rtl } from '../../settings/withDirection';
import Service from './service';
import axios from '../../axios';
import moment from 'moment';

let lat =0;
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2FpQGdtYWlsLmNvbSIsInVzZXJJZCI6MzUsImRhdGUiOiIyMDE4LTEwLTE4VDExOjQ0OjE4LjcyM1oifSwiaWF0IjoxNTM5ODYzMDU4LCJleHAiOjE1NDUwNDcwNTh9.aI--gM5RUnit35NzZMeQ-Z1KC9UhvANAxx86Oz5eyLk";
let token = '';
class ServicesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
    value: [{Name: 'aa'}],
    selectedRowKeys: [],
    pagination: {},
    loading: false,
    serviceTable: false,
    serviceForm: true,
    serviceSave: true,
    serviceSubmit: true,
    serviceTitle: 'SERVICE LIST',
    service: ''
  };

 }
 upadte() {
lat++;
return lat;
 }

componentDidMount() {
  if (localStorage.getItem('userDetails')) {
    const Existing = localStorage.getItem('userDetails');
    if (Existing != null) {
      const parseExisting = JSON.parse(Existing);
      if (parseExisting) {
          token = parseExisting.userData.Token;
          this.getService();
      }
    }

  }
}
 getService() {
  let self =this;
  axios.get('/api/admin/service',
  {headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token }})
  .then(function (response) {
    console.log('eceacf');
    console.log(response.data);
     self.setState({value: response.data });
  })
  .catch(function (error) {
    console.error(error);
  });
}
 addService() {
  this.setState({
    serviceForm: false,
    serviceSubmit: false,
    serviceTable: true,
    serviceSave: true,
    serviceTitle: 'ADD SERVICE' 
  });
}
cancelService() {
  this.setState({
    serviceTable: false,
    serviceForm: true,
    serviceSave: true,
    serviceSubmit: true,
    serviceTitle: 'SERVICE LIST' 
  });
}
editService(val) {
  this.setState({
    serviceForm: false,
    serviceSubmit: true,
    serviceTable: true,
    serviceSave: false,
    serviceTitle: 'EDIT SERVICE',
    service: val
  });
}
 addCat() {
  this.props.history.push('/admin/category/add');
 }

  render() {
    const margin = {
      margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
      marginTop: '5px'
    };
    const columns = [
      {
        title: 'Name',
        dataIndex: 'Notes',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'Completed Date',
        dataIndex: 'CompletedDate',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : '',
        render: (record) => <div> {moment(record).format("DD/MM/YYYY")}</div>
       
      },
      {
        title: 'Requested Date',
        dataIndex: 'RequestedDate',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : '',
        render: (record) => <div> {moment(record).format("DD/MM/YYYY")}</div>
       
      },
      {
        title: 'Action', 
        render: (record) => <div style={{cursor:'pointer'}}  onClick={()=>  this.editService(record) }> <Icon type="edit" className="isoEditIcon"/></div>
      }
    ];
    return (
      <Card title={<h4 style={{color: 'darkblue', 'font-weight': 'bold'}}>{this.state.serviceTitle}</h4>}>
      <div hidden={this.state.serviceTable}>

       <Button type="primary"  onClick={()=>{ this.addService() }} style={{float: 'right'}} >
                         Add Service
                        </Button>
    
                        <br/><br/>
                        <div>
        <Table columns={columns} bordered dataSource={this.state.value} rowKey = {this.upadte}   pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleChange}/>
        </div>
        </div>
        <div  hidden={this.state.serviceForm}>
        <span>
        <Service  add ={this.state.serviceSubmit} update={this.state.serviceSave} service={this.state.service}/>
       
                        <Button type='primary' htmlType="submit" style={margin} onClick={()=>{ this.cancelService() }}>
                          CANCEL
                        </Button>
                        </span>
          </div>
        
      </Card>


    );
  }
}
const WrappedFormWIthSubmissionButton = Form.create()(ServicesList);
export default WrappedFormWIthSubmissionButton;
ServicesList.contextTypes = {
    intl: PropTypes.object.isRequired,
  };
  