// import logo from './logo.svg';

import React, { Component } from 'react';
import $ from 'jquery';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Skill from './components/Skill';
import Project from './components/Project';
import Achiviement from './components/Achiviement';
import Certification from './components/Certification';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      resumeData: {}
    };
  }

  getResumeData(){
    $.ajax({
      url:'./resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount(){
    this.getResumeData();
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main}/>
        <About data={this.state.resumeData.main}/>
        {/* <Education data={this.state.resumeData.resume}/> */}
        {/*<Experience data={this.state.resumeData.portfolio}/>
        <Achiviement data={this.state.resumeData.portfolio}/>
        <Certification data={this.state.resumeData.portfolio}/>
        <Skill data={this.state.resumeData.portfolio}/>
        <Project data={this.state.resumeData.portfolio}/>
        <Contact data={this.state.resumeData.main}/>
        <Footer data={this.state.resumeData.main}/> */}
      </div>
    );
  }
}

export default App;
