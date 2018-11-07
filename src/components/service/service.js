import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { DatePicker, Select } from 'antd';
import Form from '../../components/uielements/form';
import basicStyle from '../../settings/basicStyle';
import { PropTypes } from 'prop-types';
import Button from '../../components/uielements/button';
import { rtl } from '../../settings/withDirection';

const FormItem = Form.Item;
const Option = Select.Option;
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
        expDt: '',
        compDt: ''
    };
   this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
   
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
                      </Col>
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
<FormItem {...formItemLayout} label="Requeted Date:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('expDt', {
                          rules: [
          
                            {
                              required: true,
                              message: 'Please input Expiration Date!',
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
<Col md={24} xs={24} style={colStyle}>
          <span hidden={this.props.update}>
                   <Button type='primary' htmlType="submit" style={margin}>
                          SAVE SERVICE
                        </Button>
                        </span>
                        <span hidden={this.props.add}>
                        <Button type='primary' htmlType="submit" style={margin}>
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
  