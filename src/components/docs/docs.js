import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { Input, Select } from 'antd';
import Button from '../../components/uielements/button';
import Form from '../../components/uielements/form';
import { rtl } from '../../settings/withDirection';
import basicStyle from '../../settings/basicStyle';
import Popconfirm from '../../components/feedback/popconfirm';
import { PropTypes } from 'prop-types';

const baseUrl = 'http://res.cloudinary.com/'+process.env.REACT_APP_CLOUDINARY_NAME+'/image/upload'
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
 
  constructor(props) {
    super(props);
    this.state = {
       
        category: '',
        cloudUrl: '',
        desc: ''

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
                          ADD  DOCUMENT
                        </Button>
                        {this.state.imgError?<p style={{color: 'red'}}>Please add an image</p>:''}
                        </div>}
                   </Col>
                   <Col md={12} xs={24} style={colStyle}>
                      <FormItem {...formItemLayout} label="Description:" hasFeedback style={{ marginBottom: 0 }}>
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
                      <Col md={24} xs={24} style={colStyle}>
          <span hidden={this.props.update}>
                   <Button type='primary' htmlType="submit" style={margin}>
                          SAVE DOC
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
const WrappedFormWIthSubmissionButton = Form.create()(Doc);
export default WrappedFormWIthSubmissionButton;
Doc.contextTypes = {
    intl: PropTypes.object.isRequired,
  };
  