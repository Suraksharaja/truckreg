import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { Table, Card } from 'antd';
import Form from '../../components/uielements/form';
import { PropTypes } from 'prop-types';
import { rtl } from '../../settings/withDirection';
import Doc from './docs';
import Button from '../../components/uielements/button'; 
import axios from '../../axios';
let lat =0;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2FpQGdtYWlsLmNvbSIsInVzZXJJZCI6MzUsImRhdGUiOiIyMDE4LTEwLTE4VDExOjQ0OjE4LjcyM1oifSwiaWF0IjoxNTM5ODYzMDU4LCJleHAiOjE1NDUwNDcwNTh9.aI--gM5RUnit35NzZMeQ-Z1KC9UhvANAxx86Oz5eyLk";
class DocList extends Component {

  constructor(props) {
    super(props);
    this.state = {
    value: [{Name: 'aa'}],
    selectedRowKeys: [],
    pagination: {},
    loading: false,
    docTable: false,
    docForm: true,
    docSave: true,
    docSubmit: true,
    docTitle: 'DOCS LIST'
  };

 }
 upadte() {
lat++;
return lat;
 }
 addDoc() {
  this.setState({
    docForm: false,
    docSubmit: false,
    docTable: true,
    docSave: true,
    docTitle: 'ADD DOC' 
  });
}
cancelDoc() {
  this.setState({
    docTable: false,
    docForm: true,
    docSave: true,
    docSubmit: true,
    docTitle: 'DOCS LIST' 
  });
}
editDoc() {
  this.setState({
    docForm: false,
    docSubmit: true,
    docTable: true,
    docSave: false,
    docTitle: 'EDIT DOC' 
  });
}
 addCat() {
  this.props.history.push('/admin/category/add');
 }
 componentDidMount() {
  this.getDoc();
}
getDoc() {
 let self =this;
 axios.get('/api/admin/document',
 {headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token }})
 .then(function (response) {
   console.log(response)
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
      }, 
      {
        title: 'Phone',
        dataIndex: 'Phone',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'DL',
        dataIndex: 'DL',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },
      {
        title: 'IssuedDate',
        dataIndex: 'IssuedDate',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },{
        title: 'IssuedState',
        dataIndex: 'IssuedState',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },{
        title: 'ExpDate',
        dataIndex: 'ExpDate',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : ''
       
      },{
        title: 'Medical',
        dataIndex: 'Medical',
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
        render: (record) => <div className="pointer" onClick={()=>  this.editDoc() }> <Icon type="edit" className="isoEditIcon"/></div>
      }
    ];
    return (
       
      
      <Card title={<h4 style={{color: 'darkblue', 'font-weight': 'bold'}}>{this.state.docTitle}</h4>}>
      <div hidden={this.state.docTable}>

       <Button type="primary"  onClick={()=>{ this.addDoc() }} style={{float: 'right'}} >
                         Add Doc
                        </Button>
    
                        <br/><br/>
                        <div>
        <Table columns={columns} bordered dataSource={this.state.value} rowKey = {this.upadte}   pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleChange}/>
        </div>
        </div>
        <div  hidden={this.state.docForm}>
        <span>
        <Doc  add ={this.state.docSubmit} update={this.state.docSave}/>
       
                        <Button type='primary' htmlType="submit" style={margin} onClick={()=>{ this.cancelDoc() }}>
                          CANCEL
                        </Button>
                        </span>
          </div>
        
      </Card>

    );
  }
}
const WrappedFormWIthSubmissionButton = Form.create()(DocList);
export default WrappedFormWIthSubmissionButton;
DocList.contextTypes = {
    intl: PropTypes.object.isRequired,
  };
  