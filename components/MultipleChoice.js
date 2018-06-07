import React from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, FormLabel, FormInput, FormValidationMessage, Divider, Button, CheckBox} from 'react-native-elements'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

class MultipleChoice extends React.Component {

    static navigationOptions = {title: 'Multiple Choice Questions'};
    constructor(props){
        super(props)
        this.state={
            examId: 1,
            editable: false,
            questionId: 1,
            title: '',
            description: '',
            points: 0,
            choice: '',
            correct: 0,
            choices: []
        }
        this.updateForm = this.updateForm.bind(this);
        this.addOption = this.addOption.bind(this);
        this.deleteChoice = this.deleteChoice.bind(this);
        this.selectedChoice = this.selectedChoice.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
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
                correct: question.correct,
                choices: question.choices,
                questionId: question.id,
                editable: editable
            })
    }

    createQuestion(){
        return fetch("http://localhost:8080/api/exam/"+this.state.examId+"/choice",{
            body: JSON.stringify({title: this.state.title,
                description: this.state.description,
                points: this.state.points,
                choices: this.state.choices,
                correct: this.state.correct}),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(function (response){
            return response.json();
        })
    }

    updateQuestion(){
        return fetch("http://localhost:8080/api/mcq/"+this.state.questionId,{
            body: JSON.stringify({title: this.state.title,
                description: this.state.description,
                points: this.state.points,
                choices: this.state.choices,
                correct: this.state.correct}),
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

    updateForm(newState) {
        this.setState(newState)
    }

    selectedChoice(index){
        this.updateForm({correct: index})
    }

    deleteChoice(index){
        var options = this.state.choices
        options.splice(index.index, 1)
        this.updateForm({choices: options})
    }

    addOption(){
        var options = this.state.choices
        options.push(this.state.choice)
        this.updateForm({choices: options})
    }

    render() {
        return (
            <ScrollView>
                <FormLabel>MCQ Title</FormLabel>
                <TextInput value={this.state.title}
                           style={{backgroundColor: 'white', margin: 5, height: 30}}
                           onChangeText={
                    text => this.updateForm({title: text})}/>

                {this.state.title === '' ?
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage> : null}

                <Divider style={{backgroundColor:'black'}}/>


                <FormLabel>MCQ Description</FormLabel>
                <TextInput value={this.state.description}
                           style={{backgroundColor: 'white', margin: 5, height: 30}}
                           onChangeText={
                    text => this.updateForm({description: text})}/>

                {this.state.description === '' ?
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage> : null}

                <Divider style={{backgroundColor:'black'}}/>

                <FormLabel>MCQ Points</FormLabel>
                <TextInput value={this.state.points.toString()} style={{backgroundColor: 'white', margin: 5, height: 30}}
                           onChangeText={
                    text => this.updateForm({points: text})}/>

                {((this.state.points === 0) || (this.state.points == '')) ?
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage> : null}

                <Divider style={{backgroundColor:'black'}}/>

                <FormLabel>Enter Choice</FormLabel>
                <TextInput style={{backgroundColor: 'white', margin: 5, height: 30}}
                           onChangeText={
                    text => this.updateForm({choice: text})}/>

                <Button title="Add choice"
                        backgroundColor='green'
                        style={{margin: 5}}
                        onPress={() => this.addOption()}/>


                <Divider style={{backgroundColor:'black'}}/>

                <Text h3>Preview</Text>
                <View style={{backgroundColor: '#464b50', padding: 5}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: 'white'}} h3>{this.state.title}</Text>
                        <Text style={{color: 'white'}} h3>{this.state.points}pts</Text>
                    </View>

                    <Text style={{color: 'white', margin: 2}}>{this.state.description}</Text>

                    <RadioGroup onSelect={(index) => this.selectedChoice(index)}
                                selectedIndex={this.state.correct}
                                color='black'
                                highlightColor='blue'>
                        {this.state.choices.map((choice, index) => (
                            <RadioButton color='black' key={index} style={{backgroundColor: 'white', margin: 2}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}} key={index}>
                                    <Text style={{color: 'black'}} h4>{choice}</Text>
                                    <Button title="delete choice" backgroundColor={'red'} onPress={() => this.deleteChoice({index})}/>
                                </View>
                            </RadioButton>
                        ))}
                    </RadioGroup>

                    <View style={{flexDirection: 'row'}}>
                        <Button title="Cancel"
                                backgroundColor='red'
                                onPress={() => this.props.navigation.goBack()}/>

                        {!this.state.editable ?
                            <Button title="Submit"
                                    backgroundColor='green'
                                    onPress={() => {
                                        this.createQuestion();
                                        this.props.navigation.navigate("QuestionsForExam", {examId: this.state.examId});}}/> :
                            <Button title="Update"
                                    backgroundColor='green'
                                    onPress={() => {
                                        this.updateQuestion();
                                        this.props.navigation.navigate("QuestionsForExam", {examId: this.state.examId});}}/>}
                        {this.state.editable ?
                            <Button title="Delete Question"
                                    backgroundColor='red'
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

export default MultipleChoice