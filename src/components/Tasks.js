import React from 'react';
import * as Service from "../Service";
import NavigationComponent from "./NavigationComponent";

const IN_PROGRESS = "IN_PROGRESS";
const ADDED = "ADDED";
const DONE = "DONE";
const FAILED = "FAILED";
const CANCELLED = "CANCELLED";

class Task extends NavigationComponent {

    constructor(props) {
        super(props, {
            taskId: props.taskId,
            status: props.taskStatus,
            progress: 0,
            taskName: props.taskName,
            prevStatus: null
        });
    }

    equalStatuses(stat1, stat2) {
        return stat1 != null && stat2 != null && stat1.status === stat2.status
            && Math.abs(stat1.progress - stat2.progress) <= 0.0001;
    }

    updateTaskStatus() {
        Service.getTaskStatus(this.state.taskId, (err, taskEntry) => {
            if (err) {
                console.log(err);
                return;
            }
            let {status, progress} = taskEntry;
            if (!this.equalStatuses(taskEntry, this.state.prevStatus)) {
                if (status === DONE) {
                    progress = 1;
                }
                this.setState({status, progress, prevStatus: taskEntry});
            }
        });
    }

    getImage(status, progress, taskName) {
        let image = "./images/restart.jpeg";
        if (status === ADDED) {
            image = "./images/start.png";
        } else if (status === IN_PROGRESS) {
            image = "./images/stop.jpg";
        } else if (status === DONE) {
            image = "./images/download.png";
        }

        return image;
    }

    downloadAction() {
        Service.downloadTaskOutput(this.state.taskId)
    }

    restartAction() {
        this.startAction();
    }

    startAction() {
        console.log("DDDDD");
        Service.runTask(this.state.taskId, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                this.updateTaskStatus();
            }
        })
    }

    stopAction() {
        Service.killTask(this.state.taskId, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                this.updateTaskStatus();
            }
        })
    }

    getAction(status, progress, taskName) {
        let action = this.restartAction;
        if (status === ADDED) {
            action = this.startAction;
        } else if (status === IN_PROGRESS) {
            action = this.stopAction;
        } else if (status === DONE) {
            action = this.downloadAction;
        }

        return action;
    }

    progress() {
        return this.state.progress * 100;
    }

    progressStyle() {
        return `${this.progress()}%`;
    }

    render() {
        this.updateTaskStatus();
        let {status, progress, taskName} = this.state;
        let image = this.getImage(status, progress, taskName);
        let action = this.getAction(status, progress, taskName).bind(this);

        return (
            <article className="search-result row">
                <div className="col-xs-12 col-sm-12 col-md-1">
                    <div title={this.state.taskName} className="thumbnail">
                        <button onClick={e => action()}>
                            <img src={image} width="50" height="50"
                                 alt={this.state.taskName}/>
                        </button>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-3 excerpet">
                    <h4>{this.state.taskName} ({this.state.status})</h4>
                </div>
                <br/>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow={this.progress()}
                         aria-valuemin="0" aria-valuemax="100" style={{width: this.progressStyle()}}>
                    </div>
                </div>

                <span className="clearfix"/>
            </article>
        );
    }

}

class Tasks extends NavigationComponent {

    constructor(props) {
        super(props, {
            tasks: []
        });

        this.loadTasks();
    }

    loadTasks() {
        Service.loadTasks((err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            this.setState({tasks: data});
        })
    }

    render() {
        let tasks = this.state.tasks.map(task => <Task taskId={task.id} taskName={task.name}
                                                       taskStatus={task.taskStatus}/>);

        return (
            <div className="container body-content">
                <h1>
                    <br/>
                    <br/>
                    Tasks
                </h1>
                <h2 className="lead"><strong className="text-danger">{this.state.tasks.length}</strong> tasks found</h2>
                <section className="col-xs-12 col-sm-6 col-md-12">
                    {tasks}
                </section>
            </div>
        );
    }
}

export default Tasks;
