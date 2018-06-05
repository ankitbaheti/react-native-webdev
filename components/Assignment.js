import React from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, FormLabel, FormInput, FormValidationMessage, Divider, Button} from 'react-native-elements'

class Assignment extends React.Component {

    static navigationOptions = {title: 'New Assignment'}
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
        return fetch("http://10.0.0.197:8080/api/lesson/"+this.state.lessonId+"/assignment",{
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
        return fetch("http://10.0.0.197:8080/api/assignment/"+this.state.assignmentId,{
            body: JSON.stringify({title: this.state.title,
                description: this.state.description,
                points: this.state.points}),
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT'
        }).then(function (response){
            return response.json();
        })
    }

    render(){
        return(
            <ScrollView style={{padding: 20}}>

                <FormLabel>Assignment Title</FormLabel>
                <FormInput value={this.state.title} onChangeText={
                    text => this.updateForm({title: text})
                }/>

                {this.state.title === '' ?
                    <FormValidationMessage>
                    Title is required
                </FormValidationMessage> : null}


                <FormLabel>Assignment Description</FormLabel>
                <FormInput value={this.state.description} onChangeText={
                    text => this.updateForm({description: text})
                }/>
                {this.state.description === '' ?
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage> : null}

                <FormLabel>Assignment Points</FormLabel>
                <FormInput value={this.state.points.toString()} onChangeText={
                    text => this.updateForm({points: text})
                }/>

                {((this.state.points === 0) || (this.state.points == '')) ?
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage> : null}

                <Divider style={{
                    backgroundColor:
                        'blue' }}/>
                <Text h2>Preview</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text h3>{this.state.title}</Text>
                    <Text h3>{this.state.points}pts</Text>
                </View>
                <Text>{this.state.description}</Text>

                <Text h3>Essay</Text>
                <TextInput multiline = {true}/>

                <Text h3>Upload a file</Text>
                <FormInput/>

                <Text h3>Submit a link</Text>
                <FormInput/>

                <View style={{flexDirection: 'row'}}>
                    <Button title="Cancel"
                            onPress={() => this.props.navigation.goBack()}/>
                    {!this.state.editable ?
                    <Button title="Submit"
                            onPress={() => {
                                this.createAssignment();
                                this.props.navigation.navigate("ShowAssignment", {lessonId: this.state.lessonId});}}/> :
                        <Button title="Update"
                                onPress={() => {
                                    this.updateAssignment();
                                    this.props.navigation.navigate("ShowAssignment", {lessonId: this.state.lessonId});}}/>}
                </View>
                <View style={{height: 60}}/>

            </ScrollView>
        )
    }
}

export default Assignment