import React, { Component } from 'react';
import ParticlesBg from "particles-bg";
import TypeIt from "typeit-react";

class Header extends Component {
  typingDescription(description){
     if(description == undefined)
      return;

     const desc = description.split("; ");
     return (
      <TypeIt 
         element={"h1"}
         style={{ color:"white", fontSize:"4.5vw" }}
         options={{
            // strings: ["This will be typed!", "sadasdas"],
            speed: 120,
            waitUntilVisible: true, 
            loop: true
          }}
         getBeforeInit={instance => {
            instance
              .type(desc[0])
              .pause(750)
              .empty()
              .type(desc[1])
              .pause(750)
              .empty()
              .type(desc[2])
              .pause(750)
              .empty()
              .type(desc[3])
        
            return instance;
          }}
      />
     );
  } 

  render() {
    if(this.props.data){
        var project = this.props.data.project;
        var github = this.props.data.github;
        var name = this.props.data.name;
        var description = this.props.data.description;
        var city = this.props.data.address.city;
        var networks = this.props.data.social.map(function(network){
            return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
        })
    }

    return (
      <header id="home">
         <ParticlesBg color="#FFFFFF" type="cobweb" bg={true} num={45}/>
         <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
            <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>

            <ul id="nav" className="nav">
               <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
               <li><a className="smoothscroll" href="#about">About</a></li>
               <li><a className="smoothscroll" href="#education">Education</a></li>
               <li><a className="smoothscroll" href="#experience">Experience</a></li>
               <li><a className="smoothscroll" href="#achiviement">Achiviement</a></li>
               <li><a className="smoothscroll" href="#certification">Certification</a></li>
               <li><a className="smoothscroll" href="#skill">Skill</a></li>
               <li><a className="smoothscroll" href="#project">Project</a></li>
               <li><a className="smoothscroll" href="#contact">Contact</a></li>
            </ul>
         </nav>

         <div className="row banner">
         
            <div className="banner-text">
               <h1 className="responsive-headline">{name}</h1>
               { this.typingDescription(description) }

               <hr />
               <ul className="social">
                  <a href={project} className="button btn project-btn"><i className="fa fa-book"></i>Project</a>
                  <a href={github} className="button btn github-btn"><i className="fa fa-github"></i>Github</a>
               </ul>
            </div>
         </div>

         <p className="scrolldown">
            <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
         </p>

      </header>
    );
  }
}

export default Header;
