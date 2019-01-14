import { Component, default as React } from 'react';
import ReactDOM from 'react-dom';
import Button from 'custom-react-button';
import { Client as BClient } from 'simple.space';
import { Client as SClient } from 'servers.space';
import './index.css';

const SpaceClient = new BClient();
const ServerClient = new SClient();

class SiteButton extends Component {
	constructor(props) {
		super(props);
		this.state = { bot: true };
	}

	render() {
		return (
			<div>
				Switch Sites -> <Button color="#ffffff" onClick={() => this.setState({ bot: !this.state.bot })}>{this.state.bot ? 'botlist.space' : 'serverlist.space'}</Button>
			</div>
		)
	}
}

function Stats(bot, raw = false) {
	return bot ? SpaceClient.fetchStats({ raw: raw }) : ServerClient.fetchStats({ raw: raw });
}

class Site extends Component {
	constructor(props) {
		super(props);
		this.state = { currentStats: 'No Fetch Yet', };
	}

	render() {
		return (
			<div>
				<div className='site-to-use'>
					<SiteButton />
				</div>
				<br />
				<div className='fetch-button'>
					<Button onClick={async () => {
						try {
							const val = document.getElementsByClassName('site-to-use').item(0).getElementsByTagName('Button').item(0).innerText;
							console.log(val);
							const i = await Stats(val === 'botlist.space' ? true : false);
							const contents = val === 'botlist.space'
								? `Approved Bots: ${i.approvedBots}\nUnapproved Bots: ${i.unapprovedBots}\nTotal Bots: ${i.totalBots}\nTotal User Count: ${i.users}\nTotal Bot Tags Avaialble: ${i.tags}`
								: `Total Guilds: ${i.guilds}\nTotal Users: ${i.users}\nTotal Guild Tags Available: ${i.tags}`;
							this.setState({
								currentStats: contents.split('\n').map((i, key) => {
									return <div key={key}>{i}</div>
								}),
							});
						} catch (e) {
							this.setState({ currentStats: e.toString() });
						}
					}}>Fetch</Button>
				</div>
				<br />
				<div className='stats-contents'>
					{this.state.currentStats}
				</div>
				<br />
				<div className='credit-because-i-can-add-it'>
					Created by <a href='https://github.com/iREDMe'>iREDMe</a>
					<br />
					<a href='https://github.com/iREDMe/bls-stats'>Shitty Source Code</a>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Site />, document.getElementById('root'));