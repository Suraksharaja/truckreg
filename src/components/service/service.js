import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { DatePicker, Select, Input } from 'antd';
import Form from '../../components/uielements/form';
import basicStyle from '../../settings/basicStyle';
import { PropTypes } from 'prop-types';
import Button from '../../components/uielements/button';
import { rtl } from '../../settings/withDirection';
import axios from '../../axios';
import notification from '../../components/notification';
import moment from 'moment';


const FormItem = Form.Item;
const Option = Select.Option;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2FpQGdtYWlsLmNvbSIsInVzZXJJZCI6MzUsImRhdGUiOiIyMDE4LTEwLTE4VDExOjQ0OjE4LjcyM1oifSwiaWF0IjoxNTM5ODYzMDU4LCJleHAiOjE1NDUwNDcwNTh9.aI--gM5RUnit35NzZMeQ-Z1KC9UhvANAxx86Oz5eyLk";
class Service extends Component {
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
        category2: '',
        driver2: '',
        service: '',
        reqDt: '',
        compDt: '',
        notes: '',
        serviceId: ''
    };
   this.handleChange = this.handleChange.bind(this);
  }
  addService() {
    let obj = {};
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
    obj.RequestedDate= this.state.reqDt;
    obj.CompletedDate= this.state.compDt;
    obj.Notes= this.state.notes;
  console.log(obj)

    axios.post('/api/admin/service',
    obj,
    {
      headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token }
    }
    )
    .then(function (response) {      
     console.log(response);
     notification('success', 'added service successfully!', '');
    })
    .catch(function (error) {  
      notification('error', 'service is not added.please try again', '');  
      console.error(error);
    });
  }
  })
  }
  handleChange(event) {
    const elemName = event.target.name;
    this.setState({	[elemName]: event.target.value});
  }
  
  handleNum(value, name) {

    this.setState({	[name]: value});
  }
  componentDidUpdate(prevProps, prevState) {

    if(prevProps.service !== this.props.service) {
      this.getServiceDetails();
    
    } 
  }
  getServiceDetails() {
    console.log('yes calling');
    let self =this;
    const { form } = self.props;
   const service = self.props.service;
   self.setState({ serviceId: service.id,
    reqDt: moment(new Date(service.RequestedDate)).format("YYYY-MM-DD"),
    compDt: moment(new Date(service.CompletedDate)).format("YYYY-MM-DD"),
      notes: service.Notes 
   })
   form.setFieldsValue({
    reqDt: moment(service.RequestedDate),
    compDt: moment(service.CompletedDate),
      notes: service.Notes
  })
  }
  render() {
    const margin = {
      margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
      marginTop: '5px'
    };
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
    return (
      <div>          
             <Row style={rowStyle} gutter={gutter} justify="start">
             {/* <Col md={12} xs={24} style={colStyle}>
                   <FormItem {...formItemLayout} label="Customer:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('customer', {
                          rules: [
                            {
                              required: false,
                              message: 'Please input Customer!',
                            },
                          ]
                          })(<Select
                          allowClear
                          showSearch
                          placeholder="Select Customer"
                          onChange= {(e) => this.handleSelect(e, 'customer')}   
                        >
                          <Option value="1">corousel</Option>
                          <Option value="2">coupons </Option>                        
                        </Select>)}
                      </FormItem>
                      </Col> */}
             <Col md={12} xs={24} style={colStyle}>
                   <FormItem {...formItemLayout} label="Driver:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('driver2', {
                          rules: [
                            {
                              required: false,
                              message: 'Please input Driver!',
                            },
                          ]
                          })(<Select
                          allowClear
                          showSearch
                          placeholder="Select Driver"
                          onChange= {(e) => this.handleSelect(e, 'driver2')}   
                        >
                          <Option value="1">corousel</Option>
                          <Option value="2">coupons </Option>                        
                        </Select>)}
                      </FormItem>
                      </Col>
                      <Col md={12} xs={24} style={colStyle}>
                   <FormItem {...formItemLayout} label="Service:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('service', {
                          rules: [
                            {
                              required: false,
                              message: 'Please input Service!',
                            },
                          ]
                          })(<Select
                          allowClear
                          showSearch
                          placeholder="Select Service"
                          onChange= {(e) => this.handleSelect(e, 'service')}   
                        >
                          <Option value="1">corousel</Option>
                          <Option value="2">coupons </Option>                        
                        </Select>)}
                      </FormItem>
                      </Col>
                      <Col md={12} xs={24} style={colStyle}>
<FormItem {...formItemLayout} label="Requested Date:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('reqDt', {
                          rules: [
          
                            {
                              required: true,
                              message: 'Please input Requested Date!',
                            },
                          ],
                          onChange: (e) => this.handleNum(e, 'reqDt')
                        })(<DatePicker placeholder="Select Requeted Date" style={{ width: '100%' }} format="DD/MM/YYYY"/>)}
                      </FormItem>  
</Col>
<Col md={12} xs={24} style={colStyle}>
<FormItem {...formItemLayout} label="Completed Date:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('compDt', {
                          rules: [
          
                            {
                              required: false,
                              message: 'Please input Completed Date!',
                            },
                          ],
                          onChange: (e) => this.handleNum(e, 'compDt')
                        })(<DatePicker placeholder="Select Completed Date" style={{ width: '100%' }} format="DD/MM/YYYY"/>)}
                      </FormItem>  
                   
</Col>
<Col md={12} xs={24} style={colStyle}>
                   
                      <FormItem {...formItemLayout} label="Notes:" hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('notes', {
                          rules: [
                            {
                              message: 'The input is not valid!',
                            },
                            {
                              required: true,
                              message: 'Please input Notes!',
                            },
                          ],
                        })(<Input name="notes" id="notes" placeholder="Notes" onChange={this.handleChange} />)}
                      </FormItem>
                      </Col>
<Col md={24} xs={24} style={colStyle}>
          <span hidden={this.props.update}>
                   <Button type='primary' htmlType="submit" style={margin}>
                          SAVE SERVICE
                        </Button>
                        </span>
                        <span hidden={this.props.add}>
                        <Button type='primary' htmlType="submit" style={margin} onClick={() => this.addService()}>
                         SUBMIT
                        </Button>
                        </span>
                       
                        </Col> 
                      </Row>
      </div>
    );
  }
}
const WrappedFormWIthSubmissionButton = Form.create()(Service);
export default WrappedFormWIthSubmissionButton;
Service.contextTypes = {
    intl: PropTypes.object.isRequired,
  };
  