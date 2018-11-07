import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { Input,DatePicker } from 'antd';
import Form from '../../components/uielements/form';
import basicStyle from '../../settings/basicStyle';
import { PropTypes } from 'prop-types';
import { rtl } from '../../settings/withDirection';
import Button from '../../components/uielements/button'; 
import axios from '../../axios';
import notification from '../../components/notification';
import moment from 'moment';

const FormItem = Form.Item;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2FpQGdtYWlsLmNvbSIsInVzZXJJZCI6MzUsImRhdGUiOiIyMDE4LTEwLTE4VDExOjQ0OjE4LjcyM1oifSwiaWF0IjoxNTM5ODYzMDU4LCJleHAiOjE1NDUwNDcwNTh9.aI--gM5RUnit35NzZMeQ-Z1KC9UhvANAxx86Oz5eyLk";
class Driver extends Component {
  state = {
    value: [],
    confirmDirty: false,
    dataSource: []
  };
  onChange = (value) => {
    this.setState({ value });
    this.setState({imgError: false });
  }
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      dob : '',
      phone2: '',
      dl: '',
      issuedSt: '',
      issuedDt: '',
      expDt2: '',
      drugTestDt: '',
      medical: '',
      driverId: '',
      present: true
    };
   this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('finally got here');
    console.log(prevProps.driver);
    console.log(this.props.addressId)
    if(prevProps.driver !== this.props.driver) {
      this.getDriverDetails();
    
    } 
  }
  updateDriver(e) {
    let self = this;
    let obj = {};
    self.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        obj.FirstName= this.state.fName;
        obj.LastName= this.state.lName;
        obj.Address_Id= this.props.addressId;
        obj.DOB= this.state.dob;
        obj.DL= this.state.dl;
        obj.IssuedDate = this.state.issuedDt;
        obj.IssuedState= this.state.issuedSt;
        obj.ExpDate= this.state.expDt2;
        obj.Medical= this.state.medical;
        obj.DrugTestDate=this.state.drugTestDt;
  console.log(obj)

    axios.put('/api/admin/driver/'+this.state.driverId,
    obj,
    {
      headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token }
    }
    )
    .then(function (response) {      
     console.log(response);
    
    notification('success', 'updated driver successfully!', '');
     
    })
    .catch(function (error) {  
      notification('error', 'customer is not updated.please try again', '');  
      console.error(error);
    });
  }
  })
  }
  getDriverDetails() {
    console.log('yes calling');
    let self =this;
    const { form } = self.props;
   const driver = self.props.driver;
   console.log(driver)
   self.setState({ driverId: driver.id,
    fName: driver.FirstName,
    lName: driver.LastName,
    dob:  moment(new Date(driver.DOB)).format("YYYY-MM-DD"),
  phone: driver.Phone,
  dl: driver.DL,
  issuedDt: moment(new Date(driver.IssuedDate)).format("YYYY-MM-DD"),
  issuedSt: driver.IssuedState,
  expDt2: moment(new Date(driver.ExpDate)).format("YYYY-MM-DD"),
  drugTestDt: moment(new Date(driver.drugTestDt)).format("YYYY-MM-DD"),
  medical: driver.medical,
  present: false
   })
   form.setFieldsValue({
    fName: driver.FirstName,
    lName: driver.LastName,
    dob: moment(driver.DOB),
  phone: driver.Phone,
  dl: driver.DL,
  issuedDt: moment(driver.IssuedDate),
  issuedSt: driver.IssuedState,
  expDt2: moment(driver.ExpDate),
  drugTestDt: moment(driver.drugTestDt),
  medical: driver.medical})
  }
  handleChange(event) {
    const elemName = event.target.name;
    this.setState({	[elemName]: event.target.value});
  }
  addDriver() {
    let obj = {};
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
    obj.FirstName= this.state.fName;
    obj.LastName= this.state.lName;
    obj.Address_Id= this.props.addressId;
    obj.DOB= this.state.dob;
    obj.DL= this.state.dl;
    obj.IssuedDate = this.state.issuedDt;
    obj.IssuedState= this.state.issuedSt;
    obj.ExpDate= this.state.expDt2;
    obj.Medical= this.state.medical;
    obj.DrugTestDate=this.state.drugTestDt;
   
  console.log(obj)

    axios.post('/api/admin/driver',
    obj,
    {
      headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token }
    }
    )
    .then(function (response) {      
     console.log(response);
     notification('success', 'added driver successfully!', '');
    })
    .catch(function (error) {  
      notification('error', 'driver is not added.please try again', '');  
      console.error(error);
    });
  }
  })
  }
  handleNum(value, name) {

    if(value)
    {
    if(name === 'DOB' || name=== 'IssuedDate' || name === 'ExpDate' || name=== 'DrugTestDate') {
      const dt =  moment(new Date(value)).format("YYYY-MM-DD");
      this.setState({	[name]: dt});
    } else {
    this.setState({	[name]: value});
    }
  }
  }
  render() {

    const { rowStyle, colStyle, gutter } = basicStyle;

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
    const margin = {
      margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
      marginTop: '5px'
    };
    return (
      <div>
             <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={12} xs={24} style={colStyle}>
                   
                      <FormItem {...formItemLayout} label="First Name:" hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('fName', {
                          rules: [
                            {
                              message: 'The input is not valid!',
                            },
                            {
                              required: true,
                              message: 'Please input First Name!',
                            },
                          ],
                        })(<Input name="fName" id="fName" placeholder="First Name" onChange={this.handleChange} />)}
                      </FormItem>
                      </Col>
                      <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Last Name:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('lName ', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input Last Name!',
                         },
                       ],
                     })(<Input name="lName" id="lName" placeholder="Last Name" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
<FormItem {...formItemLayout} label="Date of Birth:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('dob', {
                          rules: [
          
                            {
                              required: false,
                              message: 'Please input Date of Birth!',
                            },
                          ],
                          onChange: (e) => this.handleNum(e, 'dob')
                        })(<DatePicker  style={{ width: '100%' }} format="DD/MM/YYYY"/>)}
                      </FormItem>  
</Col>
<Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Phone:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('phone2', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input name!',
                         },
                       ],
                     })(<Input name="phone2" id="phone2" placeholder="Phone" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Driving Licence:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('dl', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input Driving Licence!',
                         },
                       ],
                     })(<Input name="dl" id="dl" placeholder="Driving Licence" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Issued State:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('issuedSt', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input Issued State!',
                         },
                       ],
                     })(<Input name="issuedSt" id="issuedSt" placeholder="Issued State" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
<FormItem {...formItemLayout} label="Issued Date:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('issuedDt', {
                          rules: [
          
                            {
                              required: false,
                              message: 'Please input Issued Date!',
                            },
                          ],
                          onChange: (e) => this.handleNum(e, 'issuedDt')
                        })(<DatePicker placeholder= "Select Issued Date" style={{ width: '100%' }} format="DD/MM/YYYY"/>)}
                      </FormItem>  
</Col>
<Col md={12} xs={24} style={colStyle}>
<FormItem {...formItemLayout} label="Expiration Date:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('expDt2', {
                          rules: [
          
                            {
                              required: false,
                              message: 'Please input Expiration Date!',
                            },
                          ],
                          onChange: (e) => this.handleNum(e, 'expDt2')
                        })(<DatePicker placeholder="Select Expiration Date" style={{ width: '100%' }} format="DD/MM/YYYY"/>)}
                      </FormItem>  
</Col>
<Col md={12} xs={24} style={colStyle}>
<FormItem {...formItemLayout} label="Drug Test Date:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('drugTestDt', {
                          rules: [
          
                            {
                              required: false,
                              message: 'Please input Drug Test Date!',
                            },
                          ],
                          onChange: (e) => this.handleNum(e, 'drugTestDt')
                        })(<DatePicker placeholder="Select Drug Test Date" style={{ width: '100%' }} format="DD/MM/YYYY"/>)}
                      </FormItem>  
</Col>
<Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Medical:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('medical ', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input Medical!',
                         },
                       ],
                     })(<Input name="medical" id="medical" placeholder="Medical" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={24} xs={24} style={colStyle}>
          <span hidden={this.props.update}>
                   <Button type='primary' htmlType="submit" style={margin} onClick={() => this.updateDriver()}>
                          SAVE DRIVER
                        </Button>
                        </span>
                        <span hidden={this.props.add}>
                        <Button type='primary' htmlType="submit" style={margin}  onClick={() => this.addDriver()}>
                         SUBMIT
                        </Button>
                        </span>
                       
                        </Col> 
                   </Row>
      </div>
    );
  }
}
const WrappedFormWIthSubmissionButton = Form.create()(Driver);
export default WrappedFormWIthSubmissionButton;
Driver.contextTypes = {
    intl: PropTypes.object.isRequired,
  };
  