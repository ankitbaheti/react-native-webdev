import React from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, FormLabel, FormInput, FormValidationMessage, Divider, Button} from 'react-native-elements'

class FillBlank extends React.Component {

    static navigationOptions = {title: 'Fill In The Blanks'};
    constructor(props){
        super(props)
        this.state={
            editable: false,
            questionId: 1,
            examId: 1,
            title: '',
            description: '',
            points: 0,
            variable: ''
        }
        this.createQuestion = this.createQuestion.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }

    componentDidMount(){
        const examId = this.props.navigation.getParam("examId");
        const question = this.props.navigation.getParam("question");
        const editable = this.props.navigation.getParam("editable");
        if(question === undefined)
            this.setState({examId: examId})
        else
            this.setState({
                examId: examId,
                title: question.title,
                description: question.description,
                points: question.points,
                editable: editable,
                questionId: question.id,
                variable: question.variable
            })
    }

    updateForm(newState) {
        this.setState(newState)
    }

    createQuestion(){
        return fetch("http://localhost:8080/api/exam/"+this.state.examId+"/blanks",{
            body: JSON.stringify({title: this.state.title,
                description: this.state.description,
                points: this.state.points,
                variable: this.state.variable}),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(function (response){
            return response.json();
        })
    }

    updateQuestion(){
        return fetch("http://localhost:8080/api/fillblank/"+this.state.questionId,{
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                points: this.state.points,
                variable: this.state.variable}),
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

    splitString(){
        var lines = this.state.variable.split("\n")
        return lines.map((line, index) => {
            var words = line.split(" ")

            return (
                <View key={index} style={{flexDirection: 'row', backgroundColor: 'white', margin: 5}}>

                    {words.map((word, index) => {
                        if(word.match('\\[.*\\]'))
                            return <TextInput key={index} style={{backgroundColor: '#ffffff', margin: 5, height: 30, width: 50, borderWidth: 2}}/>
                        else
                            return <Text key={index} style={{margin: 1}} h4>{word}</Text>
                    })}
                </View>
            )
        })
    }

    render() {
        return (
            <ScrollView>

                <FormLabel>Fill In The Blank Title</FormLabel>
                <TextInput value={this.state.title} style={{backgroundColor: 'white', margin: 5, height: 30}}
                           onChangeText={
                    text => this.updateForm({title: text})}/>

                {this.state.title === '' ?
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage> : null}
                <Divider style={{backgroundColor:'black'}}/>

                <FormLabel>Fill In The Blank Description</FormLabel>
                <TextInput value={this.state.description} style={{backgroundColor: 'white', margin: 5, height: 30}}
                           onChangeText={
                    text => this.updateForm({description: text})}/>

                {this.state.description === '' ?
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage> : null}
                <Divider style={{backgroundColor:'black'}}/>

                <FormLabel>Fill In The Blank Points</FormLabel>
                <TextInput value={this.state.points.toString()} style={{backgroundColor: 'white', margin: 5, height: 30}}
                           onChangeText={
                    text => this.updateForm({points: text})}/>

                {((this.state.points === 0) || (this.state.points == '')) ?
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage> : null}
                <Divider style={{backgroundColor:'black'}}/>

                <FormLabel>Enter the question</FormLabel>
                <TextInput multiline={true}
                           style={{backgroundColor: 'white', margin: 5, height: 80}}
                           value={this.state.variable}
                           onChangeText={text => this.updateForm({variable: text})}/>

                {this.state.variable === '' ?
                    <FormValidationMessage>
                        Question is required
                    </FormValidationMessage> : null}

                <Divider style={{backgroundColor:'black'}}/>
                <Text h3>Preview</Text>
                <View style={{backgroundColor: '#464b50', padding: 5}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: 'white'}} h3>{this.state.title}</Text>
                        <Text style={{color: 'white'}} h3>{this.state.points}pts</Text>
                    </View>
                    <Text style={{color: 'white', margin: 2}}>{this.state.description}</Text>

                    {this.splitString()}

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
                                        this.props.navigation.navigate("QuestionsForExam", {examId: this.state.examId});}}/>
                        }
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

export default FillBlank