import React, { Component } from 'react';
import { Col, Row } from 'antd';
import LayoutContentWrapper from "../../components/utility/layoutWrapper.js";
import Form from '../../components/uielements/form';
import basicStyle from '../../settings/basicStyle';
import { Card } from 'antd';
import './customers.css';
import Customer from '../../components/customers/customers';

class addCustomer extends Component {
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
    return (
      <LayoutContentWrapper >
      
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
          <Card title={<h3 style={{color: 'darkblue', 'font-weight': 'bold'}}>ADD CUSTOMER</h3>}>
             <Form onSubmit={this.handleSubmit}> 
              <Customer  add ={false} update={true}/>
                </Form>                              
        </Card>
        </Col>          
        </Row>
      </LayoutContentWrapper>
    );
  }
}
const WrappedFormWIthSubmissionButton = Form.create()(addCustomer);
export default WrappedFormWIthSubmissionButton;