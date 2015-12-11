import React from 'react';

let Form = React.createClass({
    formSubmitted: function(e) {
        e.preventDefault();
        this.props.submit(this.refs.repoName.value);
    },
    render: function() {
        return (
            <form id="changeRepoForm" onSubmit={this.formSubmitted} className="form-inline">
                <div className="form-group">
                    <label htmlFor="fullRepoName">Full Repo Name </label>
                    <input type="text" ref="repoName" name="fullRepoName" className="form-control"/>
                </div>
                <input type="submit" className="btn btn-default" value="Get repo filesystem!"/>
            </form>
        );
    }
});

export default Form;