import NavigationComponent from "./NavigationComponent";
import ErrorMessage from "./ErrorMessage";
import React from 'react';
import * as Service from '../Service';

class AddTask extends NavigationComponent {

    constructor(props) {
        super(props, {
            errorText: ""
        });
    }

    addTask(e) {
        e.preventDefault();

        let taskTypeInput = e.target.taskType;
        let textData = {
            taskName: e.target.name.value,
            taskType: taskTypeInput.options[taskTypeInput.selectedIndex].value
        };

        let files = e.target.inputFile.files;

        Service.addTask(textData, files, (err, data) => {
            if (err) {
                this.setState({errorText: "Failed to add article"})
            } else {
                this.navigate("/")
            }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Add car</h3>
                            </div>
                            <div className="panel-body">
                                <form method="POST" onSubmit={this.addTask.bind(this)} role="form">
                                    <ErrorMessage errorText={this.state.errorText}/>
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Name" name="name"/>
                                        </div>
                                        <div className="form-group">
                                            <select name="taskType">
                                                <option value="LINEAR_EQUATIONS_SYSTEM" selected={true}>Linear Equations
                                                    System
                                                </option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <input type="file" className="form-control" placeholder="Input"
                                                   name="inputFile"/>
                                        </div>
                                        <button type="submit" className="btn btn-success btn-block">Add</button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddTask;