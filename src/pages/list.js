import React from "react";
import Axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";
import { Accordion, Button, FormControl } from "react-bootstrap";
import './page.css'

const API = 'https://api.thecatapi.com/v1/breeds'


class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newArr: [],
            items: [],
        }
    }
    componentDidMount() {
        Axios.get(`${API}`)
            .then(res => {
                console.log(res.data)
                this.setState({ items: res.data })
            })
            .catch(error => {
                console.log(error + 'ini eror get list redzone');
            });
    }
    onFilter = () => {
        let input = this.refs.filter.value
        var newArray = this.state.items.filter(function (el) {
            return el.name == input
        })
        console.log(newArray);
        this.setState({ newArr: newArray })
    }
    fetchMoreData = () => {
        setTimeout(() => {
            this.setState({
                items: this.state.items.concat(this.state.items)
            });
        }, 1000);
    };

    render() {
        return (
            <div className="back">
                <h1>DATA KUCING</h1>
                <hr />
                <div className="head">
                    <FormControl className="form"
                        placeholder="input name here"
                        ref="filter"
                    />
                    <Button variant="secondary" onClick={this.onFilter} className="btn1" >find</Button>
                </div>
                <div id="scrollableDiv" style={{ height: 580, overflow: "auto",border:'1px solid white',width:600,marginLeft:'1rem' }}>
                    {this.state.newArr.length !== 0 ?
                        this.state.newArr.map(item => {
                            return (
                                <Accordion className="accor">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Nama: {item.name}, Id: {item.id}</Accordion.Header>
                                        <Accordion.Body>
                                            <div>
                                                Description: {item.description}
                                            </div>
                                            <div>Temperament : {item.temperament}</div>
                                            <div>Origin : {item.origin}</div>
                                            <div>
                                                Life Span : {item.life_span}
                                            </div>
                                            <div>Wieght; Imperial : {item.weight.imperial}, Metric: {item.weight.metric}</div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            )
                        })
                        :
                        <InfiniteScroll
                            dataLength={this.state.items.length}
                            next={this.fetchMoreData}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}
                            scrollableTarget="scrollableDiv"
                        >
                            {this.state.items.map((item, index) => (
                                <div key={index} >
                                    <Accordion className="accor">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>{index + 1}. Nama: {item.name}, Id: {item.id}</Accordion.Header>
                                            <Accordion.Body>
                                                <div>
                                                    Description: {item.description}
                                                </div>
                                                <div>Temperament : {item.temperament}</div>
                                                <div>Origin : {item.origin}</div>
                                                <div>
                                                    Life Span : {item.life_span}
                                                </div>
                                                <div>Wieght; Imperial : {item.weight.imperial}, Metric: {item.weight.metric}</div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            ))}
                        </InfiniteScroll>
                    }
                </div>
            </div>
        );
    }
    onShow = (index) => {
        this.setState({ indexShow: index })
    }
}

export default List
