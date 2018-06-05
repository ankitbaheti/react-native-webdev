import React from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, FormLabel, FormInput, FormValidationMessage, Divider, Button} from 'react-native-elements'

class Exam extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            lessonId: 1,
            title: '',
            description: ''
        }
        this.createExam = this.createExam.bind(this);
    }

    componentDidMount() {
        const lessonId = this.props.navigation.getParam("lessonId")
        this.setState({lessonId: lessonId})

    }

    updateForm(newState) {
        this.setState(newState)
    }

    createExam(){
        return fetch("http://10.0.0.197:8080/api/lesson/"+this.state.lessonId+"/exam",{
            body: JSON.stringify({title: this.state.title,
                description: this.state.description}),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then( (response) =>
            response.json()
                .then((response1) => {
                    this.props.navigation.navigate("QuestionsForExam", {examId: response1.id})
                })


        )
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>

                <FormLabel>Exam Title</FormLabel>
                <FormInput value={this.state.title} onChangeText={
                    text => this.updateForm({title: text})
                }/>

                {this.state.title === '' ?
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage> : null}


                <FormLabel>Exam Description</FormLabel>
                <FormInput value={this.state.description} onChangeText={
                    text => this.updateForm({description: text})
                }/>
                {this.state.description === '' ?
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage> : null}




                <View style={{flexDirection: 'row'}}>
                    <Button title="Cancel"
                            onPress={() => this.props.navigation.goBack()}/>
                    <Button title="Submit"
                                onPress={() => this.createExam()}/>
                </View>
                <View style={{height: 60}}/>

            </ScrollView>
        )
    }
}

export default Exam