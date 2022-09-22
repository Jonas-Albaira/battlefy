import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export class Call extends React.Component {

    constructor(props) {
        super(props);
        this.state = { title: [],
        count:0,
        currTitle:[],
        id:[]};
        this.callAPI = this.callAPI.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.checkDone = this.checkDone.bind(this);

    }

    addEvent(e){

        const text=e.target.taskName.value;

        //const taskAdd = this.state.title.push(<tr><td>{e.target.taskName.value}</td></tr>);

        //console.log(this.state.title);
        let url="https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + text+ "?api_key=RGAPI-cba348cf-bab3-4c1b-86ee-26934f795958"
        alert(url);
    }

    checkDone(e){

        let id=this.state.id;
        fetch('http://localhost:8080/todo/'+e, { method: 'DELETE' })
            .then(() => this.setState({ status: 'Delete successful' }));

    }

    callAPI(e){

        let url="http://localhost:8080/todo";

        var movieList = [];

        const config = {
            headers: {'Access-Control-Allow-Origin': true,
                'Access-Control-Allow-Headers': true}
        };

        axios
            .get(url,config)
            .then(response => {
                //console.log(response.data);
                //add condition if undefined or empty
                const doubled = response.data.map((entry) => <tr><td>{entry.title} </td><td><button name="taskID" onClick={() => this.checkDone(entry.id)}>Yes{this.setState({
                    id:entry.id
                })}</button></td></tr>);
                //console.log(doubled);

                //const doneTask = doubled.entry.done
                console.log(doubled);
                this.setState({
                    title: doubled,
                    count: doubled.count+1
                })

            })
            .catch(error => console.error(error));

    }

    render() {

        //this.callAPI();

        const taskItems = (<table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Done</th>
                    </tr>
                </thead>
                <tbody>

                        {this.state.title}


                </tbody>
            </table>
        )

        const login = (<div>
            <form action='#'
                  onSubmit={this.addEvent}
            >
                <input
                    type="text"
                    placeholder="summoner name"
                    name="taskName"
                />
                <input
                    type="submit"
                />
            </form>
            <br/>
        </div>);

        return (
            <div>
                <h1>To-Do List</h1>
                {login}
                {taskItems}
            </div>
        );
    }
}
export default Call;