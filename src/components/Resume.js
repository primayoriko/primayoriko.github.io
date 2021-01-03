import React, { Component } from 'react';

class Resume extends Component {
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  render() {

    if(this.props.data){
      var skillmessage = this.props.data.skillmessage;

      var education = this.props.data.education.map(function(education){
        return <div key={education.school}><h3>{education.school}</h3>
        <p className="info">{education.degree} <span>&bull;</span><em className="info">{education.time}</em></p>
        <p>{education.description}</p></div>
      })

      var experience = this.props.data.experience.map(function(experience){
        return <div key={experience.company}><h3>{experience.company}</h3>
            <p className="info">{experience.title}<span>&bull;</span> <em className="info">{experience.time}</em></p>
            <p>{experience.description}</p>
        </div>
      })

      var achiviement = this.props.data.achiviement.map(function(achiviement){
        return <div key={achiviement.event}><h3>{achiviement.event}</h3>
						<p className="info">{achiviement.organizer}<span>&bull;</span> <em className="info">{achiviement.time}</em></p>
            <p className="info">{achiviement.title}<span>&bull;</span> {achiviement.scope}</p>
            <p>{achiviement.description}</p>
        </div>
	  })
	  
	  var certification = this.props.data.certification.map(function(certification){
        return <div key={certification.title}><h3>{certification.title}</h3>
            <p className="info">{certification.institution}<span>&bull;</span> <em className="info">{certification.time}</em></p>
            <p>{certification.description}</p>
        </div>
      })

      var skill = this.props.data.skill.map((skill)=>{
        var className = 'bar-expand '+skill.name.toLowerCase();
        return (
          <li key={skill.name}>
            <span style={{width:skill.level, backgroundColor:this.getRandomColor()}}className={className}></span><em>{skill.name}</em>
          </li>
        )
      });
    }

    return (
      <section id="resume">
				<div className="row education">
					<div className="three columns header-col">
							<h1><span>Education</span></h1>
					</div>
					<div className="nine columns main-col">
						<div className="row item">
							<div className="twelve columns">
								{education}
							</div>
						</div>
					</div>
				</div>

				<div className="row experience">
					<div className="three columns header-col">
							<h1><span>experience</span></h1>
					</div>

					<div className="nine columns main-col">
						<div className="row item">
							<div className="twelve columns">
								{experience}
							</div>
						</div>
					</div>
				</div>

				<br></br>

        <div className="row achiviement">
					<div className="three columns header-col">
							<h1><span>achiviement</span></h1>
					</div>

					<div className="nine columns main-col">
						<div className="row item">
							<div className="twelve columns">
								{achiviement}
							</div>
						</div>
					</div>
				</div>

				<br></br>

        <div className="row certification">
					<div className="three columns header-col">
							<h1><span>certification</span></h1>
					</div>

					<div className="nine columns main-col">
					<div className="row item">
							<div className="twelve columns">
								{certification}
							</div>
						</div>
					</div>
				</div>
				
				<br></br>

				<div className="row skill">
					<div className="three columns header-col">
							<h1><span>skill</span></h1>
					</div>

					<div className="nine columns main-col">
						<p>{skillmessage}</p>
						<div className="bars">
							<ul className="skill">
								{skill}
							</ul>
						</div>
					</div>
      	</div>
   		</section>
    );
  }
}

export default Resume;
