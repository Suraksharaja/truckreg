import React, { Component } from 'react';
import { Col, Row } from 'antd';
import LayoutContentWrapper from "../../components/utility/layoutWrapper.js";
import Form from '../../components/uielements/form';
import basicStyle from '../../settings/basicStyle';
import { Card } from 'antd';
import Tabs, { TabPane } from '../../components/uielements/tabs';
import './customers.css';
import Customer from '../../components/customers/customers';
import DocList from '../../components/docs/docsList';
import DriversList from '../../components/drivers/driversList';
import TruckList from '../../components/trucks/trucksList';
import ServicesList from '../../components/service/servicesList';

function callback(key) {}

class editCustomer extends Component {
  state = {
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
   activeTab: '1',
   info: this.props.location.state ? this.props.location.state.info : ''
    };
   this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    console.log(this.props.match.params.tabId)
    let self = this;
   let a = this.props.match.params.tabId.toString();
    self.setState({activeTab:  a})
  }

  
  // componentDidUpdate() {
  //   console.log('yesss');
  //   if(this.props.location.state) {
  //   console.log(this.props)
  //   let a = '';
  //   a = this.props.location.state.driver
  //   console.log(a);
  //   console.log(this.state.activeTab !== this.props.location.state.driver);
  //   if(this.state.activeTab2 !== a) {
  //   this.setState({activeTab: a,activeTab2: a  })
  //   if(a === '2') {
  //   this.editDriver();
  //   }
  //   else if(a === '3') {
  //     this.editTruck();
  //   }else if(a === '4') {
  //     this.editDoc();
  //   }else if(a === '5') {
  //     this.editService();
  //   }
  //   }

  // }
  // }
 
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
          <Card title={<h3 style={{color: 'darkblue', 'font-weight': 'bold'}}>{this.state.info ? this.state.info.Name.toUpperCase(): ''}</h3>}>
             <Form onSubmit={this.handleSubmit}> 
          
          <Tabs onChange={callback} type="card"  defaultActiveKey={this.state.activeTab}>
          
          <TabPane tab="Customer Info" key="1">
          <Card title={<h4 style={{color: 'darkblue', 'font-weight': 'bold'}}>EDIT CUSTOMER</h4>}>
          <Customer add ={true} update={false} info={this.state.info}/>
          </Card>
            </TabPane>
          <TabPane tab="Drivers" key="2">
         

          <DriversList  addressId= {this.state.info?this.state.info.Address.id : ''}/>
    
     
            </TabPane>
     
            <TabPane tab="Trucks " key="3">
           
            <TruckList/>
           
            </TabPane>
           
            <TabPane tab="Docs" key="4">
   
          <DocList/>
   
            </TabPane>
            <TabPane tab="Requested Services" key="5" >
         
          <ServicesList/>
 
         
            </TabPane>

          </Tabs>
                </Form>                              
        </Card>
        </Col>          
        </Row>
      </LayoutContentWrapper>
    );
  }
}
const WrappedFormWIthSubmissionButton = Form.create()(editCustomer);
export default WrappedFormWIthSubmissionButton;