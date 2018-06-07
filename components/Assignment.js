import React from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, FormLabel, FormInput, FormValidationMessage, Divider, Button} from 'react-native-elements'

class Assignment extends React.Component {

    static navigationOptions = {title: 'Assignment'}
    constructor(props){
        super(props)
        this.state = {
            assignmentId: 1,
            editable: false,
            lessonId: 1,
            title: '',
            description: '',
            points: 0
        }
        this.createAssignment = this.createAssignment.bind(this);
        this.updateAssignment = this.updateAssignment.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }

    componentDidMount() {
        const lessonId = this.props.navigation.getParam("lessonId")
        const assignment = this.props.navigation.getParam("assignment")
        const editable = this.props.navigation.getParam("editable");
        if(assignment === undefined)
            this.setState({lessonId: lessonId})
        else
            this.setState({lessonId: lessonId,
                editable: editable,
                assignmentId: assignment.id,
                title: assignment.title,
                description: assignment.description,
                points: assignment.points})
    }


    updateForm(newState) {
        this.setState(newState)
    }

    createAssignment(){
        return fetch("http://localhost:8080/api/lesson/"+this.state.lessonId+"/assignment",{
            body: JSON.stringify({title: this.state.title,
                description: this.state.description,
                points: this.state.points}),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(function (response){
            return response.json();
        })
    }

    updateAssignment(){
        return fetch("http://localhost:8080/api/assignment/"+this.state.assignmentId,{
            body: JSON.stringify({title: this.state.title,
                description: this.state.description,
                points: this.state.points}),
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT'
        }).then(function (response){
            return response.json();
        })
    }

    deleteQuestion(){
        return fetch("http://localhost:8080/api/assignment/"+this.state.assignmentId,{
            method: 'DELETE'
        })
    }

    render(){
        return(
            <ScrollView style={{padding: 10}}>

                <FormLabel>Assignment Title</FormLabel>
                <TextInput  value={this.state.title}
                            style={{backgroundColor: 'white', margin: 5, height: 30}}
                            onChangeText={text => this.updateForm({title: text})}/>

                {this.state.title === '' ?
                    <FormValidationMessage>
                    Title is required
                </FormValidationMessage> : null}

                <Divider style={{backgroundColor:'black' }}/>

                <FormLabel>Assignment Description</FormLabel>
                <TextInput value={this.state.description}
                           style={{backgroundColor: 'white', margin: 5, height: 30}}
                           onChangeText={text => this.updateForm({description: text})}/>
                {this.state.description === '' ?
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage> : null}
                <Divider style={{backgroundColor:'black' }}/>
                <FormLabel>Assignment Points</FormLabel>
                <TextInput value={this.state.points.toString()} style={{backgroundColor: 'white', margin: 5, height: 30}}
                           onChangeText={
                    text => this.updateForm({points: text})
                }/>

                {((this.state.points === 0) || (this.state.points == '')) ?
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage> : null}

                <Divider style={{backgroundColor:'black' }}/>
                <Text h3>Preview</Text>
                <View style={{backgroundColor: '#464b50', padding: 5}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: 'white'}} h3>{this.state.title}</Text>
                        <Text style={{color: 'white'}} h3>{this.state.points}pts</Text>
                    </View>
                    <Text style={{color: 'white', margin: 2}}>{this.state.description}</Text>

                    <Text style={{color: 'white'}} h4>Essay</Text>
                    <TextInput multiline = {true} style={{backgroundColor: 'white', margin: 5, height: 80}}/>

                    <Text style={{color: 'white'}} h4>Upload a file</Text>
                    <TextInput style={{backgroundColor: 'white', margin: 5, height: 30}}/>

                    <Text style={{color: 'white'}} h4>Submit a link</Text>
                    <TextInput style={{backgroundColor: 'white', margin: 5, height: 30}}/>

                    <View style={{flexDirection: 'row'}}>
                        <Button title="Cancel"
                                backgroundColor="red"
                                style={{margin: 5}}
                                onPress={() => this.props.navigation.goBack()}/>
                        {!this.state.editable ?
                        <Button title="Submit"
                                backgroundColor="blue"
                                style={{margin: 5}}
                                onPress={() => {
                                    this.createAssignment();
                                    this.props.navigation.navigate("ShowAssignment", {lessonId: this.state.lessonId});}}/> :
                            <Button title="Update"
                                    backgroundColor="green"
                                    style={{margin: 5}}
                                    onPress={() => {
                                        this.updateAssignment();
                                        this.props.navigation.navigate("ShowAssignment", {lessonId: this.state.lessonId});}}/>}
                        {this.state.editable ?
                            <Button title="Delete"
                                    backgroundColor="red"
                                    style={{margin: 5}}
                                    onPress={() => {
                                        this.deleteQuestion();
                                        this.props.navigation.navigate("ShowAssignment", {lessonId: this.state.lessonId});}}/> : null}
                    </View>
                    <View style={{height: 60}}/>
                </View>

            </ScrollView>
        )
    }
}

export default Assignment