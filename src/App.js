import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Testimonials from './Components/Testimonials';
import Portfolio from './Components/Portfolio';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

  }

  exportPdf = () => {
    html2canvas(document.querySelector(".App")).then(canvas => {
      // document.body.appendChild(canvas);  // if you want see your screenshot in body.
       const imgData = canvas.toDataURL('images/png');
       const pdf = new jsPDF();
       pdf.addImage(imgData, 'PNG', 0, 0);
       pdf.save("download.pdf"); 
   });

}

  getResumeData(){
    $.ajax({
      url:'/resumeData.json',
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
        <About data={this.state.resumeData.main} pdfFunction={this.exportPdf}/>
        <Resume data={this.state.resumeData.resume}/>
        <Portfolio data={this.state.resumeData.portfolio}/>
        <Testimonials data={this.state.resumeData.testimonials}/>
        <Contact data={this.state.resumeData.main}/>
        <Footer data={this.state.resumeData.main}/>
      </div>
    );
  }
}

export default App;
