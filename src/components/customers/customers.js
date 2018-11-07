
import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { Input, DatePicker } from 'antd';
import Form from '../uielements/form';
import basicStyle from '../../settings/basicStyle';
import Button from '../uielements/button';
import { Card } from 'antd';
import { PropTypes } from 'prop-types';
import { rtl } from '../../settings/withDirection';
import axios from '../../axios';
import moment from 'moment';
import notification from '../../components/notification';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2FpQGdtYWlsLmNvbSIsInVzZXJJZCI6MzUsImRhdGUiOiIyMDE4LTEwLTE4VDExOjQ0OjE4LjcyM1oifSwiaWF0IjoxNTM5ODYzMDU4LCJleHAiOjE1NDUwNDcwNTh9.aI--gM5RUnit35NzZMeQ-Z1KC9UhvANAxx86Oz5eyLk";
 class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custId: '',
      custName: '',
      contactPerson: '',
      email: '',
      phone: '',
      altPhone: '',
      fax: '',
      dot: '',
      dotPin: '',
      mcPin: '',
      mc: '',
      ss: '',
      cdl: '',
      taxid: '',
      ifta: '',
      ca: '',
      pullNoticeCode: '',
      kyu: '',
      ny: '',
      or: '',
      orPassword: '',
      wdt: '',
      dotLogin: '',
      dotPassword: '',
      arbactLogin: '',
      arbactPassword: '',
      expDt: '',
      corp: '',
      corpDt: '',
      prePass: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      contactPersonTitle: '',
      complexName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNum = this.handleNum.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
  }
  componentDidMount() {
    console.log('finally got here');
    console.log(this.props.info);
    if(this.props.info) {
      this.getInfo();
    }
  }
  getInfo() {
    let self =this;
    const { form } = self.props;
   const info = self.props.info;
   self.setState({ custId: info.id,
     custName: info.Name,
   contactPerson: info.ContactPerson,
   email: info.Email,
   phone: info.Phone,
   altPhone: info.AlternativePhone,
   fax: info.Fax,
   dot: info.DOT,
   dotPin: info.DOTPIN,
   mcPin: info.MCPIN,
   mc: info.MCNumber ,
   ss: info.SS,
   cdl: info.CDL,
   taxid: info.TaxId,
   ifta: info.IFTA,
   ca: info.CA,
   pullNoticeCode: info.PullNoticeCode,
   kyu: info.KYU,
   ny: info.NY,
   or: info.OR,
   orPassword: info.ORPassword,
   wdt: info.WDT,
   dotLogin: info.DOTLogin,
   dotPassword: info.DOTPassword,
   arbactLogin: info.ARBACTLogin,
   arbactPassword: info.ARBACTPassword,
   expDt: moment(new Date(info.Expiration)).format("YYYY-MM-DD"),
   corp: info.Corporation,
   corpDt: moment(new Date(info.CorpRegisteredDate)).format("YYYY-MM-DD"),
   prePass: info.PrePass,
   address1: info.Address.address1,
   address2: info.Address.address2,
   city: info.Address.city,
   state: info.Address.state,
   zipCode: info.Address.zipCode,
   contactPersonTitle: info.ContactPersonTitle,
   complexName: info.Address.complexName});
   form.setFieldsValue({
    custName: info.Name,
   contactPerson: info.ContactPerson,
   email: info.Email,
   phone: info.Phone,
   altPhone: info.AlternativePhone,
   fax: info.Fax,
   dot: info.DOT,
   dotPin: info.DOTPIN,
   mcPin: info.MCPIN,
   mc: info.MCNumber,
   ss: info.SS,
   cdl: info.CDL,
   taxid: info.TaxId.toString(),
   ifta: info.IFTA,
   ca: info.CA,
   pullNoticeCode: info.PullNoticeCode,
   kyu: info.KYU,
   ny: info.NY,
   or: info.OR,
   orPassword: info.ORPassword,
   wdt: info.WDT,
   dotLogin: info.DOTLogin,
   dotPassword: info.DOTPassword,
   arbactLogin: info.ARBACTLogin,
   arbactPassword: info.ARBACTPassword,
   expDt: moment(info.Expiration),
   corp: info.Corporation,
   corpDt: moment(info.CorpRegisteredDate),
   prePass: info.PrePass,
   address1: info.Address.address1,
   address2: info.Address.address2,
   city: info.Address.city,
   state: info.Address.state,
   zipCode: info.Address.zipCode,
   contactPersonTitle: info.ContactPersonTitle,
   complexName: info.Address.complexName
});
  }
  handleNum(value, name) {
    if(value)
    {
    if(name === 'expDt' || name=== 'corpDt') {
      const dt =  moment(new Date(value)).format("YYYY-MM-DD");
      this.setState({	[name]: dt});
    } else {
    this.setState({	[name]: value});
    }
  }
  }
  handleChange(event) {
    const elemName = event.target.name;
    this.setState({	[elemName]: event.target.value});
  }
  addCustomer() {
    let obj = {};
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
    obj.Name= this.state.custName;
    obj.ContactPerson= this.state.contactPerson;
    obj.ContactPersonTitle= this.state.contactPersonTitle;
    obj.Email= this.state.email;
    obj.Phone= this.state.phone;
    obj.AlternativePhone= this.state.altPhone;
    obj.Fax= this.state.fax;
    obj.DOT= this.state.dot;
    obj.DOTPIN= this.state.dotPin;
    obj.MCPIN=this.state.mcPin;
    obj.MCNumber= this.state.mc;
    obj.SS= this.state.ss;
    obj.CDL= this.state.cdl;
    obj.Expiration= this.state.expDt;
    obj.TaxId= Number(this.state.taxid);
    obj.IFTA= this.state.ifta;
    obj.CA= this.state.ca;
    obj.PullNoticeCode= this.state.pullNoticeCode;
    obj.KYU= this.state.kyu;
    obj.NY= this.state.ny;
    obj.OR= this.state.or;
    obj.ORPassword= this.state.orPassword;
    obj.WDT= this.state.wdt;
    obj.DOTLogin= this.state.dotLogin;
    obj.DOTPassword= this.state.dotPassword;
    obj.ARBACTLogin= this.state.arbactLogin;
    obj.ARBACTPassword= this.state.arbactPassword;
    obj.Corporation= this.state.corp;
    obj.CorpRegisteredDate= this.state.corpDt;
    obj.PrePass= this.state.prePass;
    obj.Address= {
      "address1":this.state.address1,
      "address2": this.state.address2,
      "city":this.state.city,
      "state": this.state.state,
      "zipCode": this.state.zipCode,
      "complexName": this.state.complexName,
      "phone": this.state.phone
    }
  console.log(obj)

    axios.post('/api/admin/customer',
    obj,
    {
      headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token }
    }
    )
    .then(function (response) {      
     console.log(response);
     notification('success', 'added customer successfully!', '');
    })
    .catch(function (error) {  
      notification('error', 'customer is not added.please try again', '');  
      console.error(error);
    });
  }
  })
  }
  updateCustomer(e) {
    let self = this;
    let obj = {};
    self.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
    obj.Name= this.state.custName;
    obj.ContactPerson= this.state.contactPerson;
    obj.ContactPersonTitle= this.state.contactPersonTitle;
    obj.Email= this.state.email;
    obj.Phone= this.state.phone;
    obj.AlternativePhone= this.state.altPhone;
    obj.Fax= this.state.fax;
    obj.DOT= this.state.dot;
    obj.DOTPIN= this.state.dotPin;
    obj.MCPIN=this.state.mcPin;
    obj.MCNumber= this.state.mc;
    obj.SS= this.state.ss;
    obj.CDL= this.state.cdl;
    obj.Expiration= this.state.expDt;
    obj.TaxId= Number(this.state.taxid);
    obj.IFTA= this.state.ifta;
    obj.CA= this.state.ca;
    obj.PullNoticeCode= this.state.pullNoticeCode;
    obj.KYU= this.state.kyu;
    obj.NY= this.state.ny;
    obj.OR= this.state.or;
    obj.ORPassword= this.state.orPassword;
    obj.WDT= this.state.wdt;
    obj.DOTLogin= this.state.dotLogin;
    obj.DOTPassword= this.state.dotPassword;
    obj.ARBACTLogin= this.state.arbactLogin;
    obj.ARBACTPassword= this.state.arbactPassword;
    obj.Corporation= this.state.corp;
    obj.CorpRegisteredDate= this.state.corpDt;
    obj.PrePass= this.state.prePass;
    obj.Address= {
      "address1":this.state.address1,
      "address2": this.state.address2,
      "city":this.state.city,
      "state": this.state.state,
      "zipCode": this.state.zipCode,
      "complexName": this.state.complexName,
      "phone": this.state.phone
    }
  console.log(obj)

    axios.put('/api/admin/customer/'+this.state.custId,
    obj,
    {
      headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token }
    }
    )
    .then(function (response) {      
     console.log(response);
    
    notification('success', 'updated customer successfully!', '');
     //self.props.history.push('/admin/customers/list');
     
    })
    .catch(function (error) {  
      notification('error', 'customer is not updated.please try again', '');  
      console.error(error);
    });
  }
  })
  }
  render() {
  
    const { rowStyle, colStyle, gutter } = basicStyle;   
    const { getFieldDecorator } = this.props.form;
    const margin = {
      margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
      marginTop: '5px'
    };


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
      <div >        
             <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={12} xs={24} style={colStyle}>
                   
                      <FormItem {...formItemLayout} label="Customer Name:" hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('custName', {
                          rules: [
                            {
                              message: 'The input is not valid!',
                            },
                            {
                              required: true,
                              message: 'Please input Customer Name!',
                            },
                          ],
                        })(<Input name="custName" id="custName" placeholder="Customer Name" onChange={this.handleChange} />)}
                      </FormItem>
                      </Col>
                      <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Contact Person:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('contactPerson', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input Contact Person!',
                         },
                       ],
                     })(<Input name="contactPerson" id="contactPerson" placeholder="Contact Person " onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Contact Person Title:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('contactPersonTitle', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input Contact Person Title!',
                         },
                       ],
                     })(<Input name="contactPersonTitle" id="contactPersonTitle" placeholder="Contact Person Title" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                      <FormItem {...formItemLayout} label="Email:" hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('email', {
                          rules: [
                            {
                              message: 'The input is not valid!',
                            },
                            {
                              required: true,
                              message: 'Please input Email!',
                            },
                          ],
                        })(<Input name="email" id="email" placeholder="Email" onChange={this.handleChange} />)}
                      </FormItem>
                      </Col>
                      <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Phone:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('phone', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input Phone Number!',
                         },
                       ],
                     })(<Input name="phone" id="phone" placeholder="Phone" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Alternative Phone:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('altPhone', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input Alternative Phone Number!',
                         },
                       ],
                     })(<Input name="altPhone" id="altPhone" placeholder="Alternative Phone" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Fax: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('fax', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input Fax!',
                         },
                       ],
                     })(<Input name="fax" id="fax" placeholder="Fax" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="DOT: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('dot ', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input DOT!',
                         },
                       ],
                     })(<Input name="dot" id="dot" placeholder="DOT " onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="DOT PIN:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('dotPin ', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input DOT PIN!',
                         },
                       ],
                     })(<Input name="dotPin" id="dotPin" placeholder="DOT PIN " onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="MC PIN:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('mcPin', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input MC PIN!',
                         },
                       ],
                     })(<Input name="mcPin" id="mcPin" placeholder="MC PIN" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="MC#" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('mc', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input name!',
                         },
                       ],
                     })(<Input name="mc" id="mc" placeholder="MC#" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="SS: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('ss', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input SS!',
                         },
                       ],
                     })(<Input name="ss" id="ss" placeholder="SS" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="CDL: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('cdl ', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input CDL!',
                         },
                       ],
                     })(<Input name="cdl" id="cdl" placeholder="CDL " onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="TaxId: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('taxid', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input TaxId!',
                         },
                       ],
                     })(<Input name="taxid" id="taxid" placeholder="TaxId" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>

                     
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="IFTA: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('ifta', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input IFTA!',
                         },
                       ],
                     })(<Input name="ifta" id="ifta" placeholder="IFTA" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="CA: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('ca', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input CA!',
                         },
                       ],
                     })(<Input name="ca" id="ca" placeholder="CA " onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Pull Notice Code: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('pullNoticeCode', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input Pull Notice Code!',
                         },
                       ],
                     })(<Input name="pullNoticeCode" id="pullNoticeCode" placeholder="Pull Notice Code " onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="KYU: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('kyu', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input KYU!',
                         },
                       ],
                     })(<Input name="kyu" id="kyu" placeholder="KYU " onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="NY: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('ny', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input NY!',
                         },
                       ],
                     })(<Input name="ny" id="ny" placeholder="NY " onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="OR: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('or', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input OR!',
                         },
                       ],
                     })(<Input name="or" id="or" placeholder="OR" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="OR Password: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('orPassword', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input OR Password!',
                         },
                       ],
                     })(<Input name="orPassword" id="orPassword" placeholder="OR Password" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="WDT: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('wdt', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input WDT!',
                         },
                       ],
                     })(<Input name="wdt" id="wdt" placeholder="WDT" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="DOT Login: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('dotLogin', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input DOT Login!',
                         },
                       ],
                     })(<Input name="dotLogin" id="dotLogin" placeholder="DOT Login" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="DOT Password:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('dotPassword', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input DOT Password!',
                         },
                       ],
                     })(<Input name="dotPassword" id="dotPassword" placeholder="DOT Password" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="ARBACT Login: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('arbactLogin ', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input ARBACT Login!',
                         },
                       ],
                     })(<Input name="arbactLogin" id="arbactLogin" placeholder="ARBACT Login " onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="ARBACT Password: " hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('arbactPassword ', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input ARBACT Password!',
                         },
                       ],
                     })(<Input name="arbactPassword" id="arbactPassword" placeholder="ARBACT Password " onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
<FormItem {...formItemLayout} label="Expiration Date:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('expDt', {
                          rules: [
          
                            {
                              required: false,
                              message: 'Please input Expiration Date!',
                            },
                          ],
                          onChange: (e) => this.handleNum(e, 'expDt')
                        })(<DatePicker placeholder="Select Expiration Date" style={{ width: '100%' }} format="DD/MM/YYYY"/>)}
                      </FormItem>  
</Col>
<Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Corporation:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('corp', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input Corporation!',
                         },
                       ],
                     })(<Input name="corp" id="corp" placeholder="Corporation" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
<Col md={12} xs={24} style={colStyle}>
<FormItem {...formItemLayout} label="Corporation Date:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('corpDt', {
                          rules: [
          
                            {
                              required: false,
                              message: 'Please input Corporation Date!',
                            },
                          ],
                          onChange: (e) => this.handleNum(e, 'corpDt')
                        })(<DatePicker placeholder="Select Corporation Date" style={{ width: '100%' }} format="DD/MM/YYYY"/>)}
                      </FormItem>  
</Col>
<Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Pre Pass:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('prePass ', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: false,
                           message: 'Please input Pre Pass!',
                         },
                       ],
                     })(<Input name="prePass" id="prePass" placeholder="PrePass" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Card type="inner" title={<h3 style={{color: 'darkblue', 'font-weight': 'bold'}}>ADDRESS </h3>}>
<Col md={12} xs={24} style={colStyle}>
                      <FormItem {...formItemLayout} label="Address 1:" hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('address1', {
                          rules: [
                            {
                              message: 'The input is not valid!',
                            },
                            {
                              required: true,
                              message: 'Please input Address 1!',
                            },
                          ],
                        })(  <TextArea type="textarea" placeholder="Address 1" name="address1"  value={this.state.address1} maxLength="100" onChange={this.handleChange}/>)}
                      </FormItem>
                      </Col>
                      <Col md={12} xs={24} style={colStyle}>
                      <FormItem {...formItemLayout} label="Address 2:" hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('address2', {
                          rules: [
                            {
                              message: 'The input is not valid!',
                            },
                            {
                              required: false,
                              message: 'Please input Address 2!',
                            },
                          ],
                        })(  <TextArea type="textarea" placeholder="Address 2" name="shortDesc"  value={this.state.shortDesc} maxLength="100" onChange={this.handleChange}/>)}
                      </FormItem>
                      </Col>
                      <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="City" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('city', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input City!',
                         },
                       ],
                     })(<Input name="city" id="city" placeholder="City" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="State" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('state', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input State!',
                         },
                       ],
                     })(<Input name="state" id="state" placeholder="State" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Zipcode:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('zipCode', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input Zipcode!',
                         },
                       ],
                     })(<Input name="zipCode" id="zipCode" placeholder="Zipcode" onChange={this.handleChange} />)}
                   </FormItem>
                  
                
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   <FormItem {...formItemLayout} label="Complex Name" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('complexName', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input Complex Name!',
                         },
                       ],
                     })(<Input name="complexName" id="complexName" placeholder="Complex Name" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                  
                   <Col md={24} xs={24} style={colStyle}>
                   <span hidden={this.props.update}>
                   <Button type='primary' htmlType="submit" onClick={()=>this.updateCustomer()} style={margin}>
                          SAVE INFO
                        </Button>
                        </span>
                   <span hidden={this.props.add}>
                        <Button type='primary' htmlType="submit" onClick={()=>this.addCustomer()} style={margin}>
                         SUBMIT
                        </Button>
                        </span>
                        <span>
                        <Button type='primary' htmlType="submit" style={margin}>
                        <Link to={'/admin/customers/list'}>
                          CANCEL
                        </Link>
                        </Button>
                        </span>
                   </Col>
                   </Card>
                   </Row>
      </div>
    );
  
  }
}
const WrappedFormWIthSubmissionButton = Form.create()(Customer);
export default WrappedFormWIthSubmissionButton;
Customer.contextTypes = {
    intl: PropTypes.object.isRequired,
  };
  