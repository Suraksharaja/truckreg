import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { Input, Checkbox, Select } from 'antd';
import LayoutContentWrapper from "../../components/utility/layoutWrapper.js";
import Button from '../../components/uielements/button';
import Form from '../../components/uielements/form';
import { rtl } from '../../settings/withDirection';
import basicStyle from '../../settings/basicStyle';
import Popconfirm from '../../components/feedback/popconfirm';
import { Card } from 'antd';
import './users.css';
import { Link } from "react-router-dom";

const FormItem = Form.Item;
const Option = Select.Option;
const baseUrl = 'http://res.cloudinary.com/'+process.env.REACT_APP_CLOUDINARY_NAME+'/image/upload'
class addUser extends Component {
  state = {
    value: [],
    confirmDirty: false,
    dataSource: []
  };
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      email: '',
      phone: '',
      uName: '',
      pwd: '',
      role: '',
      customer: '',
      driver: '',
      cloudUrl: '',
      active: true,
      checked: true
    };
   this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
   
  }
 
  handleChange(event) {
    const elemName = event.target.name;
    this.setState({	[elemName]: event.target.value});
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          div: 0,
          offset: 0,
        },
        sm: {
          div: 0,
          offset: 6,
        },
      },
    };
    return (
      <LayoutContentWrapper >
      
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
          <Card title={<h3 style={{color: 'darkblue', 'font-weight': 'bold'}}>ADD USER</h3>}>
             <Form onSubmit={this.handleSubmit}>
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
                        })(<Input name="email" id="email" type= "email" placeholder="Email" onChange={this.handleChange} />)}
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
                           message: 'Please input Phone!',
                         },
                       ],
                     })(<Input name="phone" id="phone" placeholder="Phone" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   
                   <FormItem {...formItemLayout} label="User Name:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('uName', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input "User Name!',
                         },
                       ],
                     })(<Input name="uName" id="uName" placeholder="User Name" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   <FormItem {...formItemLayout} label="Password:" hasFeedback style={{ marginBottom: 0 }}>
                     {getFieldDecorator('pwd', {
                       rules: [
                         {
                           message: 'The input is not valid!',
                         },
                         {
                           required: true,
                           message: 'Please input Password!',
                         },
                       ],
                     })(<Input name="pwd" type="password" id="pwd" placeholder="Password" onChange={this.handleChange} />)}
                   </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   <FormItem {...formItemLayout} label="Role:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('role', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input Role!',
                            },
                          ]
                          })(<Select
                          allowClear
                          showSearch
                          placeholder="Select Role"
                          onChange= {(e) => this.handleSelect(e, 'role')}   
                        >
                          <Option value="1">corousel</Option>
                          <Option value="2">coupons </Option>                        
                        </Select>)}
                      </FormItem>
                      </Col>
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
                          style={{ width: '100%' }}
                          onChange= {(e) => this.handleSelect(e, 'customer')}   
                        >
                          <Option value="1">corousel</Option>
                          <Option value="2">coupons </Option>                        
                        </Select>)}
                      </FormItem>
                      </Col>
                      <Col md={12} xs={24} style={colStyle}>
                   <FormItem {...formItemLayout} label="Driver:  " hasFeedback style={{ marginBottom: 0 }}>
                        {getFieldDecorator('driver', {
                          rules: [
                            {
                              required: false,
                              message: 'Please input Driver!',
                            },
                          ]
                          })(<Select
                          allowClear
                          showSearch
                          placeholder="select Driver"
                          style={{ width: '100%' }}
                          onChange= {(e) => this.handleSelect(e, 'driver')}   
                        >
                          <Option value="1">corousel</Option>
                          <Option value="2">coupons </Option>                        
                        </Select>)}
                      </FormItem>
                   </Col>
                   
                   <Col md={12} xs={24} style={colStyle}>
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
                             <img height="160" width="160" className="prodimg" alt="" src={`${baseUrl}/${this.state.cloudUrl}`}/>
                            
                             </div>
                           </div>
                         </div>
                         </div>
                        :
                      <div  style={{'text-align': 'center','margin-top': '34px'}}>
                          <Button  onClick={this.upload} style={margin}>
                          ADD USER IMAGE
                        </Button>
                        {this.state.imgError?<p style={{color: 'red'}}>Please add an image</p>:''}
                        </div>}
                   </Col>
                   <Col md={24} xs={24} style={colStyle}>
                   <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                      {getFieldDecorator('active', {
                        valuePropName: 'checked',
                        initialValue: this.state.checked,
                        rules: [
                          {
                            message: 'Please input!',
                            required: false,
                          },
                        ],
                      })(
                        <Checkbox onChange={this.handleCheckbox} >
                          Active
                        </Checkbox>
                      )}
                    </FormItem>
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                   <Button type='primary' htmlType="submit" style={margin}>
                        SUBMIT
                        </Button>
                        <Button type="primary"   style={margin} >
                        
                        <Link to={'/admin/users/list'} className="near-white fw1 f7"> CANCEL</Link>
                       </Button>
                   </Col>
                </Row>      
                </Form>   
                           
        </Card>
        </Col>          
        </Row>
      </LayoutContentWrapper>
    );
  }
}
const WrappedFormWIthSubmissionButton = Form.create()(addUser);
export default WrappedFormWIthSubmissionButton;