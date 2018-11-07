import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { Input,DatePicker} from 'antd';
import Form from '../../components/uielements/form';
import basicStyle from '../../settings/basicStyle';
import { rtl } from '../../settings/withDirection';
import Button from '../../components/uielements/button'; 
import axios from '../../axios';
import notification from '../../components/notification';
import { PropTypes } from 'prop-types';

const FormItem = Form.Item;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic2FpQGdtYWlsLmNvbSIsInVzZXJJZCI6MzUsImRhdGUiOiIyMDE4LTEwLTE4VDExOjQ0OjE4LjcyM1oifSwiaWF0IjoxNTM5ODYzMDU4LCJleHAiOjE1NDUwNDcwNTh9.aI--gM5RUnit35NzZMeQ-Z1KC9UhvANAxx86Oz5eyLk";
class Truck extends Component {
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
        truckNo: '',
        vin: '',
        lp: '',
        registeredSt: '',
        make: '',
        model: '',
        year: '',
        registeredDt: '',
        renewalDt: '',
        inspDt: '',
        yearlyInspDt: ''
    };
   this.handleChange = this.handleChange.bind(this);
  }

  addTruck() {
    let obj = {};
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
    obj.TruckNumber= this.state.truckNo;
    obj.VIN= this.state.vin;
    obj.Customer_Id= this.state.contactPersonTitle;
    obj.LicensePlate= this.state.lp;
    obj.RegisteredSate= this.state.registeredSt;
    obj.Make = this.state.make;
    obj.Model= this.state.model;
    obj.Year= this.state.year;
    obj.RegisteredDate= this.state.registeredDt;
    obj.RenewalDate=this.state.renewalDt;
    obj.NinetyDaysInspectionDate= this.state.inspDt;
    obj.YearlyInspectionDate= this.state.yearlyInspDt;
   
  console.log(obj)

    axios.post('/api/admin/truck',
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
 
  handleChange(event) {
    const elemName = event.target.name;
    this.setState({	[elemName]: event.target.value});
  }
  
  handleNum(value, name) {

    this.setState({	[name]: value});
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
                    <Col md={12} xs={24} style={colStyle}>
                   
                      <FormItem {...formItemLayout} label="Truck Number:" hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('truckNo', {
                          rules: [
                            {
                              message: 'The input is not valid!',
                            },
                            {
                              required: true,
                              message: 'Please input Truck Number!',
                            },
                          ],
                        })(<Input name="truckNo" id="truckNo" placeholder="Truck Number " onChange={this.handleChange} />)}
                      </FormItem>
                      </Col>
                      <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="VIN:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('vin', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input VIN!',
                         },
                       ],
                     })(<Input name="vin" id="vin" placeholder="VIN " onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                      <FormItem {...formItemLayout} label="License Plate:" hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('lp', {
                          rules: [
                            {
                              message: 'The input is not valid!',
                            },
                            {
                              required: true,
                              message: 'Please input License Plate!',
                            },
                          ],
                        })(<Input name="lp" id="lp" placeholder="License Plate " onChange={this.handleChange} />)}
                      </FormItem>
                      </Col>
                      <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Registeterd State:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('registeredSt ', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input Registeterd State!',
                         },
                       ],
                     })(<Input name="registeredSt" id="registeredSt" placeholder="Registeterd State " onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="Make:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('make', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input Make!',
                         },
                       ],
                     })(<Input name="make" id="make" placeholder="Make " onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   <FormItem {...formItemLayout} label="Model:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('model', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input Model!',
                         },
                       ],
                     })(<Input name="model" id="model" placeholder="Model" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   <FormItem {...formItemLayout} label="Year:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('year', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input Year!',
                         },
                       ],
                     })(<Input name="year" id="year" placeholder="Year " onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
<FormItem {...formItemLayout} label="Registered Date:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('registeredDt', {
                          rules: [
          
                            {
                              required: true,
                              message: 'Please input Registered Date!',
                            },
                          ],
                          onChange: (e) => this.handleNum(e, 'registeredDt')
                        })(<DatePicker  style={{ width: '100%' }} format="DD/MM/YYYY"/>)}
                      </FormItem>  
</Col>
<Col md={12} xs={24} style={colStyle}>
<FormItem {...formItemLayout} label="Renewal Date:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('renewalDt', {
                          rules: [
          
                            {
                              required: true,
                              message: 'Please input Renewal Date!',
                            },
                          ],
                          onChange: (e) => this.handleNum(e, 'renewalDt')
                        })(<DatePicker  style={{ width: '100%' }} format="DD/MM/YYYY"/>)}
                      </FormItem>  
</Col>
<Col md={12} xs={24} style={colStyle}>
<FormItem {...formItemLayout} label="90Days Inspection Date:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('inspDt', {
                          rules: [
          
                            {
                              required: true,
                              message: 'Please input 90Days Inspection Date!',
                            },
                          ],
                          onChange: (e) => this.handleNum(e, 'inspDt')
                        })(<DatePicker  style={{ width: '100%' }} format="DD/MM/YYYY"/>)}
                      </FormItem>  
</Col>
<Col md={12} xs={24} style={colStyle}>
<FormItem {...formItemLayout} label="Yearly Inspection Date:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('yearlyInspDt', {
                          rules: [
          
                            {
                              required: true,
                              message: 'Please input Yearly Inspection Date!',
                            },
                          ],
                          onChange: (e) => this.handleNum(e, 'yearlyInspDt')
                        })(<DatePicker  style={{ width: '100%' }} format="DD/MM/YYYY"/>)}
                      </FormItem>  
                  
</Col>
<Col md={24} xs={24} style={colStyle}>
          <span hidden={this.props.update}>
                   <Button type='primary' htmlType="submit" style={margin}>
                          SAVE TRUCK
                        </Button>
                        </span>
                        <span hidden={this.props.add}>
                        <Button type='primary' htmlType="submit" style={margin}  onClick={() => this.addTruck()}>
                         SUBMIT
                        </Button>
                        </span>
                       
                        </Col> 
                      </Row>
      </div>
    );
  }
}
const WrappedFormWIthSubmissionButton = Form.create()(Truck);
export default WrappedFormWIthSubmissionButton;
Truck.contextTypes = {
    intl: PropTypes.object.isRequired,
  };
  