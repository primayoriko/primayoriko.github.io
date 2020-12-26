import React, { Component } from 'react';

class Education extends Component {

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
        <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
        <p>{education.description}</p></div>
			})
		}

		return (
      <section id="education">
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
			</section>
		);
	}
}

export default Education;