import React from 'react';
import Form from './Form';
import GithubFileExplorer from './GithubFileExplorer';

let App = React.createClass({
    getInitialState: function() {
        return {
            username: '',
            repo: '',
        };
    },
    formSubmitted: function(repoName) {
        var splitData = repoName.split('/');
        this.setState({
            username: splitData[0],
            repo: splitData[1],
        });
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <Form submit={this.formSubmitted}/>
                    <hr/>
                    <GithubFileExplorer username={this.state.username} repo={this.state.repo}/>
                </div>
            </div>
        );
    }
});

export default App;