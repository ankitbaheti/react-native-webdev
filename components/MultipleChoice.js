import React from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, FormLabel, FormInput, FormValidationMessage, Divider, Button, CheckBox} from 'react-native-elements'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

class MultipleChoice extends React.Component {

    constructor(props){
        super(props)
        this.state={
            examId: 1,
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
    }

    componentDidMount(){
        const examId = this.props.navigation.getParam("examId")
        this.setState({examId: examId})
    }

    createQuestion(){
        return fetch("http://10.0.0.197:8080/api/exam/"+this.state.examId+"/choice",{
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
                <FormLabel>Essay Title</FormLabel>
                <FormInput value={this.state.title} onChangeText={
                    text => this.updateForm({title: text})}/>

                {this.state.title === '' ?
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage> : null}


                <FormLabel>Essay Description</FormLabel>
                <FormInput value={this.state.description} onChangeText={
                    text => this.updateForm({description: text})}/>

                {this.state.description === '' ?
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage> : null}

                <FormLabel>Essay Points</FormLabel>
                <FormInput value={this.state.points.toString()} onChangeText={
                    text => this.updateForm({points: text})}/>

                {((this.state.points === 0) || (this.state.points == '')) ?
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage> : null}

                <FormLabel>Enter Choice</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({choice: text})}/>

                <Button title="Add choice" onPress={() => this.addOption()}/>


                <Divider style={{
                    backgroundColor:
                        'blue' }}/>

                <Text h2>Preview</Text>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text h3>{this.state.title}</Text>
                    <Text h3>{this.state.points}pts</Text>
                </View>

                <Text>{this.state.description}</Text>

                <RadioGroup onSelect={(index) => this.selectedChoice(index)}>
                    {this.state.choices.map((choice, index) => (
                        <RadioButton key={index}>
                            <View style={{flexDirection: 'row'}} key={index}>
                                <Text>{choice}</Text>
                                <Button title="delete choice" onPress={() => this.deleteChoice({index})}/>
                            </View>
                        </RadioButton>))}
                </RadioGroup>

                <View style={{flexDirection: 'row'}}>
                    <Button title="Cancel"
                            onPress={() => this.props.navigation.goBack()}/>
                    <Button title="Submit"
                            onPress={() => {
                                this.createQuestion();
                                this.props.navigation.navigate("QuestionsForExam", {examId: this.state.examId});
                            }}/>
                </View>
                <View style={{height: 60}}/>
            </ScrollView>
        )
    }
}

export default MultipleChoice