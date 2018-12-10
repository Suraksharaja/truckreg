import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { Input, Select } from 'antd';
import Button from '../../components/uielements/button';
import Form from '../../components/uielements/form';
import { rtl } from '../../settings/withDirection';
import basicStyle from '../../settings/basicStyle';
import Popconfirm from '../../components/feedback/popconfirm';
import { PropTypes } from 'prop-types';
import axios from '../../axios';
import notification from '../../components/notification';

const baseUrl = 'http://res.cloudinary.com/'+process.env.REACT_APP_CLOUDINARY_NAME+'/image/upload'
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2FpQGdtYWlsLmNvbSIsInVzZXJJZCI6MzUsImRhdGUiOiIyMDE4LTEwLTE4VDExOjQ0OjE4LjcyM1oifSwiaWF0IjoxNTM5ODYzMDU4LCJleHAiOjE1NDUwNDcwNTh9.aI--gM5RUnit35NzZMeQ-Z1KC9UhvANAxx86Oz5eyLk";
let token = '';
const FormItem = Form.Item;
const Option = Select.Option;
class Doc extends Component {
  state = {
    value: [],
    confirmDirty: false,
    dataSource: [],
    docTable: false,
    docForm: true,
    docSave: true,
    docSubmit: true,
    docTitle: 'DOCS LIST'
    
  };
  onChange = (value) => {
    this.setState({ value });
    this.setState({imgError: false });
  }
  handleSelect(value, name) {
    this.setState({	[name]: value});
    console.log(value);
    if(value === 'truck') {
      console.log('should not come here');
      this.getTruck();
    }
    console.log(name);
  }
  constructor(props) {
    super(props);
    this.state = {
       
        category: '',
        cloudUrl: '',
        desc: '',
        moduleType: '',
        categoryValue: []

    };
   this.handleChange = this.handleChange.bind(this);
   this.upload = this.upload.bind(this);
   this.removeImage = this.removeImage.bind(this);
  }
  getTruck() {
    let self =this;
    axios.get('/api/admin/truck',
    {headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token }})
    .then(function (response) {
      console.log(response);
       self.setState({categoryValue: response.data });
    })
    .catch(function (error) {
      console.error(error);
    });
   }
   getDriver() {
    let self =this;
    axios.get('/api/admin/driver',
    {headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token }})
    .then(function (response) {
       self.setState({categoryValue: response.data });
    })
    .catch(function (error) {
      console.error(error);
    });
   }
  componentDidUpdate(prevProps, prevState) {
    console.log('finally got here');
    console.log(prevProps.doc);
    if(prevProps.doc !== this.props.doc) {
      this.getDocDetails();
    
    } 
  }
  componentDidMount() {
    if (localStorage.getItem('userDetails')) {
      const Existing = localStorage.getItem('userDetails');
      if (Existing != null) {
        const parseExisting = JSON.parse(Existing);
        if (parseExisting) {
            token = parseExisting.userData.Token;
        }
      }
  
	  }
  }
  getDocDetails() {
    console.log('yes calling');
    let self =this;
    const { form } = self.props;
   const doc = self.props.doc;
   self.setState({ docId: doc.id,
    desc: doc.Description,
    cloudUrl: doc.Document_URL
  
   })
   form.setFieldsValue({
    docId: doc.id,
    desc: doc.Description,
    cloudUrl: doc.Document_URL
  })
  }
  upload() {
    let self = this;
    window.cloudinary.openUploadWidget({ cloud_name:process.env.REACT_APP_CLOUDINARY_NAME, upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,folder: 'testTruck'},
    (error, result) => {
      if(result) {
        console.log(result);
        console.log(result[0].path.replace("pdf", "png"));
        self.setState({cloudUrl: result[0].path.replace("pdf", "png")});
      }
    })
  }
  addDoc() {
    let obj = {};
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
    obj.ReqCategory_Id= this.state.category;
    obj.Document_URL= this.state.cloudUrl;
    obj.Description= this.state.desc;
   
  console.log(obj)

    axios.post('/api/admin/documnet',
    obj,
    {
      headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token }
    }
    )
    .then(function (response) {      
     console.log(response);
     notification('success', 'added document successfully!', '');
    })
    .catch(function (error) {  
      notification('error', 'document is not added.please try again', '');  
      console.error(error);
    });
  }
  })
  }
  updateDoc() {
    let obj = {};
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
    obj.ReqCategory_Id= this.state.category;
    obj.Document_URL= this.state.cloudUrl;
    obj.Description= this.state.desc;
   
  console.log(obj)

    axios.put('/api/admin/document/'+this.state.docId,
    obj,
    {
      headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token }
    }
    )
    .then(function (response) {      
     console.log(response);
     notification('success', 'updated document successfully!', '');
    })
    .catch(function (error) {  
      notification('error', 'document is not updated.please try again', '');  
      console.error(error);
    });
  }
  })
  }
  removeImage () {
    let self =this;
    self.setState({cloudUrl: ''})
  
  }
  handleChange(event) {
    const elemName = event.target.name;
    this.setState({	[elemName]: event.target.value});
  }
  
  handleNum(value, name) {

    this.setState({	[name]: value});
  }
  render() {

    const { rowStyle, colStyle, gutter } = basicStyle;
    const margin = {
      margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
      marginTop: '5px'
    };
   
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { div: 0 },
        sm: { div: 0 },
        fontWeight: 'bold'
      },
      wrapperCol: {
        xs: { div: 0 },
        sm: { div: 0 },
        marginBottom:'2px'
      },
      antFormItemLabel: {
        lineHeight: '18.9999px'
      }
    };
    const { TextArea } = Input;
    return (
      <div>

             <Row style={rowStyle} gutter={gutter} justify="start">
             <Col md={12} xs={24} style={colStyle}>
                   <FormItem {...formItemLayout} label="Module Type:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('moduleType', {
                          rules: [
                            {
                              required: false,
                              message: 'Please input Module Type!',
                            },
                          ]
                          })(<Select
                          allowClear
                          showSearch
                          placeholder="Select Module Type"
                          onChange= {(e) => this.handleSelect(e, 'moduleType')}   
                        >
                          <Option value="company">company</Option>
                          <Option value="truck">truck</Option> 
                          <Option value="driver">driver</Option>                         
                        </Select>)}
                      </FormItem>
                      </Col>
             <Col md={12} xs={24} style={colStyle}>
                   <FormItem {...formItemLayout} label="Category:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('category', {
                          rules: [
                            {
                              required: false,
                              message: 'Please input Category!',
                            },
                          ]
                          })(<Select
                          allowClear
                          showSearch
                          placeholder="Select Category"
                          onChange= {(e) => this.handleSelect(e, 'category')}   
                        >
                     {this.state.categoryValue.length > 0?this.state.categoryValue.map(d => <Option key={d.id}>{d.TruckNumber}</Option>): ''}                      
                        </Select>)}
                      </FormItem>
                      </Col>
                     
                      <Col md={12} xs={24} style={colStyle}>
                      <FormItem {...formItemLayout} label="Name:" hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('desc', {
                          rules: [
                            {
                              message: 'The input is not valid!',
                            },
                            {
                              required: true,
                              message: 'Please input Description!',
                            },
                          ],
                        })(  <TextArea type="textarea" placeholder="Description" name="desc"  value={this.state.address1} maxLength="100" onChange={this.handleChange}/>)}
                      </FormItem>
                      </Col>
                      <Col style={colStyle}>
                   {this.state.cloudUrl? 
                        <div  style={{'text-align': 'center','margin-top': '34px'}}> 
                         <Popconfirm
                          
                          title={`Sure to delete ${''}?`}
                          okText="DELETE"
                          cancelText="No"
                          onConfirm={() => this.removeImage()}
                        >
                          <Button style={{float: 'right' }} icon="close" type="button" className="isoDeleteBtn" />
                        </Popconfirm> 
                         <div className="isoContactCardHead">
                           <div className="isoPersonImage">
                             <div style={{display: 'flex' }}>
                             <img height="250" width="250" className="prodimg" alt="" src={`${baseUrl}/${this.state.cloudUrl}`}/>
                            
                             </div>
                           </div>
                         </div>
                         </div>
                        :
                      <div  style={{'text-align': 'center','margin-top': '34px'}}>
                          <Button  onClick={this.upload} style={margin} >
                          ADD  DOCUMENT
                        </Button>
                        {this.state.imgError?<p style={{color: 'red'}}>Please add an image</p>:''}
                        </div>}
                   </Col>
                  

                      <Col md={24} xs={24} style={colStyle}>
          <span hidden={this.props.update}>
                   <Button type='primary' htmlType="submit" onClick = {() => this.updateDoc()} style={margin}>
                          SAVE DOC
                        </Button>
                        </span>
                        <span hidden={this.props.add}>
                        <Button type='primary' htmlType="submit" style={margin} onClick = {() => this.addDoc()}>
                         SUBMIT
                        </Button>
                        </span>
                       
                        </Col> 
               </Row>    
      </div>
    );
  }
}
const WrappedFormWIthSubmissionButton = Form.create()(Doc);
export default WrappedFormWIthSubmissionButton;
Doc.contextTypes = {
    intl: PropTypes.object.isRequired,
  };
  