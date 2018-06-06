import React from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import {Text, FormLabel, FormInput, FormValidationMessage, Divider, Button} from 'react-native-elements'

class Essay extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            examId: 1,
            title: '',
            description: '',
            points: 0
        }
    }

    componentDidMount(){
        const examId = this.props.navigation.getParam("examId")
        this.setState({examId: examId})
    }

    updateForm(newState) {
        this.setState(newState)
    }

    render() {
        return (
            <ScrollView>
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

                <TextInput multiline = {true}/>

                <View style={{flexDirection: 'row'}}>
                    <Button title="Cancel"
                            onPress={() => this.props.navigation.goBack()}/>
                    <Button title="Submit"
                                // onPress={() => {
                                //     this.createAssignment();
                                //     this.props.navigation.navigate("ShowAssignment", {lessonId: this.state.lessonId});}}
                    />
                </View>
                <View style={{height: 60}}/>
            </ScrollView>
        )

    }
}

export default Essay