import React from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, FormLabel, FormInput, FormValidationMessage, Divider, Button, CheckBox} from 'react-native-elements'

class TrueFalse extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            examId: 1,
            title: '',
            description: '',
            points: 0,
            isTrue: true
        }
        this.createQuestion = this.createQuestion.bind(this)
    }

    componentDidMount(){
        const examId = this.props.navigation.getParam("examId")
        this.setState({examId: examId})
    }

    updateForm(newState) {
        this.setState(newState)
    }

    createQuestion(){
        return fetch("http://10.0.0.197:8080/api/exam/"+this.state.examId+"/truefalse",{
            body: JSON.stringify({title: this.state.title,
                description: this.state.description,
                points: this.state.points,
                isTrue: this.state.isTrue}),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(function (response){
            return response.json();
        })
    }

    render() {
        return (
            <ScrollView>
                <FormLabel>Essay Title</FormLabel>
                <FormInput value={this.state.title} onChangeText={
                    text => this.updateForm({title: text})
                }/>

                {this.state.title === '' ?
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage> : null}


                <FormLabel>Essay Description</FormLabel>
                <FormInput value={this.state.description} onChangeText={
                    text => this.updateForm({description: text})
                }/>
                {this.state.description === '' ?
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage> : null}

                <FormLabel>Essay Points</FormLabel>
                <FormInput value={this.state.points.toString()} onChangeText={
                    text => this.updateForm({points: text})
                }/>

                {((this.state.points === 0) || (this.state.points == '')) ?
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage> : null}

                <CheckBox
                    title='Check if correct answer is true'
                    onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                    checked={this.state.isTrue}
                />

                <Divider style={{
                    backgroundColor:
                        'blue' }}/>
                <Text h2>Preview</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text h3>{this.state.title}</Text>
                    <Text h3>{this.state.points}pts</Text>
                </View>
                <Text>{this.state.description}</Text>

                <CheckBox
                    title='True'
                />

                <CheckBox
                    title='False'
                />


                <View style={{flexDirection: 'row'}}>
                    <Button title="Cancel"
                            onPress={() => this.props.navigation.goBack()}/>
                    <Button title="Submit"
                            onPress={() => {
                                this.createQuestion();
                                this.props.navigation.navigate("QuestionsForExam", {examId: this.state.examId});
                            }}
                    />
                </View>
                <View style={{height: 60}}/>
            </ScrollView>
        )
    }
}

export default TrueFalse