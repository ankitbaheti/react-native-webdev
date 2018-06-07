import React from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, FormLabel, FormInput, FormValidationMessage, Divider, Button} from 'react-native-elements'

class Essay extends React.Component {

    static navigationOptions = {title: 'Essay'};
    constructor(props){
        super(props)
        this.state = {
            examId: 1,
            questionId: 1,
            title: '',
            description: '',
            points: 0,
            editable: false
        }
        this.createQuestion = this.createQuestion.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }

    componentDidMount(){
        const examId = this.props.navigation.getParam("examId");
        const question = this.props.navigation.getParam("question");
        const editable = this.props.navigation.getParam("editable");
        if(question===undefined)
            this.setState({examId: examId});
        else
            this.setState({
                examId: examId,
                title: question.title,
                description: question.description,
                points: question.points,
                editable: editable,
                questionId: question.id})
    }

    updateForm(newState) {
        this.setState(newState)
    }

    createQuestion(){
        return fetch("http://localhost:8080/api/exam/"+this.state.examId+"/essay",{
            body: JSON.stringify({title: this.state.title,
                description: this.state.description,
                points: this.state.points}),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(function (response){
            return response.json();
        })
    }

    updateQuestion(){
        return fetch("http://localhost:8080/api/essayquestion/"+this.state.questionId,{
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
        return fetch("http://localhost:8080/api/question/"+this.state.questionId,{
            method: 'DELETE'
        })
    }

    render() {
        return (
            <ScrollView>
                <FormLabel>Essay Title</FormLabel>
                <TextInput value={this.state.title} style={{backgroundColor: 'white', margin: 5, height: 30}}
                           onChangeText={
                    text => this.updateForm({title: text})}/>

                {this.state.title === '' ?
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage> : null}

                <Divider style={{backgroundColor:'black' }}/>


                <FormLabel>Essay Description</FormLabel>
                <TextInput value={this.state.description} style={{backgroundColor: 'white', margin: 5, height: 30}}
                           onChangeText={
                    text => this.updateForm({description: text})
                }/>
                {this.state.description === '' ?
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage> : null}

                <Divider style={{backgroundColor:'black' }}/>

                <FormLabel>Essay Points</FormLabel>
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

                    <TextInput multiline = {true} style={{backgroundColor: 'white', margin: 5, height: 80}}/>

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
                                        this.createQuestion();
                                        this.props.navigation.navigate("QuestionsForExam", {examId: this.state.examId});
                                    }}/> :
                            <Button title="Update"
                                    backgroundColor="green"
                                    style={{margin: 5}}
                                    onPress={() => {
                                        this.updateQuestion();
                                        this.props.navigation.navigate("QuestionsForExam", {examId: this.state.examId});}}/>}

                        {this.state.editable ?
                        <Button title="Delete"
                                backgroundColor="red"
                                style={{margin: 5}}
                                onPress={() => {
                                    this.deleteQuestion();
                                    this.props.navigation.navigate("QuestionsForExam", {examId: this.state.examId});}}/> : null}
                    </View>
                    <View style={{height: 60}}/>
                </View>
            </ScrollView>
        )

    }
}

export default Essay