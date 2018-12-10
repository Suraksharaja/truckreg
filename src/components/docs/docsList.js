import React, { Component } from 'react';
import { Icon } from 'antd';
import { Table, Card } from 'antd';
import Form from '../../components/uielements/form';
import { PropTypes } from 'prop-types';
import { rtl } from '../../settings/withDirection';
import Doc from './docs';
import Button from '../../components/uielements/button'; 
import axios from '../../axios';
let lat =0;
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2FpQGdtYWlsLmNvbSIsInVzZXJJZCI6MzUsImRhdGUiOiIyMDE4LTEwLTE4VDExOjQ0OjE4LjcyM1oifSwiaWF0IjoxNTM5ODYzMDU4LCJleHAiOjE1NDUwNDcwNTh9.aI--gM5RUnit35NzZMeQ-Z1KC9UhvANAxx86Oz5eyLk";
const baseUrl = 'http://res.cloudinary.com/'+process.env.REACT_APP_CLOUDINARY_NAME+'/image/upload';
let token = '';
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
    docTitle: 'DOCS LIST',
    doc: ''
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
editDoc(val) {
  this.setState({
    docForm: false,
    docSubmit: true,
    docTable: true,
    docSave: false,
    docTitle: 'EDIT DOC',
    doc: val
  });
}
 addCat() {
  this.props.history.push('/admin/category/add');
 }

componentDidMount() {
  let self = this;
  if (localStorage.getItem('userDetails')) {
    const Existing = localStorage.getItem('userDetails');
    if (Existing != null) {
      const parseExisting = JSON.parse(Existing);
      if (parseExisting) {
          token = parseExisting.userData.Token;
          self.getDoc();
      }
    }

  }
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
        dataIndex: 'Description',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Name.localeCompare(b.Name)
      }, 
      {
        title: 'Document',
        dataIndex: 'Document_URL',
        onFilter: (value, record) => record.Name.indexOf(value) === 0,
        sorter: (a, b) => a.Description && b.Description? a.Description.localeCompare(b.Description) : '',
        render: (record) =>    <div className="isoContactCardHead">
        <img height="160" width="160" className="prodimg" alt="" src={`${baseUrl}/${record ? record.replace("pdf", "png"): ''}`}/>
    </div>
       
      },     
      {
        title: 'Action', 
        render: (record) => <div style={{cursor:'pointer'}} onClick={()=>  this.editDoc(record) }> <Icon type="edit" className="isoEditIcon"/></div>
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
        <Doc  add ={this.state.docSubmit} update={this.state.docSave} doc={this.state.doc}/>
       
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
  