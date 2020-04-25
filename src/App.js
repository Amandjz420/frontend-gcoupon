import React, {Component} from 'react';
import CouponCard from './component/coupon';
import './App.css';
import SearchField from "react-search-field";
import {createUseMedia} from 'react-use-media';
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import {getCouponData} from './api/homepage'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isDesktop: createUseMedia({minWidth: 1000}),
      next: null,
      previous: null,
      results: [],
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.handleEndScroll = this.handleEndScroll.bind(this)
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.handleEndScroll();
    }
  }

  handleEndScroll() {
    if(this.state.next){
      getCouponData(this.handleCouponData, this.state.next)
    }
  }

  handleCouponData = ( data ) => {
    if(data.previous){
      this.setState({results: [...this.state.results, ...data.results]})
    } else {
      this.setState({...data})
    }
  }

  handleSearch = (value) => {
    getCouponData(this.handleCouponData, null, value)
  }

  componentDidMount() {
    getCouponData(this.handleCouponData)
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <div className={'header-bar'}>
            <h1 className={"header-title"}>GCoupons</h1>
            <div  className={"search-bar"}>
              <SearchField
                placeholder="search category name, merchant"
                onChange={(text) => {
                  if(text.length===0){
                    getCouponData(this.handleCouponData)
                  }
                  this.setState({searchText: text}
                  )}}
                searchText={this.state.searchText}
                classNames="search-bar"
                onEnter={(text) => this.handleSearch(text) }
                onSearchClick={(text) => this.handleSearch(text) }
              />
            </div>
          </div>
            <div className={'coupon-container'}>
              <Row gutter={40}>
              {
                this.state.results.length > 0 &&
                this.state.results.map((item) => {
                  return (
                    <Col
                      xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 4 }}
                      lg={{ span: 3 }} xl={{ span: 3 }}>
                    <CouponCard
                      name={item.name}
                      data={item}
                    />
                    </Col>
                  )

                 })
              }
              </Row>
            </div>
        </header>
      </div>
    );
  }
}

export default App;
