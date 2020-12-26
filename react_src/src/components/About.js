import React, { Component } from 'react';

class About extends Component {
  render() {

    if(this.props.data){
			var name = this.props.data.name;
			var fullName = this.props.data.fullname;
      var profilepic= this.props.data.image;
      var bio = this.props.data.bio;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var resumeDownload = this.props.data.resumedownload;
    }

    return (
      <section id="about" style={{ backgroundColor:"#222222", margin:"0 50" }} >
				{/* <div className="three columns"> */}
				<div>
						<img className="profile-pic" style={{ backgroundColor:"#111111" }} src={profilepic} alt="Naufal Profile Pic" />
				</div>
				<div className="row" >
					{/* <div className="nine columns main-col"> */}
					<div style={{ marginTop:30 }}>
						<h2>About Me</h2>
						<p>{bio}</p>
						<div className="row">
							<div className="columns contact-details">
								<h2>Contact Details</h2>
								<p className="address">
									<span>{fullName}</span><br />
									<span>{street}<br />
												{city}, {state}, {zip}
											</span><br />
									<span>{phone}</span><br />
												<span>{email}</span>
								</p>
							</div>
							<div className="columns download">
								<p>
									<a href={resumeDownload} className="button">
										<i className="fa fa-download"></i>Download Resume
									</a>
								</p>
							</div>
						</div>
					</div>

					<div className="">
						<h2>Field of Interest</h2>
						<p className="address">
							<span>{fullName}</span><br />
							<span>{street}<br />
										{city}, {state}, {zip}
									</span><br />
							<span>{phone}</span><br />
										<span>{email}</span>
						</p>
					</div>
				</div>
   		</section>
    );
  }
}

export default About;
