import React from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, FormLabel, FormInput, FormValidationMessage, Divider, Button} from 'react-native-elements'

class FillBlank extends React.Component {

    constructor(props){
        super(props)
        this.state={
            examId: 1,
            title: '',
            description: '',
            points: 0,
            variable: ''
        }
    }

    // componentDidMount(){
    //     const examId = this.props.navigation.getParam("examId")
    //     this.setState({examId: examId})
    // }

    updateForm(newState) {
        this.setState(newState)
    }

    splitString(){
        var lines = this.state.variable.split("\n")
        console.log(lines)
        return lines.map((line, index) => {
            var words = line.split(" ")

                return (
            <View style={{flexDirection: 'row', flex: 1}}>

                {words.map((word, index) => {
                if(word.match('\\[.*\\]'))
                    return <TextInput/>
                else
                    return <Text style={{margin: 1}}>{word}</Text>
            })}
            </View>)

        })
    }

    render() {
        return (
            <ScrollView>

                <FormLabel>Fill In The Blank Title</FormLabel>
                <FormInput value={this.state.title} onChangeText={
                    text => this.updateForm({title: text})}/>

                {this.state.title === '' ?
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage> : null}


                <FormLabel>Fill In The Blank Description</FormLabel>
                <FormInput value={this.state.description} onChangeText={
                    text => this.updateForm({description: text})}/>

                {this.state.description === '' ?
                    <FormValidationMessage>
                        Description is required
                    </FormValidationMessage> : null}

                <FormLabel>Fill In The Blank Points</FormLabel>
                <FormInput value={this.state.points.toString()} onChangeText={
                    text => this.updateForm({points: text})}/>

                {((this.state.points === 0) || (this.state.points == '')) ?
                    <FormValidationMessage>
                        Points is required
                    </FormValidationMessage> : null}

                <FormLabel>Enter the question</FormLabel>
                <TextInput multiline={true}
                           value={this.state.variable}
                           onChangeText={text => this.updateForm({variable: text})}/>

                {this.state.variable === '' ?
                    <FormValidationMessage>
                        Question is required
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

                {this.splitString()}

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

export default FillBlank