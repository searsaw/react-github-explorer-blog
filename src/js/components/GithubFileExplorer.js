import React from 'react';
import nanoajax from 'nanoajax';

let GithubFileExplorer = React.createClass({
    getInitialState: function() {
        return {
            path: '/',
            files: [],
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.getFiles(nextProps.username, nextProps.repo);
    },
    getFiles: function(username, repo, path) {
        username = username || this.props.username;
        repo = repo || this.props.repo;
        path = path || this.state.path;
        nanoajax.ajax({ url: `https://api.github.com/repos/${username}/${repo}/contents${path}` },
            (code, responseText) => {
                let files = JSON.parse(responseText).slice(0).sort(function(a, b) {
                    if (a.type !== b.type) {
                        if (a.type === 'dir') {
                            return -1;
                        } else {
                            return 1;
                        }
                    } else {
                        if (a.name < b.name) {
                            return -1;
                        } else {
                            return 1;
                        }
                    }
                });
                this.setState({ files: files, path: path });
                console.log(JSON.parse(responseText));
            }
        );
    },
    changePath: function(path) {
        this.getFiles(null, null, '/' + path);
    },
    goBack: function() {
        let path = this.state.path.split('/').slice(0, -1).join('/');
        if (path === '') path = '/';

        this.getFiles(null, null, path);
    },
    getFirstData: function(file) {
        if (file.type === 'file') {
            return (
                <div className="file">
                    <i className="fa fa-file-o"></i>&nbsp;
                    {file.name}
                </div>
            );
        } else {
            return (
                <div className="directory">
                    <i className="fa fa-folder-o"></i>&nbsp;
                    <a onClick={this.changePath.bind(this, file.path)}>{file.name}</a>
                </div>
            );
        }
    },
    getDownloadButton: function(file) {
        let button = '';

        if (file.type === 'file') {
            button = (
                <a href={file.download_url} download>
                    <i className="fa fa-cloud-download"></i>
                </a>
            );
        }

        return button;
    },
    renderFile: function(file) {
        let firstData = this.getFirstData(file);
        let downloadButton = this.getDownloadButton(file);
        return (
            <tr key={file.sha}>
                <td>{firstData}</td>
                <td className="text-right">{downloadButton}</td>
            </tr>
        );
    },
    render: function() {
        let button;
        if (this.state.path !== '/') {
            button = <button className="btn btn-default btn-xs" onClick={this.goBack}>Go Back</button>;
        }
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table">
                        <caption>{this.state.path}</caption>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th className="text-right">{button}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.files.map(this.renderFile)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

export default GithubFileExplorer;