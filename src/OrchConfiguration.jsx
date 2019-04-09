import React from 'react';
import ReactDOM from 'react-dom';
import { throws } from 'assert';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './OrchConfiguration.scss';

const sisenseServer = 'localhost';
const protocol = 'https';
const port = 443;

const baseUrl = protocol + '://' + sisenseServer + ':' + port + '/';

function JsonPreview(props) {

    return (

        <div><pre>{props.value}</pre></div>
    )
    
}

class ActiveECPanel extends React.Component {



    render () {

        let ecList = [];

        const ecButtons = ecList.map((ec) => {
            return (
            <button>{ec}</button>
            );
        })

        return (

            <div>
                {ecButtons}
            </div>


        )


    }


}

class SisenseToken extends React.Component {

    constructor(props) {

        console.log(JSON.stringify(props));
        super(props);
        this.state = {
            username: "",
            password: "",
            token: null,
            disables: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        // this.input = React.createRef();
    }
      handleSubmit(event) {
        console.log("UserName: " + this.state.username);
    console.log("Password: " + this.state.password);

            axios.post(baseUrl +'api/v1/authentication/login', {
                username: this.state.username,
                password: this.state.password
              })
              .then(response => {
                this.setState({ token: response.data.access_token });
                this.setState({disabled: !this.state.disabled})
              })
              .catch(function (error) {
                alert(error);
              });
        
        
        event.preventDefault();
      }
    
        handleUsernameChange(e) {
        this.setState({username: e.target.value});
     }
     handlePasswordChange(e) {
        this.setState({password: e.target.value});
     }
    render() {

        return (
            <div>
            <h5>Sisense Login</h5>       
        <form>
          <input type="text" name="username" placeholder="Sisense Username" value={this.state.username} onChange={this.handleUsernameChange} disabled = {(this.state.disabled)? "disabled" : ""}/>
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} disabled = {(this.state.disabled)? "disabled" : ""}/>
          <button type="button" onClick={this.handleSubmit} disabled = {(this.state.disabled)? "disabled" : ""}>Get Token</button>
          <div className='text-small text-const token-text'><em class="word-break">{this.state.token}</em></div>
        </form> 
    </div>
          );

    }

}
export class OrchConfiguration extends React.Component {

    constructor(props) {
        
        super(props);

        this.state = {

            isConfigSaved: false,
            isNewCofig: true,

        }

        console.log(JSON.stringify(this.props));
    }

    render() {

        const initConfJson = {general:{logLevel:"INFO",emails:[{email:"admin@sisense.com",name:"Admin"}]},cubes:{},tasks:{},scheduler:[{}]}


        return (

            <div  className='main'>
                <header>
                    Header
                </header>
                <main>
                    <div className='params'>  
                        <div>
                            <h1>Main</h1>
                            <div className='text_const'><span>{this.sisenseServer}</span></div>
                        </div>
                        <SisenseToken />
                    </div>
                </main>
                <aside>
                    <div>
                    <div className='preview'>
                        <h1>Preview</h1>
                    </div>
                    <JsonPreview value={this.state.isNewCofig ? JSON.stringify(initConfJson, null, 3) : "Coming soon!"}/>
                </div>
                </aside>
                <footer>
                    Footer
                </footer>
            </div>


        );

    }

}

function getActiveElasticubes() {
    const {exec} = require('child_process');
    const psmShellLocationLocation = "C:\\Program Files\\Sisense\\Prism\\Psm.exe"

    const regex = /Cube Name \[(.*)\] ID .*\r\n/g;
    let m;
    let ecNamesList = [];

    exec('"' + psmShellLocationLocation + '" ecs ListCubes serverAddress=localhost', {
        env: {
            SISENSE_PSM: "True"
        }
    }, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        // console.log(`stdout: ${stdout}`);
        while ((m = regex.exec(stdout)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
    
            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                // console.log(`Found match, group ${groupIndex}: ${match}`);
                ecNamesList.push(match);
                
    
            });
        }
        
        // var out = stdout.split(/Cube Name/);
        // console.log(`stderr: ${stderr}`);
    });




    return ecNamesList;
}