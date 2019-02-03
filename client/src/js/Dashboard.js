import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component{
	constructor(props) {
	    super(props);
	    
	    this.state = {
			activeChild : 0,
			data : null
		};
	}

	componentWillMount(){
		let reponse;
		fetch('/api/users', {
				method: 'POST',
				credentials: 'include',
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then(response => response.json())
			.then(data => {
				console.log('setting data state to ', data);
				this.setState({ data: data});
			})
			.catch(err => {
				console.log('Error: ', err);
			});
	}

	endJourney(num){
		let routeNum;
		if (num == 1){
			routeNum = 82;
		} else if (num == 2){
			routeNum = 371;
		}
		axios({
			method: 'post',
			url: '/api/journies/end',
			data: {
				"cardid": "123456",
				"school": "South Brunswick High School",
				"route": routeNum,
				"buddy": "SereneOasis"
			}
		});
	}

	setActiveChild(index, num){
		this.setState({ activeChild: index });
	}

	render(){
		if (this.state.data === null){
			var time = <span></span>;
			var status = <span></span>;
			var scheduled = <span></span>;
			var pickup = <span></span>;
			var kidsList = <span></span>;

		} else {
			console.log(this.state.data);
			var child = this.state.data.children[this.state.activeChild];
			var time = <span>{child.avgTime}</span>;
			var status = <span>{child.status}</span>;
			var scheduled = <span>{child.scheduledTime}</span>;
			var pickup = <span>{child.pickup}</span>;

			// var kidsList = <KidsList data={this.state.data} />

			var kidsList = this.state.data.children.map((value, index) => {
				console.log(value);
				return(
					<li onClick={this.setActiveChild.bind(this, index)}>{value.name}</li>
				);
			})
		}	


		
		return(
			<div>
				<header className="l-dashboard-header">
				    <div className="c-header-text">Dashboard</div>
				        <nav className="c-top-nav">
				            <ul className="c-top-nav__submenu">
				                { kidsList }
				            </ul>
				        </nav>
				</header>
				<main className="l-dashboard-main">
				    <div className="c-eta-text">
				        <div className="c-eta-text__timer">{ time }</div>
				    </div>
				    <div className="c-status-box">{ status }</div>
				    <div className="c-timeline"></div>

				    <div className="c-driver-info">
				        <div className="c-driver-info__label"><strong>Driver:</strong></div>
				        <div className="c-driver-info__text">Kendansha Wood <br /> VXP-312</div>
				    </div>

				    <button className="c-btn-map-view">Map View</button>

				</main>

				    <div className="c-student-info">
				        <div className="c-student-info__pickup"><b>Scheduled Pick-up Time:  </b>{ scheduled }</div>
				        <div className="c-student-info__location"><b>Pick-up location:  </b>
				                { pickup }</div>
	 				</div>
	 		</div>
		)
	}	
}

ReactDOM.render(
  <App>Hello</App>,
  document.getElementById('root')
);